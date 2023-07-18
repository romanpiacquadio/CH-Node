import { Router } from 'express';
import cartManager from '../dao/managers/carts.manager.js';

const router = Router();


// This endpoint creates a new Cart 
router.post('/', async (req, res) => {
  try {
    const resp = await cartManager.createCart();
    res.send(resp);

  } catch (error) {
    console.log(error);
    res.send({error: error.message});

  }
})

// This endpoint sends to the client the products included in a given cart
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  
  try {
    const resp = await cartManager.getCart(cid);
    
    if(typeof(resp) === 'string' && resp.includes('Cart not found')) {
      res.status(404).send({error: resp});
    } else {
      res.send(resp);
    }

  } catch (error) {
    res.status(500).send({error: error.message});
   
  }

})

// This endpoint allows to add a product to a cart
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity = 1} = req.body;

  if(!quantity || !pid || !cid) return res.status(400).send({msg: 'Must provide cartId, ProdId, quantity'})

  try {
    const resp = await cartManager.addProductToCart(cid, pid, Number(quantity));
    if(resp.msg === 'Product added') {
      res.send(resp);
    } else {
      res.status(404).send(resp);
    }

  } catch (error) {
    res.status(500).send({msg: error.message});
    
  }
})

router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const resp = await cartManager.deleteProductFromCart(cid, pid);
    res.send(resp);
  } catch (error) {
    res.status(500).send({msg: error.message});
  }
})

router.put('/:cid', async(req, res) => {
  const { cid } = req.params;
  const { products } = req.body

  try {
    const resp = await cartManager.updateProductsFromCart(cid, products)
    res.send(resp)
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
})

router.put('/:cid/products/:pid', async(req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const resp = await cartManager.updateProductQuantity(cid, pid, Number(quantity));
    res.send(resp)
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
})

router.delete('/:cid', async(req, res) => {
  const { cid } = req.params;

  try {
    const resp = await cartManager.deleteAllProductsFromCart(cid);
    res.send(resp);
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
})

export default router;
