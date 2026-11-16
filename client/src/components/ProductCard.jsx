import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatINR } from '../utils/currency';
import { useCart } from '../context/CartContext';

// Custom wire shopping basket icon matching the design image
export const BasketIcon = ({ size = 15, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ flexShrink: 0 }}
  >
    <path d="M4 10h16l-2 10H6L4 10z" />
    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    <line x1="10" y1="14" x2="10" y2="17" />
    <line x1="14" y1="14" x2="14" y2="17" />
  </svg>
);

const ProductCard = ({ product, onToggleFavorite, isFavorite = false }) => {
  const { addToCart } = useCart();
  const [favorite, setFavorite] = useState(isFavorite || product.isFavorite || false);
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !favorite;
    setFavorite(next);
    if (onToggleFavorite) {
      onToggleFavorite(product._id, next);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const isHero = Boolean(product.isHeroCard);
  const imageSrc = imgError
    ? product.fallbackSvg || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    : product.image;

  if (isHero) {
    return (
      <div className="product-card hero-card">
        {/* Floating Favorite Button */}
        <button
          className="favorite-btn"
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            color="#5842ED"
            fill={favorite ? '#5842ED' : 'none'}
            strokeWidth={2.2}
          />
        </button>

        {/* Floating Review Badges (Design Showcase) */}
        <div className="hero-review-badge top-left">
          <img
            src={product.reviewsBadge?.[0]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80'}
            alt="User"
            className="review-avatar"
          />
          <span>{product.reviewsBadge?.[0]?.rating || '4.9/5'} ★</span>
        </div>

        <div className="hero-review-badge middle-right">
          <img
            src={product.reviewsBadge?.[1]?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80'}
            alt="User"
            className="review-avatar"
          />
          <span>{product.reviewsBadge?.[1]?.rating || '4.8/5'} ★</span>
        </div>

        <div className="hero-review-badge bottom-left">
          <img
            src={product.reviewsBadge?.[2]?.avatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80'}
            alt="User"
            className="review-avatar"
          />
          <span>{product.reviewsBadge?.[2]?.rating || '5/5'} ★</span>
        </div>

        {/* Hero Image */}
        <Link to={`/product/${product._id}`} className="hero-img-wrap">
          <img
            src={imageSrc}
            alt={product.name}
            className="hero-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </Link>

        {/* Card Content */}
        <div className="hero-content">
          <Link to={`/product/${product._id}`}>
            <h3 className="hero-title" title={product.name}>
              {product.name}
            </h3>
          </Link>

          <div className="card-action-row">
            <button
              onClick={handleAddToCart}
              className={`hero-price-pill ${justAdded ? 'added' : ''}`}
            >
              <BasketIcon size={16} />
              <span>{justAdded ? 'Added! ✓' : formatINR(product.price)}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card standard-card">
      {/* Floating Favorite Button */}
      <button
        className="favorite-btn"
        onClick={handleFavoriteClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={18}
          color="#5842ED"
          fill={favorite ? '#5842ED' : 'none'}
          strokeWidth={2.2}
        />
      </button>

      {/* Product Image Wrap */}
      <Link to={`/product/${product._id}`} className="card-img-wrap">
        <img
          src={imageSrc}
          alt={product.name}
          className="card-img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </Link>

      {/* Top Item Badge */}
      {product.isTopItem && (
        <div className="top-item-badge-wrap">
          <span className="top-item-badge">Top item</span>
        </div>
      )}

      {/* Card Body */}
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h3 className="card-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Pricing & Add to Cart Capsule Button */}
        <div className="card-action-row">
          {product.originalPrice && (
            <span className="original-price">{formatINR(product.originalPrice)}</span>
          )}

          <button
            onClick={handleAddToCart}
            className={`price-pill-btn ${justAdded ? 'added' : ''}`}
            title="Click to add to cart"
          >
            <BasketIcon size={16} />
            <span>{justAdded ? 'Added! ✓' : formatINR(product.price)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
