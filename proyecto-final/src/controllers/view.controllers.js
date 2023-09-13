import passport from 'passport';
import { BASE_URL } from '../config/config.js';
import axios from 'axios';
import { SECRET_JWT } from '../config/config.js';
import jwt from 'jsonwebtoken';


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
  let url = `${BASE_URL}/api/products?`;

  const userToken = req.cookies?.token
  let user;

  if (userToken) {
    try {
      user = jwt.verify(userToken, SECRET_JWT);
    } catch (error) {
      console.error("Error al verificar el token:", error);
    }
  }

  if (limit) {url += `&limit=${limit}`}
  if (page) {url += `&page=${page}`}
  if (sort) {url += `&sort=${sort}`}
  if (query) {url += `&limit=${query}`}

  try {
    let products = await axios.get(url);

    res.render('products',  {
      products: products.data, 
      user,
      userToken,
      stylesheet:"/css/products.css"
    })
    
  } catch (error) {
    req.logger.error(error);
  }
};

export const cart = async (req, res) => {
  const { cid } = req.params;

  try {
    let cart = await fetch(`${BASE_URL}/api/carts/${cid}`)
    cart = await cart.json()
    res.render('cart', {cart} )

  } catch (error) {
    req.logger.error(error);
  }
};

export const login = (req, res) => {
  res.render("login");
};

export const register = (req, res) => {
  res.render("register");
};

export const resetPwd = (req, res) => {
  res.render("resetPassword");
}

export const setNewPwd = (req, res) => {
  const { token } = req.params
  res.render("setNewPassword", {
    token
  });
}