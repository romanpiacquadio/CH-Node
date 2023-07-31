import { Router } from 'express';
import { 
  index as indexView,
  realTimeProducts as realTimeProductsView,
  chat as chatView,
  products as productsView,
  cart as cartView,
  login as loginView,
  register as registerView,
} from '../controllers/view.controllers.js';

const router = new Router();


router.get('/', indexView);

router.get('/realtimeproducts', realTimeProductsView);

router.get('/chat', chatView);

router.get('/products', productsView);

router.get('/carts/:cid', cartView);

router.get('/login', loginView);

router.get('/register', registerView);

export default router;