import express from 'express';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js'

const app = express();

const PORT = 8080;

app.use(express.json())
//app.use(cors());

app.use('/api/products', productsRoutes)
app.use('/api/products', cartsRoutes)



app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});