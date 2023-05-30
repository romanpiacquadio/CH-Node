import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';
import viewsRoutes from './routes/viewsRoutes.js';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;



app.use(express.static(`${__dirname}/public`));
app.use(express.json())
//app.use(cors());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)


const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});

export const io = new Server(server);
