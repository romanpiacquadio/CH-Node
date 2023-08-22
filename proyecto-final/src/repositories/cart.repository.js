export default class CartRepository {
  constructor(dao) {
    this.dao = dao
  }

  async getAllCarts() {
    const carts = await this.dao.getAllCarts();
    return carts;
  }

  async createCart() {
    const newCart = await this.dao.createCart();
    return newCart;
  }

  async getCart(id) {
    const cart = await this.dao.getCart(id);
    return cart;
  }

  async addProductToCart(cid, pid, quantity) {
    const addedProd = await this.dao.addProductToCart(cid, pid, quantity);
    return addedProd;
  }

  async deleteProductFromCart(cid, pid) {
    const deletedProduct = await this.dao.deleteProductFromCart(cid, pid);
    return deletedProduct;
  }

  async updateProductsFromCart(cid, products) {
    const updateProd = await this.dao.updateProductsFromCart(cid, products);
    return updateProd;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const updateProdQuantity = await this.dao.updateProductQuantity(cid, pid, quantity);
    return updateProdQuantity;
  }

  async deleteAllProductsFromCart(cid) {
    const deleteAll = await this.dao.deleteAllProductsFromCart(cid);
    return deleteAll;
  }

}