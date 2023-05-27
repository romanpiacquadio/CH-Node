import { Router } from 'express';
import CartManager from '../managers/CartManager.js'

const router = Router();
const cartManager = new CartManager();


// This endpoint creates a new Cart 
router.post('/', async (req, res) => {
  try {
    const resp = await cartManager.createCart();
    res.send({msg: resp});

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
    if(resp.includes('Cart not found')) {
      res.status(404).send({error: resp});
    } else {
      res.send({products: cartFound.products});
    }

  } catch (error) {
    res.status(500).send({error: error.message});
   
  }

})

// This endpoint allows to add a product to a cart
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const resp = await cartManager.addProductToCart(cid, pid, quantity);
    if(resp.includes('Product added')) {
      res.send({msg: resp});
    } else {
      res.status(404).send({error: resp});
    }

  } catch (error) {
    res.status(500).send({msg: error.message});
    
  }
})

export default router;
