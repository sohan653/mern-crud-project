const express=require('express');
const { createProducts, readProducts, readOneProduct, updateProduct, deleteProduct } = require('../controllers/product');

const router=express.Router();

router.post('/product',createProducts);
router.get('/product',readProducts);
router.get('/product/:id',readOneProduct);
router.post('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);




module.exports =router;