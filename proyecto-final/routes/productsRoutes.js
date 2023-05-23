import express, { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import fs from 'fs';

const router = Router();

const productManager = new ProductManager()


router.get('/', async (req, res) => {
  const allProducts = await productManager.getProducts()
  res.send(allProducts)
})

router.get('/:pid', async (req, res) => {
  const { pid } = req.params

  const productFound = await productManager.getProduct(pid)

  if(!productFound) return res.status(404).json({"msg": `No existe un producto con el id: ${pid}`})

  res.json(productFound)
})

router.post('/', async (req, res) => {
  const productData = req.body

  const newProductStatus = await productManager.createProduct(productData)

  res.send({msg: newProductStatus})
})

router.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const newProductData = req.body;

  const resp = await productManager.updateProduct(pid, newProductData)

  res.send(resp)
})


router.delete('/:pid', async (req, res) => {
  const { pid } = req.params
  
  const resp = await productManager.deleteProduct(pid)

  if(!resp) return res.status(404).send({msg: 'Id no válido'})

  res.send({msg: resp})
})

export default router







