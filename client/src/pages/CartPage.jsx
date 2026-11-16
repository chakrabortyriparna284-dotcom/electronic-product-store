import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BasketIcon } from '../components/ProductCard';
import { formatINR } from '../utils/currency';

const CartPage = () => {
  const { cartItems, updateQty, removeFromCart, clearCart, subtotal, taxPrice, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="showcase-outer-canvas">
        <div className="showcase-card-container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '440px', margin: '0 auto', background: '#F8F9FA', padding: '40px', borderRadius: '24px' }}>
            <div style={{ width: '64px', height: '64px', background: '#ECEAFD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--brand-primary)' }}>
              <BasketIcon size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Your Cart is Empty</h2>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              Looks like you haven't added any MLC products yet.
            </p>
            <Link to="/" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Explore Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="showcase-outer-canvas">
      <div className="showcase-card-container" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Shopping Cart ({cartItems.length} items)</h1>
          <button onClick={clearCart} style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            Clear All
          </button>
        </div>

        <div className="cart-layout">
          {/* Left: Cart Items List */}
          <div className="cart-items-box">
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <Link to={`/product/${item.product}`}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0 6px', color: '#111827' }}>{item.name}</h4>
                  </Link>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                    {formatINR(item.price)}
                  </div>
                </div>

                {/* Quantity Select */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <select
                    value={item.qty}
                    onChange={(e) => updateQty(item.product, Number(e.target.value))}
                    className="qty-select-box"
                  >
                    {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeFromCart(item.product)}
                    style={{ color: '#94a3b8', padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div style={{ paddingTop: '20px' }}>
              <Link to="/" className="btn-outline" style={{ fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="summary-box">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>Order Summary</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748B' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatINR(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748B' }}>GST / Estimated Tax (18%)</span>
              <span style={{ fontWeight: 600 }}>{formatINR(taxPrice)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748B' }}>Standard Delivery</span>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.3rem', fontWeight: 800 }}>
              <span>Total</span>
              <span style={{ color: 'var(--brand-primary)' }}>{formatINR(totalPrice)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
