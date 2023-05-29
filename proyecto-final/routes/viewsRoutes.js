import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts')
})

export default router;