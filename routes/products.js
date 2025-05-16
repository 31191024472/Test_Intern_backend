import express from 'express';
import { getProductsByCategory, searchProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get('/category/:id', getProductsByCategory);
router.get('/search', searchProducts);
export default router;
