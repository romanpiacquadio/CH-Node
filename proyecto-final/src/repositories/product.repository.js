export default class ProductRepository {
  
  constructor(dao){
    this.dao = dao;
  }

  async getProducts(query, options) {
    let products = await this.dao.getProducts(query, options); // Products.getProducts(x, y)
    return products;
  };

  async getProduct(id) {
    let product = await this.dao.getProduct(id);
    return product;
  }

  async createProduct(data, owner) {
    let newProduct = await this.dao.createProduct(data, owner);
    return newProduct;
  }

  async updateProduct(id, updatedData) {
    let updatedProduct = await this.dao.updateProduct(id, updatedData);
    return updatedProduct;
  }

  async deleteProduct(id) {
    let deletedProduct = await this.dao.deleteProduct(id);
    return deletedProduct;
  }

}