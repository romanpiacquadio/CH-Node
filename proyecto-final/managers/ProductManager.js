import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const path = './files/products.json'

class ProductManager {

  // This method retrieves the full list of Products available in the DB
  async getProducts() {
    try {
      if(fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
      
    } catch (error) {
      throw new Error('Error while retrieving the product list')
    }

  };

  // This method retrieves a single Product from the DB
  async getProduct(id) {
    try {
      const products = await this.getProducts();
      const productFound = products.find( product => product.id === id);
      return productFound !== undefined ? productFound : null;
    
    } catch (error) {
      throw new Error('Error while retrieving the product');
    }

  }

  // This method creates a new Product and presists it into the DB
  async createProduct(data){
    try {
      const id = uuidv4();
      const newProduct = {
        id,
        ...data
      }
      const products = await this.getProducts();
      products.push(newProduct);
      await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
      return 'Product added';
      
    } catch (error) {
      throw new Error('Error while creating the product');
    }
  }

  // This method updates a Product information a saves the change into the DB
  async updateProduct(id, updatedData) {

    try {
      const products = await this.getProducts();
      let productUpdated = false;

      const updatedProducts = products.map( product => {
        if(product.id === id) {
          productUpdated = true;
          return {
            ...product,     // hago una copia de la informacion que existia previamente para el producto
            ...updatedData  // sobrescribo las propiedades modificadas (lo que llegó por el req.body)
          }
        } else {
          return product;
        }
      })

      if(!productUpdated) {
        return `Unexisting product with ID: ${id}`;
      }
  
      await fs.promises.writeFile(path, JSON.stringify(updatedProducts, null, '\t'));
      return 'Product updated';
      
    } catch (error) {
      throw new Error('Error while updating the product');
    }
  }

  // This method deletes a Product from the DB
  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
  
      const updatedProductList = products.filter( product => product.id !== id );
  
      if(products.length === updatedProductList.length) return null;

      await fs.promises.writeFile(path, JSON.stringify(updatedProductList, null, '\t'));
      return {msg: 'Product deleted'};
      
    } catch (error) {
      throw new Error('Error while eliminating the product');
    }
  }
}

export default ProductManager;


