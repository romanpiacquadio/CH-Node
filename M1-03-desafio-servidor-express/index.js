import express from 'express';
import ProductManager from '../M1-02-desafio-manejo-de-archivos/ProductManager.js';

const app = express();
const PORT = 3002
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
  const { limit } = req.query

  const products = await productManager.getProducts()
  if(!products) return res.json({ products })

  const limitedProducts = products.slice(0, limit)

  return res.json({ products: limitedProducts })

})

//   /productos/:id --> req.params.id
//   /products?id=8 --> req.query.id

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params
  const product = await productManager.getProductById( Number(pid) )

  return res.json({ product })
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})