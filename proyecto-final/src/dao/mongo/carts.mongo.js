import { cartsModel } from "../mongo/models/cart.schema.js";
import productManager from "./products.mongo.js"
import ticketManager from "./tickets.mongo.js"

class CartManager {

  // This method retrieves all exisitng Carts from the DB 
  async getAllCarts() {
    try {
      const cartsArr = await cartsModel.find({})
      if(!cartsArr) return []
      return cartsArr
      
    } catch (error) {
      console.log(error);
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
      console.log(error);
      throw new Error('Error while creating the cart');
    }
  }

  // This method uses the cart ID to retrieve the products associated to it.
  async getCart(id) {
    try {
      const cartFound = await cartsModel.findById(id).populate('products.product');
      if(!cartFound) return 'Cart not found';
      return cartFound;
      
    } catch (error) {
      console.log(error);
      throw new Error("Error while retrieving the cart's information");
    }
  }

  // This method adds a product to a cart. If the product already exists in the given cart then, instead of adding it again, it will just increase the quantity.
  async addProductToCart(cid, pid, quantity) {
    console.log(cid, pid, quantity);

    try {
      const cartFound = await cartsModel.findById(cid);
      if (!cartFound) return {msg: 'Cart not found'};
  
      const productFound = await productManager.getProduct(pid);
      if (!productFound) return {msg: 'Product not found'};
  
      const productAlreadyAdded = cartFound.products.find(
        (product) => product.product == pid
      );
      console.log(productAlreadyAdded);

      
      if (!productAlreadyAdded) {
        console.log(cartFound.products);
        cartFound.products.push({
          product: pid,
          quantity
        })
        await cartsModel.updateOne({_id: cid}, cartFound)
        
      } else {
        productAlreadyAdded.quantity += quantity;
        cartFound.markModified('products');
        await cartFound.save();

      }

      return {msg: 'Product added'};
      
    } catch (error) {
      console.log(error);
      throw new Error('Error while adding the product to the cart');
    }
  }

  // This method deletes a product from a cart
  async deleteProductFromCart(cid, pid) {
    try {
      const deletedProduct = await cartsModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid }}},
        { new: true },
      );

      return {
        msg: 'Product deleted',
        deletedProduct,
      };
      
    } catch (error) {
      console.log(error);
      throw new Error('Error while deleting product from cart');
    }
  }

  async updateProductsFromCart(cid, products) {
    try {
      const updatedCart = await cartsModel.findOneAndUpdate(
        {_id: cid},
        { $set: { products: products }},
        { new: true },
      );

      return {
        msg: 'Products updated',
        updatedCart,
      }

    } catch (error) {
      console.log(error);
      throw new Error('Error while updating the products');
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      await cartsModel.findOneAndUpdate(
        {_id: cid, 'products.product': pid},
        { $set: { 'products.$.quantity': quantity }},
        { new: true },
      )

      return {msg: 'Quantity updated'}

    } catch (error) {
      console.log(error);
      throw new Error('Error while updating the quantity')
    }
  }

  async deleteAllProductsFromCart(cid) {
    try {
      await cartsModel.findOneAndUpdate(
        { _id: cid },
        { $set: { products: [] }},
        { new: true},
      )

      return { msg: 'Cart emptyed' }

    } catch (error) {
      console.log(error);
      throw new Error('Error while emptying cart')
    }
  }

  async purchase(cid) {
    try {
      const cart = await this.getCart(cid);
      if (!cart) return {msg: 'Cart not found'}

      const unexistingProducts = [];
      
      for (const element of cart.products) {
        if( element.quantity > element.product.stock) {
          unexistingProducts.push(`${element.product.title} has not enough stock`)
        }
      }

      if (unexistingProducts.length > 0) {
        return unexistingProducts
      }

      for (const element of cart.products) {
        await productManager.updateProduct(element.product._id, {
          stock: element.product.stock - element.quantity
        })
      }

      //await ticketManager.createTicket(la persona q lo compró, monto)
      
      return {msg: 'Purchase is Ready'}
      
    } catch (error) {
      throw new Error('Error while finishing purchase')
    }
  }
}

export default new CartManager();
