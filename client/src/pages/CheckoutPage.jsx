import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cartItems, totalPrice, subtotal, taxPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user ? user.name : 'Alex Johnson',
    address: '442 College Avenue, Suite 101',
    city: 'San Jose',
    postalCode: '95112',
    phone: '+1 (555) 019-2834',
  });

  const [paymentMethod] = useState('Cash on Delivery / Simulated Card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (user && user.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order creation failed');

      clearCart();
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      <Link to="/cart" className="btn-outline" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={16} /> Back to Cart
      </Link>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Checkout</h1>

      {error && <div className="alert-box alert-danger">{error}</div>}

      <div className="cart-layout">
        {/* Left: Shipping Details Form */}
        <div className="cart-items-box">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>1. Shipping Details</h2>
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label className="form-label">Recipient Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="form-input"
                value={shippingAddress.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="address"
                required
                className="form-input"
                value={shippingAddress.address}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="form-input"
                  value={shippingAddress.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Postal / ZIP Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  className="form-input"
                  value={shippingAddress.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="tel"
                name="phone"
                required
                className="form-input"
                value={shippingAddress.phone}
                onChange={handleChange}
              />
            </div>
          </form>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '24px 0' }} />

          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>2. Payment Method</h2>
          <div
            style={{
              padding: '16px',
              border: '2px solid var(--primary)',
              borderRadius: '8px',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <strong style={{ color: 'var(--primary)' }}>{paymentMethod}</strong>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Simulated transaction for academic project demonstration.
              </p>
            </div>
            <CheckCircle size={22} color="var(--primary)" />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="summary-box">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>Summary ({cartItems.length} items)</h3>

          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.qty}x {item.name}</span>
                <span style={{ fontWeight: 600 }}>${(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Tax (8%)</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0', fontSize: '1.25rem', fontWeight: 800 }}>
            <span>Total</span>
            <span style={{ color: 'var(--primary)' }}>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={loading || cartItems.length === 0}
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
          >
            {loading ? 'Processing Order...' : `Confirm & Place Order ($${totalPrice.toFixed(2)})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
