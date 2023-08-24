import { Products, Carts, Tickets } from "../dao/factory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import TicketRepository from "./ticket.repository.js";

export const productsService = new ProductRepository(Products);
export const cartsService = new CartRepository(Carts);
export const ticketService = new TicketRepository(Tickets);