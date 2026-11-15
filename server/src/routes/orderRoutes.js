import express from 'express';
import { createOrder, getOrderById } from '../controllers/orderController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(optionalAuth, createOrder);
router.route('/:id').get(getOrderById);

export default router;
