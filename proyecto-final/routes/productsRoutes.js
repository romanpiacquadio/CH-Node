import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();

export const productManager = new ProductManager();

// This endpoint sends the full list of products to the client.
router.get('/', async (req, res) => {
  const { limit } = req.query
  try {
    const allProducts = await productManager.getProducts();
    if(limit) return res.send(allProducts.slice(0, limit))
    res.send(allProducts);

  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });

  }
  
})

// This endpoint responds with the information of a sigle product.
router.get('/:pid', async (req, res) => {
  const { pid } = req.params;

  try {
    const productFound = await productManager.getProduct(pid);
    if(!productFound) return res.status(404).send({error: `Unexisting product with ID: ${pid}`});
    res.send(productFound);
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });

  }
})

//This endpoint creates a product with information provided by the client and saves it into the DB.
router.post('/', async (req, res) => {
  //const productData = req.body;
  const {
    title,
    description,
    code,
    price,
    stock,
    category,
  } = req.body

  if( !title || !description || !code || !price || !stock || !category ) {
    res.status(400).send({error: "Fields 'title', 'description', 'code', 'price', 'stock', 'category' are mandatory"})
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
    res.send({msg: newProductStatus});

  } catch (error) {
    console.log(error);
    res.status(500).send({error: error.message});

  }
})

// This endpoint updates the given properties of a product.
router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const newProductData = req.body;

  try {
    const resp = await productManager.updateProduct(pid, newProductData);
    
    if(resp.includes('Unexisting product')){
      res.status(404).send({ error: resp });
    } else {
      res.send({msg: resp});
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });

  }
})


// This endpoint deletes a product from the DB.  
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  
  try {
    const resp = await productManager.deleteProduct(pid);

    if(!resp) return res.status(404).send({error: 'Invalid product ID'});

    res.send(resp)
    
  } catch (error) {
    console.log(error);
    res.status(500).send({error: error.message});
    
  }
})

export default router;







