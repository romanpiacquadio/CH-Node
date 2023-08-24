import { Router } from 'express';
import { isValidMongoId } from '../middlewares/is-valid-mongo-id-.middleware.js';
import { checkAuthJwt } from '../middlewares/auth-strategy.middleware.js';
import { 
  createCart as createCartController,
  getCart as getCartController,
  addProductToCart as addProductToCartController,
  deleteProductFromCart as deleteProductFromCartController,
  updateProductsFromCart as updateProductsFromCartController,
  updateProductFromCart as updateProductFromCartController,
  emptyCart as emptyCartController,
  purchase as purchaseController,
} from '../controllers/cart.controllers.js';
import { handlePolicies } from '../middlewares/handle-policies.middleware.js';

const router = Router();

// This endpoint creates a new Cart 
router.post('/', createCartController);

// This endpoint sends to the client the products included in a given cart
router.get('/:cid', [isValidMongoId('cid'), checkAuthJwt('jwt')], getCartController);

// This endpoint allows to add a product to a cart
router.post('/:cid/product/:pid', [handlePolicies('jwt', ['USER']), isValidMongoId('cid'), isValidMongoId('pid')], addProductToCartController);

// This endpoint deletes a product from a cart
router.delete('/:cid/products/:pid', [isValidMongoId('cid'), isValidMongoId('pid')], deleteProductFromCartController);

// This endpoint updates the products of a cart
router.put('/:cid', isValidMongoId('cid'), updateProductsFromCartController);

// This endpoint updates a product from a cart
router.put('/:cid/products/:pid', [isValidMongoId('cid'), isValidMongoId('pid')], updateProductFromCartController);

// This endpoint emptyies a cart
router.delete('/:cid', isValidMongoId('cid'), emptyCartController);

//This endpoint creates a ticket
router.get('/:cid/purchase', isValidMongoId('cid'), purchaseController);



export default router;
