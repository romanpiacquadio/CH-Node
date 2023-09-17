import { cartsService } from '../repositories/index.js';
import { HttpResponse } from '../middlewares/error-handler.js';

const httpResponse = new HttpResponse();

export const createCart = async (req, res) => {
  try {
    const resp = await cartsService.createCart();
    //res.send(resp);
    httpResponse.OK(res, 'Cart Created', resp);

  } catch (error) {
    // console.log(error);
    req.logger.error(error);
    //res.send({error: error.message});
    httpResponse.Error(res, 'Error while creating cart', error.message);
  }
};

export const getCart = async (req, res) => {
  const { cid } = req.params;
  
  try {
    const resp = await cartsService.getCart(cid);
    
    if(typeof(resp) === 'string' && resp.includes('Cart not found')) {
      //res.status(404).send({error: resp});
      httpResponse.NotFound(res, 'Cart not found', resp);
    } else {
      //res.send(resp);
      httpResponse.OK(res, 'OK', resp);
    }

  } catch (error) {
    req.logger.error(error);
    //res.status(500).send({error: error.message});
    httpResponse.Error(res, 'Error while retrieving cart data', error.message);
  }
};

export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity = 1} = req.body;

  if(!quantity || !pid || !cid) return httpResponse.BadRequest(res, 'Must provide cartId, ProdId, quantity' , '')

  try {
    const resp = await cartsService.addProductToCart(cid, pid, Number(quantity));
    if(resp.msg === 'Product added') {
      //res.send(resp);
      httpResponse.OK(res, 'OK', resp);
    } else {
      //res.status(404).send(resp);
      httpResponse.NotFound(res, 'Not found', resp);
    }

  } catch (error) {
    req.logger.error(error);
    //res.status(500).send({msg: error.message});
    httpResponse.Error(res, 'Error while adding Product', error.message);
  }
};

export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const resp = await cartsService.deleteProductFromCart(cid, pid);
    //res.send(resp);
    httpResponse.OK(res, 'OK', resp);
  } catch (error) {
    req.logger.error(error);
    //res.status(500).send({msg: error.message});
    httpResponse.Error(res, 'Error while deleting product from cart', error.message);
  }
};

export const updateProductsFromCart = async(req, res) => {
  const { cid } = req.params;
  const { products } = req.body

  try {
    const resp = await cartsService.updateProductsFromCart(cid, products);
    // res.send(resp);
    httpResponse.OK(res, 'OK', resp);
  } catch (error) {
    req.logger.error(error);
    //res.status(500).send({msg: error.message})
    httpResponse.Error(res, 'Error while updating products from cart', error.message);
  }
};

export const updateProductFromCart = async(req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const resp = await cartsService.updateProductQuantity(cid, pid, Number(quantity));
    // res.send(resp)
    httpResponse.OK(res, 'OK', resp);
  } catch (error) {
    req.logger.error(error);
    // res.status(500).send({msg: error.message})
    httpResponse.Error(res, 'Error while updating products from cart', error.message);

  }
};

export const emptyCart = async(req, res) => {
  const { cid } = req.params;

  try {
    const resp = await cartsService.deleteAllProductsFromCart(cid);
    // res.send(resp);
    httpResponse.OK(res, 'OK', resp);

  } catch (error) {
    req.logger.error(error);
    // res.status(500).send({msg: error.message})
    httpResponse.Error(res, 'Error while emptying cart', error.message);
  }
};

export const purchase = async (req, res) => {
  const { cid } = req.params;

  try {
    const resp = await cartsService.purchase(cid);
    // res.send(resp);
    httpResponse.OK(res, 'OK', resp);

  } catch (error) {
    req.logger.error(error);
    // res.status(500).send({msg: error.message});
    httpResponse.Error(res, 'Error while purchasing', error.message);
  }
}