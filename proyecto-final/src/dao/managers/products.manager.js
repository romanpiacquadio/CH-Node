import { productsModel } from "../models/product.schema.js";
import { generateUrlLink } from "../../helpers/index.js";


class ProductManager {

  // This method retrieves the full list of Products available in the DB
  async getProducts(query, options) {

    try {
      const paginatedProducts = await productsModel.paginate(query, options);
      const prevLink = paginatedProducts.hasPrevPage ? generateUrlLink(query, options, paginatedProducts.prevPage) : null
      const nextLink = paginatedProducts.hasNextPage ? generateUrlLink(query, options, paginatedProducts.nextPage) : null

      const response = {
        status: 'success',
        payload: paginatedProducts.docs,
        totalDocs: paginatedProducts.totalDocs,
        totalPages: paginatedProducts.totalPages,
        prevPage: paginatedProducts.prevPage,
        nextPage: paginatedProducts.nextPage,
        page: paginatedProducts.page,
        hasPrevPage: paginatedProducts.hasPrevPage,
        hasNextPage: paginatedProducts.hasNextPage,
        prevLink,
        nextLink,
      }

      return response;
      
    } catch (error) {
      console.log(error)
      throw new Error('Error while retrieving the product list')
    }

  };

  // This method retrieves a single Product from the DB
  async getProduct(id) {
    try {
      const productDetail = await productsModel.findById(id)
      return productDetail;
    
    } catch (error) {
      console.log(error);
      throw new Error('Error while retrieving the product');
    }

  }

  // This method creates a new Product and presists it into the DB
  async createProduct(data){
    try {
      // Check if product already exists
      const productExists = await productsModel.findOne({
        code: data.code
      })

      if(productExists) return {msg: 'Product code already exists'}

      const newProduct = await productsModel.create(data)
      
      return {msg: 'Product added', newProduct};
      
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating the product');
    }
  }

  // This method updates a Product information a saves the change into the DB
  async updateProduct(id, updatedData) {

    try {
      const productUpdated = await productsModel.findOneAndUpdate({ _id: id }, updatedData, { new: true });
        
      if(!productUpdated) return {msg: `Unexisting product with id: ${id}`}

      return {msg: 'Product Updated', productUpdated}
      
    } catch (error) {
      console.log(error);
      throw new Error('Error while updating the product');
    }
  }

  // This method deletes a Product from the DB
  async deleteProduct(id) {
    try {
      const productToDelete = await productsModel.findByIdAndDelete(id)

      if(!productToDelete) return {msg: `Unexisting product with id: ${id}`}

      return {msg: 'Product Deleted', productToDelete}
            
    } catch (error) {
      console.log(error);
      throw new Error('Error while eliminating the product');
    }
  }
}

export default ProductManager;


