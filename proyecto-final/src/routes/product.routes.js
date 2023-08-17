import { Router } from 'express';
import { isValidMongoId } from '../middlewares/is-valid-mongo-id-.middleware.js';
import { 
  getAllProducts as getAllProductsController,
  getOneProduct as getOneProductController,
  createProduct as createProductController,
  updateProduct as updateProductController,
  deleteProduct as deleteProductController,
} from '../controllers/product.controllers.js';

const router = Router();

// This endpoint sends the full list of products to the client.
router.get('/', getAllProductsController);

// This endpoint responds with the information of a sigle product.
router.get('/:pid', isValidMongoId('pid'), getOneProductController);

//This endpoint creates a product with information provided by the client and saves it into the DB.
router.post('/', createProductController);

// This endpoint updates the given properties of a product.
router.put('/:pid', isValidMongoId('pid'), updateProductController);

// This endpoint deletes a product from the DB.  
router.delete('/:pid', isValidMongoId('pid'), deleteProductController);

export default router;







