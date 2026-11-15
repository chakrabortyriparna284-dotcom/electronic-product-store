import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CheckCircle2, AlertCircle, Shield, Truck } from 'lucide-react';
import Rating from '../components/Rating';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedAlert, setAddedAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
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
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Loading product specifications...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="alert-box alert-danger">
          <h3>Error loading product</h3>
          <p>{error || 'Product not found'}</p>
        </div>
        <Link to="/" className="btn-outline">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      <Link to="/" className="btn-outline" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      {addedAlert && (
        <div className="alert-box alert-success" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>Added {qty} item(s) to your cart!</span>
          <Link to="/cart" style={{ marginLeft: 'auto', textDecoration: 'underline', fontWeight: 700 }}>
            View Cart
          </Link>
        </div>
      )}

      <div className="detail-grid">
        {/* Left: Product Image */}
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>

        {/* Right: Product Details & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              {product.brand} · {product.category}
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', lineHeight: 1.25 }}>
              {product.name}
            </h1>
          </div>

          <Rating value={product.rating} text={`${product.numReviews} customer reviews`} />

          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            ${product.price.toFixed(2)}
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.98rem' }}>
            {product.description}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

          {/* Stock & Quantity Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status: </span>
              {product.countInStock > 0 ? (
                <span style={{ color: '#16a34a', fontWeight: 700 }}>
                  In Stock ({product.countInStock} available)
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
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.95rem',
                  }}
                >
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="btn-primary"
              style={{ flex: 1, padding: '14px', fontSize: '1rem' }}
            >
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
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

          {/* Guarantees */}
          <div style={{ marginTop: '12px', background: '#f8fafc', padding: '14px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Truck size={16} color="#2563eb" />
              <span>Free 2-day delivery across college campus / city</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} color="#2563eb" />
              <span>Official Manufacturer Warranty Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
