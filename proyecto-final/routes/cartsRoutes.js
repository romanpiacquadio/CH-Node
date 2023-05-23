import express, { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

let carts = [
  {
      id: "d9619dd3-33f4-4b0f-8fbc-ff8d4da78ad4",
      products: []
  },
  {
      id: "957c9570-15a9-49c8-9b39-3bcf5c2e2bcf",
      products: []
  }
];

// {
//   "d9619dd3-33f4-4b0f-8fbc-ff8d4da78ad4": {
//     id: "d9619dd3-33f4-4b0f-8fbc-ff8d4da78ad4",
//     products: []
//   },
//   "957c9570-15a9-49c8-9b39-3bcf5c2e2bcf": {
//       id: "957c9570-15a9-49c8-9b39-3bcf5c2e2bcf",
//       products: []
//     }
//   }
// }

router.post('/', (req, res) => {
  const id = uuidv4();
  const newCart = {
    id,
    products: []
  }

  carts.push(newCart)

  res.send(carts)
})

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cartFound = carts.find(cart => cart.id === cid);

  res.send(cartFound.products);
})

router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cartFound = carts.find(cart => cart.id === cid);
  const productExisted = cartFound.products.find(product => product.id === pid);

  if(!productExisted){
    cartFound.products.push({ 
      id: pid, 
      quantity 
    });
  } else {
    productExisted.quantity += quantity;
  }
  
  res.send('ok')
})

// {
//   id: "id-carrito-1",
//   products: [
//     {
//       id: "id-producto-1",
//       quantity: 5
//     }
//   ]
// }

// products1 = {
//   "abc-prod-00001": {
//     id: "abc-prod-00001",
//     price: 300,
//     stock: 20
//   },
//   "abc-prod-00002": {
//     id: "abc-prod-00002",
//     price: 50,
//     stock: 12
//   },
//   "abc-prod-00003": {
//     id: "abc-prod-00003",
//     price: 15,
//     stock: 8
//   },
//   "abc-prod-00004": {
//     id: "abc-prod-00004",
//     price: 75,
//     stock: 30
//   }
// }

// products2 = [
//   {
//     id: "abc-prod-00001",
//     price: 300,
//     stock: 20
//   },
//   {
//     id: "abc-prod-00002",
//     price: 50,
//     stock: 12
//   },
//   {
//     id: "abc-prod-00003",
//     price: 15,
//     stock: 8
//   },
//   {
//     id: "abc-prod-00004",
//     price: 75,
//     stock: 30
//   }
// ]

// products2.find( product => product.id === "abc-prod-00004")
// products1["abc-prod-00004"]


// {
//   id: "abc-prod-00004",
//   price: 75,
//   stock: 30
// }



export default router
