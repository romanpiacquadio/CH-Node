import { cartsService } from '../repositories/index.js';

export const createCart = async (req, res) => {
  try {
    const resp = await cartsService.createCart();
    res.send(resp);

  } catch (error) {
    console.log(error);
    res.send({error: error.message});
  }
};

export const getCart = async (req, res) => {
  const { cid } = req.params;
  
  try {
    const resp = await cartsService.getCart(cid);
    
    if(typeof(resp) === 'string' && resp.includes('Cart not found')) {
      res.status(404).send({error: resp});
    } else {
      res.send(resp);
    }

  } catch (error) {
    res.status(500).send({error: error.message});
  }
};

export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity = 1} = req.body;

  if(!quantity || !pid || !cid) return res.status(400).send({msg: 'Must provide cartId, ProdId, quantity'})

  try {
    const resp = await cartsService.addProductToCart(cid, pid, Number(quantity));
    if(resp.msg === 'Product added') {
      res.send(resp);
    } else {
      res.status(404).send(resp);
    }

  } catch (error) {
    res.status(500).send({msg: error.message});
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const resp = await cartsService.deleteProductFromCart(cid, pid);
    res.send(resp);
  } catch (error) {
    res.status(500).send({msg: error.message});
  }
};

export const updateProductsFromCart = async(req, res) => {
  const { cid } = req.params;
  const { products } = req.body

  try {
    const resp = await cartsService.updateProductsFromCart(cid, products)
    res.send(resp)
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
};

export const updateProductFromCart = async(req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const resp = await cartsService.updateProductQuantity(cid, pid, Number(quantity));
    res.send(resp)
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
};

export const emptyCart = async(req, res) => {
  const { cid } = req.params;

  try {
    const resp = await cartsService.deleteAllProductsFromCart(cid);
    res.send(resp);
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
};

export const purchase = async (req, res) => {
  const { cid } = req.params;

  try {
    const resp = await cartsService.purchase(cid);
    res.send(resp)
  } catch (error) {
    res.status(500).send({msg: error.message})
  }
}