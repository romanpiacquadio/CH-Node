import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';

const app = express();

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

const server = app.listen(8080, () => {
  console.log(`Server running on port 8080`);
})

const io = new Server(server)

// io.on('connection', socket => {
//   console.log('Nuevo cliente conectado')

//   socket.on('message', data => {
//     console.log(data);
//   })

//   socket.emit('evento_socket_individual', 'este mensaje solo lo recibe el socket');

//   socket.broadcast.emit('evento_todos_menos_actual', 'Lo van a ver todos los clientes menos el actual');

//   io.emit('evento_todos', 'lo recibiran todos los clientes');
// })

io.on('connection', socket => {
  console.log('Nuevo cliente conectado');
  socket.on('message1', data => {
    io.emit('log', data)
  })
})