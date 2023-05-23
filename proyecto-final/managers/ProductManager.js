import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const path = './files/products.json'

class ProductManager {

  async getProducts() {

    if(fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }

  };

  async getProduct(id) {
    
    const products = await this.getProducts()
    if(products.length) {
      const productFound = products.find( product => product.id === id)
      return productFound
    } else {
      return undefined
    }

  }

  async createProduct(data){
    const id = uuidv4();

    const newProduct = {
      id,
      ...data
    }

    const products = await this.getProducts();
    products.push(newProduct);

    await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
    return 'Producto añadido'
  }

  async updateProduct(id, updatedData) {
    const products = await this.getProducts()

    const updatedProducts = products.map( product => {
      if(product.id === id) {
        return {
                id,
                ...updatedData
        }
      } else {
        return product
      }
    })

    // TODO: Hacer comprobaciones
    // -- Si no encuentra el ID recibido

    await fs.promises.writeFile(path, JSON.stringify(updatedProducts, null, '\t'))
    return 'Producto Actualizado'
  }

  async deleteProduct(id) {
    const products = await this.getProducts()

    const updatedProducts = products.filter( product => product.id !== id )

    if(products.length === updatedProducts.length) return null

    return 'Producto eliminado'
  }
}

export default ProductManager;


