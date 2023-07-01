import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { productManager } from "../../routes/productsRoutes.js";

const path = "./files/carts.json";

class Cart {

  // This method retrieves all exisitng Carts from the DB 
  async getAllCarts() {
    try {
      if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
      
    } catch (error) {
      throw new Error('Error while retrieving the cart list');
    }
  }

  // This method creates a Cart a saves it into the DB. Initialy, Carts have no associated products.
  async createCart() {
    try {
      const id = uuidv4();
      const newCart = {
        id,
        products: [],
      };
  
      const carts = await this.getAllCarts();
      carts.push(newCart);
  
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return `Cart created with ID: ${newCart.id}`;
      
    } catch (error) {
      throw new Error('Error while creating the cart');
    }
  }

  // This method uses the cart ID to retrieve the products associated to it.
  async getCart(id) {
    try {
      const carts = await this.getAllCarts();
      const cartFound = carts.find((cart) => cart.id === id);

      if (cartFound) {
        return cartFound;
      } else {
        return 'Cart not found';
      }
      
    } catch (error) {
      throw new Error("Error while retrieving the cart's information");
    }
  }

  // This method adds a product to a cart. If the product already exists in the given cart then, instead of adding it again, it will just increase the quantity.
  async addProductToCart(cid, pid, quantity) {
    try {
      const carts = await this.getAllCarts();
  
      const cartFound = carts.find((cart) => cart.id === cid);
      if (!cartFound) return 'Cart not found';
  
      const productFound = await productManager.getProduct(pid);
      if (!productFound) return 'Product not found';
  
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
      
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return 'Product added';
      
    } catch (error) {
      throw new Error('Error while adding the product to the cart');
    }
  }
}

export default Cart;
