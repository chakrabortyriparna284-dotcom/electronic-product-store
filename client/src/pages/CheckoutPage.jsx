import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';

const CheckoutPage = () => {
  const { cartItems, totalPrice, subtotal, taxPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user ? user.name : 'Aarav Sharma',
    address: 'Flat 402, Lotus Heights, MG Road',
    city: 'Bengaluru',
    postalCode: '560001',
    phone: '+91 98765 43210',
  });

  const [paymentMethod] = useState('UPI / Net Banking / Simulated Card');
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

      const orderPayload = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      };

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('latestOrderId', data._id);
        localStorage.setItem('latestOrder', JSON.stringify(data));
        clearCart();
        navigate(`/order/${data._id}`);
      } else {
        // Simulated offline success if backend isn't running
        const simulatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const savedOrder = { ...orderPayload, _id: simulatedId };
        localStorage.setItem('latestOrderId', simulatedId);
        localStorage.setItem('latestOrder', JSON.stringify(savedOrder));
        clearCart();
        navigate(`/order/${simulatedId}`);
      }
    } catch (err) {
      // Graceful offline fallback
      const simulatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const savedOrder = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        _id: simulatedId,
      };
      localStorage.setItem('latestOrderId', simulatedId);
      localStorage.setItem('latestOrder', JSON.stringify(savedOrder));
      clearCart();
      navigate(`/order/${simulatedId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="showcase-outer-canvas">
      <div className="showcase-card-container" style={{ padding: '36px' }}>
        <Link to="/cart" className="btn-outline" style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Back to Cart
        </Link>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Checkout & Delivery</h1>

        {error && <div className="alert-box alert-danger">{error}</div>}

        <div className="cart-layout">
          {/* Left: Shipping Details Form */}
          <div className="cart-items-box">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>1. Delivery Address (India)</h2>
            <form id="checkout-form" onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
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
                <label className="form-label">Street Address / House No.</label>
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
                  <label className="form-label">PIN Code</label>
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
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  required
                  className="form-input"
                  value={shippingAddress.phone}
                  onChange={handleChange}
                />
              </div>
            </form>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '24px', marginBottom: '16px' }}>
              2. Payment Method
            </h2>
            <div
              style={{
                padding: '16px 20px',
                border: '2px solid var(--brand-primary)',
                borderRadius: '16px',
                background: 'var(--brand-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong style={{ color: 'var(--brand-primary)', fontSize: '1rem' }}>{paymentMethod}</strong>
                <p style={{ fontSize: '0.825rem', color: '#64748B', marginTop: '4px' }}>
                  All Indian credit/debit cards, UPI (GPay, PhonePe, Paytm), and Cash on Delivery accepted.
                </p>
              </div>
              <CheckCircle size={22} color="var(--brand-primary)" />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="summary-box">
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>
              Summary ({cartItems.length} items)
            </h3>

            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
              {cartItems.map((item) => (
                <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#64748B' }}>{item.qty}x {item.name}</span>
                  <span style={{ fontWeight: 600 }}>{formatINR(item.qty * item.price)}</span>
                </div>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748B' }}>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748B' }}>GST (18%)</span>
              <span>{formatINR(taxPrice)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
              <span style={{ color: '#64748B' }}>Standard Delivery</span>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0', fontSize: '1.3rem', fontWeight: 800 }}>
              <span>Total Payable</span>
              <span style={{ color: 'var(--brand-primary)' }}>{formatINR(totalPrice)}</span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading || cartItems.length === 0}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center' }}
            >
              {loading ? 'Processing Order...' : `Pay & Place Order (${formatINR(totalPrice)})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
