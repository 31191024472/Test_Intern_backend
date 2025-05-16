import express from 'express';
import { createOrder, sendOrderConfirmation } from '../controllers/ordersController.js';

const router = express.Router();

router.post('/', createOrder);
router.post('/:id/send-confirmation', sendOrderConfirmation);

export default router;
