import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '680px' }}>
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)', padding: '40px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
        <CheckCircle2 size={64} color="#16a34a" style={{ margin: '0 auto 16px' }} />
        <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>
          ORDER CONFIRMED & SAVED TO MONGODB
        </span>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '16px', marginBottom: '8px' }}>
          Thank You For Your Order!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
          Your electronics are being prepped for dispatch.
        </p>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
            <strong>#{id}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Payment Status:</span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>PAID (Simulated)</span>
          </div>
          {order && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Deliver To:</span>
                <span>{order.shippingAddress.fullName} ({order.shippingAddress.city})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                <strong style={{ color: 'var(--primary)' }}>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>

        {order && order.orderItems && (
          <div style={{ textAlign: 'left', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Items in this order:</h3>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {order.orderItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontWeight: 700 }}>${(item.qty * item.price).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/" className="btn-primary" style={{ width: '100%', padding: '14px', justifyContent: 'center' }}>
          <Home size={18} />
          <span>Return to Store Home</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
