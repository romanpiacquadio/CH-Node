import { Products, Carts } from "../dao/factory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";

export const productsService = new ProductRepository(Products);
export const cartsService = new CartRepository(Carts);