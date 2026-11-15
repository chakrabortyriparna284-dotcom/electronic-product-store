import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';
import fallbackProducts from '../data/products.js';

// Helper to provide valid 24-character hexadecimal IDs for fallback data
const mockProductsWithIds = fallbackProducts.map((p, idx) => ({
  ...p,
  _id: `65e10000000000000000000${idx + 1}`,
}));

// @desc    Fetch all products (with optional search and category filters)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    // If disconnected, attempt connection now
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    // Fallback if still not connected
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...mockProductsWithIds];
      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (search) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      return res.json(filtered);
    }

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = mockProductsWithIds.find((p) => p._id === req.params.id);
      if (found) return res.json(found);
      return res.status(404).json({ message: 'Product not found in fallback catalog' });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID or server error' });
  }
};
