import { BASE_URL } from '../config/config.js';
import axios from 'axios';


export const index = (req, res) => {
  res.render('index')
};

export const realTimeProducts = (req, res) => {
  res.render('realTimeProducts')
};

export const chat = (req, res) => {
  res.render('chat')
};

export const products = async (req, res) => {
  const { limit, page, sort, query } = req.query;
  const user = req.session.user
  let url = `${BASE_URL}/api/products?`;

  if (limit) {url += `&limit=${limit}`}
  if (page) {url += `&page=${page}`}
  if (sort) {url += `&sort=${sort}`}
  if (query) {url += `&limit=${query}`}

  try {
    let products = await axios.get(url);

    res.render('products',  {
      products: products.data, 
      user,
      stylesheet:"/css/products.css"
    })
    
  } catch (error) {
    console.log(error);
  }
};

export const cart = async (req, res) => {
  const { cid } = req.params;

  try {
    let cart = await fetch(`${BASE_URL}/api/carts/${cid}`)
    cart = await cart.json()
    res.render('cart', {cart} )

  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  res.render("login");
};

export const register = (req, res) => {
  res.render("register");
};
