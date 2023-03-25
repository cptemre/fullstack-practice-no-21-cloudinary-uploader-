import express from 'express';
const router = express.Router()

import { createProduct, getProducts } from '../controls/productController';

router.route('/').get(getProducts).post(createProduct)

export {router}