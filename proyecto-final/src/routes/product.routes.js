import { Router } from 'express';
import { isValidMongoId } from '../middlewares/is-valid-mongo-id-.middleware.js';
import { 
  getAllProducts as getAllProductsController,
  getOneProduct as getOneProductController,
  createProduct as createProductController,
  updateProduct as updateProductController,
  deleteProduct as deleteProductController,
  mockingProduct as mockingProductController,
} from '../controllers/product.controllers.js';
import { handlePolicies } from '../middlewares/handle-policies.middleware.js';


const router = Router();

// This endpoint sends the full list of products to the client.
router.get('/', getAllProductsController);

// This endpoint returns a list of mocked products
router.get('/mockingproducts', mockingProductController);

// This endpoint responds with the information of a sigle product.
router.get('/:pid', isValidMongoId('pid'), getOneProductController);

//This endpoint creates a product with information provided by the client and saves it into the DB.
router.post('/', [handlePolicies('jwt', ['ADMIN', 'PREMIUM'])], createProductController);

// This endpoint updates the given properties of a product.
router.put('/:pid', [handlePolicies('jwt', ['ADMIN', 'PREMIUM']), isValidMongoId('pid')], updateProductController);

// This endpoint deletes a product from the DB.  
router.delete('/:pid', [handlePolicies('jwt', ['ADMIN', 'PREMIUM']), isValidMongoId('pid')], deleteProductController);


export default router;







