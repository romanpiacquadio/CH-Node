import express from 'express';
import displayRoutes from 'express-routemap';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';
import __dirname from './utils.js';
import { mongoDBConnection } from './db/mongo.config.js';
import { messagesModel } from './dao/models/message.schema.js';

const app = express();
const PORT = 8080;



app.use(express.static(`${__dirname}/public`));
app.use(express.json());
//app.use(cors());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);


mongoDBConnection();

const server = app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`===================================`);
  console.log(`==== listening on Port: ${PORT} ===`);
  console.log(`===================================`);
});

export const io = new Server(server);

io.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  socket.on('message', async (data) => {
    await messagesModel.create(data);
    const messages = await messagesModel.find({});
    io.emit('messageLogs', messages);
  });

  socket.on('authenticated', async (data) => {
    const messages = await messagesModel.find({});
    socket.emit('messageLogs', messages);
    socket.broadcast.emit('newUserConnected', data);
  });

});