import { cartsModel } from "../models/cart.schema.js";
import { productManager } from "../../routes/productsRoutes.js";
class Cart {

  // This method retrieves all exisitng Carts from the DB 
  async getAllCarts() {
    try {
      const cartsArr = await cartsModel.find({})
      if(!cartsArr) return []
      return cartsArr
      
    } catch (error) {
      throw new Error('Error while retrieving the cart list');
    }
  }

  // This method creates a Cart a saves it into the DB. Initialy, Carts have no associated products.
  async createCart() {
    try {
      const cart = await cartsModel.create({products: []});

      return {
        msg: `Cart created`,
        cart
      };
      
    } catch (error) {
      throw new Error('Error while creating the cart');
    }
  }

  // This method uses the cart ID to retrieve the products associated to it.
  async getCart(id) {
    try {
      const cartFound = await cartsModel.findById(id);
      if(!cartFound) return 'Cart not found';
      return cartFound;
      
    } catch (error) {
      throw new Error("Error while retrieving the cart's information");
    }
  }

  // This method adds a product to a cart. If the product already exists in the given cart then, instead of adding it again, it will just increase the quantity.
  async addProductToCart(cid, pid, quantity) {
    try {
      //const cartFound = await this.getCart(cid);
      const cartFound = await cartsModel.findById(cid);
      if (!cartFound) return {msg: 'Cart not found'};
  
      const productFound = await productManager.getProduct(pid);
      if (!productFound) return {msg: 'Product not found'};
  
      const productAlreadyAdded = cartFound.products.find(
        (product) => product.id === pid
      );
      
      if (!productAlreadyAdded) {
        cartFound.products.push({
          id: pid,
          quantity,
        });
      } else {
        productAlreadyAdded.quantity += quantity;
      }

      cartFound.markModified('products');
      await cartFound.save();

      return {msg: 'Product added'};
      
    } catch (error) {
      throw new Error('Error while adding the product to the cart');
    }
  }
}

export default Cart;
