import { io } from '../index.js'
import productManager from '../dao/managers/products.manager.js';

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
    const paginatedProducts = await productManager.getProducts(filter, options);
    res.send(paginatedProducts);

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });

  }
};

export const getOneProduct = async (req, res) => {
  const { pid } = req.params;

  try {
    const productFound = await productManager.getProduct(pid); // producto o un null
    if(!productFound) return res.status(404).send({error: `Unexisting product with ID: ${pid}`});
    res.send(productFound);
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });

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

  if( !title || !description || !code || !price || !stock || !category ) {
    return res.status(400).send({error: "Fields 'title', 'description', 'code', 'price', 'stock', 'category' are mandatory"})
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

    const newProductStatus = await productManager.createProduct(productData);

    io.emit('updatedProduct', {
      title
    })

    res.send(newProductStatus);

  } catch (error) {
    console.log(error);
    res.status(500).send({error: error.message});

  }
}

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const newProductData = req.body;

  try {
    const resp = await productManager.updateProduct(pid, newProductData);
    
    if(resp.msg.includes('Unexisting product')){
      res.status(404).send(resp);

    } else {
      res.send(resp);
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });

  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  
  try {
    const resp = await productManager.deleteProduct(pid);

    if(!resp) return res.status(404).send({error: 'Invalid product ID'});

    res.send(resp)
    
  } catch (error) {
    console.log(error);
    res.status(500).send({error: error.message});
    
  }
}