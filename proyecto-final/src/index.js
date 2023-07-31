import express from 'express';
import displayRoutes from 'express-routemap';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRoutes from './routes/view.routes.js';
import sessionRoutes from './routes/session.routes.js';
import productsRoutes from './routes/product.routes.js';
import cartsRoutes from './routes/cart.routes.js';
import __dirname from './utils.js';
import { mongoDBConnection } from './db/mongo.config.js';
import { messagesModel } from './dao/models/message.schema.js';
import { MONGODB_CNN, PORT } from './config/config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGODB_CNN,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60,
      // ttl: 60 * 3600
    }),
    secret: "secretS3ss10n",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRoutes);
app.use('/api/session', sessionRoutes);
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