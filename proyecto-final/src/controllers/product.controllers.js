import { io } from '../index.js'
import { productsService } from '../repositories/index.js';
import { generateProducts } from '../utils.js';
import { EnumErrors, HttpResponse } from '../middlewares/error-handler.js';

const httpResponse = new HttpResponse();

export const getAllProducts = async (req, res) => {
  /// /api/products?limit=5&page=2&order=asc&query=
  const { limit = 10 } = req.query;
  const { page = 1 } = req.query;
  const { sort } = req.query;
  const { query } = req.query;

  const options = {
    limit,
    page,
  }

  if(sort) {
    options.sort = {
      price: sort
    }
  }

  const filter = {};
  
  if(query) {
    filter.category = query;
  }

  try {
    const paginatedProducts = await productsService.getProducts(filter, options);
    // res.send(paginatedProducts);
    httpResponse.OK(res, 'OK', paginatedProducts);
  } catch (error) {
    req.logger.error(error);
    // res.status(500).send({ error: error.message });
    httpResponse.Error(res, 'Error while retrieving products', error.message);
  }
};

export const getOneProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    const productFound = await productsService.getProduct(pid); // producto o un null
    if(!productFound) {
      //return res.status(404).send({error: `Unexisting product with ID: ${pid}`});
      return httpResponse.BadRequest(res, 'Error while retrieving the product', `Unexisting product with ID: ${pid}`)
    }
    // res.send(productFound);
    httpResponse.OK(res, 'OK', productFound);

  } catch (error) {
    req.logger.error(error);
    //res.status(500).send({ error: error.message });
    httpResponse.Error(res, 'Error while retrieving the product', error.message);
  }
}

export const createProduct = async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    stock,
    category,
  } = req.body

  const owner = req.user.user.email

  if( !title || !description || !code || !price || !stock || !category ) {
    // return res.status(400).send({error: "Fields 'title', 'description', 'code', 'price', 'stock', 'category' are mandatory"})
    return httpResponse.BadRequest(res, 'Error while creating product', "Fields 'title', 'description', 'code', 'price', 'stock', 'category' are mandatory");
  }

  try {
    
    const status = req.body.status !== undefined ? req.body.status : true;
    const thumbnails = req.body.thumbnails || [];
    
    const productData = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    }

    const newProductStatus = await productsService.createProduct(productData, owner);

    io.emit('updatedProduct', {
      title
    })

    res.send(newProductStatus);

  } catch (error) {
    req.logger.error(error);
    // res.status(500).send({error: error.message});
    httpResponse.Error(res, 'Error while creating product', error.message);
  }
}

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const newProductData = req.body;
  const { email, role } = req.user.user;

  try {
    //const resp = await productsService.updateProduct(pid, newProductData);
    const product = await productsService.getProduct(pid);
    
    if (!product) {
      return httpResponse.BadRequest(res, 'Unexisting Product', 'Product not found')
    }

    if (product.owner !== email && role !== 'ADMIN') {
      return httpResponse.Forbidden(res, 'Unauthorized', 'You are not authorized to update this product')
    }

    // Actualiza el producto si el email coincide con el owner
    const resp = await productsService.updateProduct(pid, newProductData);

    // Maneja la respuesta según sea necesario
    if (resp.msg.includes('Unexisting product')) {
      return httpResponse.Error(res, 'Error while updating the product', resp);
    }
    
    return httpResponse.OK(res, 'OK', resp);
     
    
  } catch (error) {
    req.logger.error(error);
    // res.status(500).send({ error: error.message });
    httpResponse.Error(res, 'Error while updating the product', error.message);

  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const { email, role } = req.user.user;
  
  try {
    //const resp = await productsService.updateProduct(pid, newProductData);
    const product = await productsService.getProduct(pid);
    
    if (!product) {
      return httpResponse.BadRequest(res, 'Unexisting Product', 'Product not found')
    }

    if (product.owner !== email && role !== 'ADMIN') {
      return httpResponse.Forbidden(res, 'Unauthorized', 'You are not authorized to delete this product')
    }
    
    const resp = await productsService.deleteProduct(pid);

    if(!resp) {
      // return res.status(404).send({error: 'Invalid product ID'});
      return httpResponse.BadRequest(res, 'Error while deleting Product', 'Invalid product ID')
    }

    // res.send(resp)
    return httpResponse.OK(res, 'OK', resp);
    
  } catch (error) {
    req.logger.error(error);
    //res.status(500).send({error: error.message});
    httpResponse.Error(res, 'Error while deleting the product', error.message);
  }
}

export const mockingProduct = (req, res) => {
  const mockedProducts = generateProducts();
  // res.send(mockedProducts);
  httpResponse.OK(res, 'OK', mockedProducts);
}