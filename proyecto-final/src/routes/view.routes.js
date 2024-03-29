import { Router } from 'express';
import { 
  index as indexView,
  realTimeProducts as realTimeProductsView,
  chat as chatView,
  products as productsView,
  cart as cartView,
  login as loginView,
  register as registerView,
  resetPwd as resetPwdView,
  setNewPwd as setNewPwdView,
} from '../controllers/view.controllers.js';
import { handlePolicies } from '../middlewares/handle-policies.middleware.js';

const router = new Router();


router.get('/', indexView);

router.get('/realtimeproducts', realTimeProductsView);

router.get('/chat', handlePolicies('jwt', ['USER']), chatView);

router.get('/products', productsView);

router.get('/carts/:cid', cartView);

router.get('/login', loginView);

router.get('/register', registerView);

router.get('/reset-password', resetPwdView);

router.get('/set-new-password/:token', setNewPwdView);

export default router;