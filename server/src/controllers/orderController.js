import mongoose from 'mongoose';
import Order from '../models/Order.js';

// In-memory fallback orders if MongoDB is offline
const inMemoryOrders = [];

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Guest or Logged in User)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items specified' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address) {
      return res.status(400).json({ message: 'Shipping address is incomplete' });
    }

    // If MongoDB is offline, store in-memory and return success
    if (mongoose.connection.readyState !== 1) {
      const fallbackOrder = {
        _id: new mongoose.Types.ObjectId().toString(),
        orderItems,
        user: req.user ? req.user._id : null,
        shippingAddress,
        paymentMethod: paymentMethod || 'Cash on Delivery / Simulated Card',
        totalPrice,
        isPaid: true,
        paidAt: new Date(),
        status: 'Confirmed',
        createdAt: new Date(),
      };
      inMemoryOrders.push(fallbackOrder);
      return res.status(201).json(fallbackOrder);
    }

    const order = new Order({
      orderItems,
      user: req.user && mongoose.Types.ObjectId.isValid(req.user._id) ? req.user._id : null,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery / Simulated Card',
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      status: 'Confirmed',
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = inMemoryOrders.find((o) => o._id === req.params.id);
      if (found) return res.json(found);
      return res.status(404).json({ message: 'Order not found' });
    }

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const order = await Order.findById(req.params.id).populate('user', 'name email');
      if (order) return res.json(order);
    }

    const inMem = inMemoryOrders.find((o) => o._id === req.params.id);
    if (inMem) return res.json(inMem);

    res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
