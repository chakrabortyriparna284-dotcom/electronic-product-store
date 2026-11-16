import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Shield, Truck, Heart } from 'lucide-react';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';
import { BasketIcon } from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { formatINR } from '../utils/currency';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedAlert, setAddedAlert] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          // Check fallback mock catalog
          const found = MOCK_PRODUCTS.find((p) => p._id === id);
          if (found) {
            setProduct(found);
          } else {
            throw new Error('Product not found in catalog');
          }
        }
      } catch (err) {
        // Fallback to mock products by id
        const found = MOCK_PRODUCTS.find((p) => p._id === id);
        if (found) {
          setProduct(found);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      setAddedAlert(true);
      setTimeout(() => setAddedAlert(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="showcase-outer-canvas">
        <div className="showcase-card-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '1.2rem', color: '#64748B' }}>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="showcase-outer-canvas">
        <div className="showcase-card-container" style={{ padding: '40px 30px' }}>
          <div className="alert-box alert-danger">
            <h3>Product Not Found</h3>
            <p>{error || 'The requested product could not be located.'}</p>
          </div>
          <Link to="/" className="btn-outline" style={{ marginTop: '20px', display: 'inline-flex' }}>
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = imgError
    ? product.fallbackSvg || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    : product.image;

  return (
    <div className="showcase-outer-canvas">
      <div className="showcase-card-container" style={{ padding: '36px' }}>
        <Link to="/" className="btn-outline" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {addedAlert && (
          <div className="alert-box alert-success" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span>Added {qty} item(s) to your cart!</span>
            <Link to="/cart" style={{ marginLeft: 'auto', textDecoration: 'underline', fontWeight: 700, color: 'var(--brand-primary)' }}>
              View Cart
            </Link>
          </div>
        )}

        <div className="detail-grid">
          {/* Left: Product Image */}
          <div className="detail-img-wrap">
            <img
              src={imageSrc}
              alt={product.name}
              className="detail-img"
              onError={() => setImgError(true)}
            />
            {product.isTopItem && (
              <span className="top-item-badge" style={{ position: 'absolute', top: '16px', left: '16px' }}>
                Top item
              </span>
            )}
          </div>

          {/* Right: Product Details & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <span className="detail-brand-badge">
                {product.brand} · {product.category}
              </span>
              <h1 className="detail-title">
                {product.name}
              </h1>
            </div>

            <Rating value={product.rating} text={`${product.numReviews} customer reviews`} />

            {/* Indian Rupee Price */}
            <div className="detail-price-row">
              <span className="detail-price-main">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="original-price" style={{ fontSize: '1.2rem' }}>
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '1rem' }}>
              {product.description}
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB' }} />

            {/* Stock & Quantity Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Availability: </span>
                {product.countInStock > 0 ? (
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>
                    In Stock ({product.countInStock} units)
                  </span>
                ) : (
                  <span style={{ color: '#dc2626', fontWeight: 700 }}>Out of Stock</span>
                )}
              </div>

              {product.countInStock > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Qty:</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="qty-select-box"
                  >
                    {[...Array(Math.min(product.countInStock || 10, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '12px' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="btn-primary"
                style={{ flex: 1, padding: '14px', fontSize: '1rem' }}
              >
                <BasketIcon size={18} />
                <span>Add to Cart ({formatINR(product.price * qty)})</span>
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                disabled={product.countInStock === 0}
                className="btn-outline"
                style={{ flex: 1, padding: '14px', justifyContent: 'center' }}
              >
                Buy Now
              </button>
            </div>

            {/* Delivery & Warranty Guarantees */}
            <div className="guarantees-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Truck size={18} color="var(--brand-primary)" />
                <span>Free delivery across India on orders above {formatINR(999, true)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={18} color="var(--brand-primary)" />
                <span>100% Genuine MLC Brand Product with Manufacturer Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
