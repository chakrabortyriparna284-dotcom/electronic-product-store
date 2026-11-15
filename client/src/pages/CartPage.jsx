import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, updateQty, removeFromCart, clearCart, subtotal, taxPrice, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '420px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <ShoppingBag size={56} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            Looks like you haven't added any electronic gadgets yet.
          </p>
          <Link to="/" className="btn-primary" style={{ width: '100%' }}>
            Explore Electronics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Shopping Cart ({cartItems.length} items)</h1>
        <button onClick={clearCart} style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 600 }}>
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
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                  {item.category}
                </span>
                <Link to={`/product/${item.product}`}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '2px 0 6px' }}>{item.name}</h4>
                </Link>
                <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>${item.price.toFixed(2)}</div>
              </div>

              {/* Quantity Select */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <select
                  value={item.qty}
                  onChange={(e) => updateQty(item.product, Number(e.target.value))}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.9rem',
                  }}
                >
                  {[...Array(Math.min(item.countInStock || 10, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => removeFromCart(item.product)}
                  style={{ color: '#94a3b8', padding: '6px' }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          <div style={{ paddingTop: '16px' }}>
            <Link to="/" className="btn-outline" style={{ fontSize: '0.875rem' }}>
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="summary-box">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>Order Summary</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated Tax (8%)</span>
            <span style={{ fontWeight: 600 }}>${taxPrice.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.25rem', fontWeight: 800 }}>
            <span>Total</span>
            <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
