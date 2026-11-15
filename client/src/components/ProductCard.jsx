import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Rating from './Rating';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-img"
          loading="lazy"
        />
        <span className="card-category-badge">{product.category}</span>
      </Link>

      <div className="card-body">
        <span className="card-brand">{product.brand}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="card-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        <Rating value={product.rating} text={`${product.numReviews} reviews`} />

        <div className="card-footer">
          <div className="card-price">${product.price.toFixed(2)}</div>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.countInStock === 0}
            className="btn-primary"
            style={{
              padding: '8px 12px',
              fontSize: '0.85rem',
              opacity: product.countInStock === 0 ? 0.6 : 1,
            }}
          >
            <ShoppingCart size={16} />
            <span>{product.countInStock > 0 ? 'Add' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
