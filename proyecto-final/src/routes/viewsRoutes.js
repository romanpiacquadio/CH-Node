import { Router } from 'express';
import ProductManager from '../dao/managers/products.manager.js';
import { BASE_URL } from '../config/config.js';
import axios from 'axios';

const router = new Router();

const productManager = new ProductManager()

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
});

router.get('/chat', (req, res) => {
  res.render('chat')
});

router.get('/products', async (req, res) => {
  const { limit, page, sort, query } = req.query;
  let url = `${BASE_URL}/api/products?`;

  if (limit) {url += `limit=${limit}`}
  if (page) {url += `page=${page}`}
  if (sort) {url += `sort=${sort}`}
  if (query) {url += `limit=${query}`}

  try {
    let products = await axios.get(url);
    let createCart = await axios.post(`${BASE_URL}/api/carts`)

    res.render('products',  {
      products: products.data, 
      cart: createCart.data.cart,
      stylesheet:"/css/products.css"
    })
    
  } catch (error) {
    console.log(error);
  }
});

router.get('/carts/:cid', async (req, res) => {
  const { cid } = req.params;

  try {
    let cart = await fetch(`${BASE_URL}/api/carts/${cid}`)
    cart = await cart.json()
    res.render('cart', {cart} )

  } catch (error) {
    console.log(error);
  }
})

export default router;