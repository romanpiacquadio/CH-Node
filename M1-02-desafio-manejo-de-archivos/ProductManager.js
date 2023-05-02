import fs from 'fs'

const path = './files/products.json'

export default class ProductManager {

  addProduct = async (product) => {
    const products = await this.getProducts()
    
    let id;

    if(products.length === 0) {
        id = 1
    } else {
        id = products[products.length-1].id + 1
    }

    products.push({id, ...product})
    await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
  }

  getProducts = async () => {
    if(fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, 'utf-8')
      const products = JSON.parse(data)
      return products

    } else {
      return []
    }
  }

  getProductById = async (id) => {
    const products = await this.getProducts()
    const productSearched = products.find( product => product.id === id)

    return productSearched || `No existing product with id: ${id}`

  }

  updateProduct = async (updatedProduct) => {
    const products = await this.getProducts()
    if(!products) return 'No products found'

    const foundIndex = products.findIndex( product => product.id === updatedProduct.id )
    products[foundIndex] = updatedProduct

    const updatedProductList = await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))

    return updatedProductList
  }

  deleteProduct = async (id) => {
    const products = await this.getProducts()
    if(!products) return 'No products found'
    
    const filteredProducts = products.filter( product => product.id !== id )

    const updatedProductList = await fs.promises.writeFile(path, JSON.stringify(filteredProducts, null, '\t'))

    return updatedProductList
  }
}


const productos = new ProductManager();

const env = async () => {
  console.log(await productos.getProducts());

  const newProduct = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  };

  await productos.addProduct(newProduct); // Agregamos un producto
  await productos.addProduct(newProduct); // Agregamos un producto
  await productos.addProduct(newProduct); // Agregamos un producto

  console.log(await productos.getProducts()); // Mostramos todos los productos 
  console.log(await productos.getProductById(10)); // Mostramos un producto

  // await productos.updateProduct({         // Actualizamos un producto
  //   id: 1,
  //   title: 'producto prueba MODIFICADO',
  //   description: 'Este es un producto prueba',
  //   price: 200,
  //   thumbnail: 'Sin imagen',
  //   code: 'abc123',
  //   stock: 25
  // })

  // console.log(await productos.getProductById(1)) // Mostramos prod modificado

  // await productos.deleteProduct(3)               // Borramos un producto

  // console.log( await productos.getProducts() )   // Mostramos todos los prod

};

env();