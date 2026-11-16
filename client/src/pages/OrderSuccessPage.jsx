import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Home } from 'lucide-react';
import { formatINR } from '../utils/currency';

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
        // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="showcase-outer-canvas">
      <div className="showcase-card-container" style={{ padding: '60px 24px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <CheckCircle2 size={64} color="#16a34a" style={{ margin: '0 auto 16px' }} />
          <span style={{ background: '#dcfce7', color: '#15803d', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700 }}>
            ORDER CONFIRMED · MLC STORE
          </span>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '20px', marginBottom: '8px', color: '#111827' }}>
            Thank You For Your Order!
          </h1>
          <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '28px' }}>
            Your items are being packed and dispatched with express standard delivery.
          </p>

          <div style={{ background: '#F8F9FA', padding: '24px', borderRadius: '18px', marginBottom: '28px', textAlign: 'left', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#64748B' }}>Order Reference:</span>
              <strong>#{id}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#64748B' }}>Payment Status:</span>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>PAID (Confirmed)</span>
            </div>
            {order && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#64748B' }}>Deliver To:</span>
                  <span>{order.shippingAddress?.fullName} ({order.shippingAddress?.city})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Total Amount Paid:</span>
                  <strong style={{ color: 'var(--brand-primary)' }}>{formatINR(order.totalPrice)}</strong>
                </div>
              </>
            )}
          </div>

          {order && order.orderItems && (
            <div style={{ textAlign: 'left', marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>Items in this shipment:</h3>
              <div style={{ borderTop: '1px solid #E2E8F0' }}>
                {order.orderItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                    <img src={item.image} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--brand-primary)' }}>{formatINR(item.qty * item.price)}</div>
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
    </div>
  );
};

export default OrderSuccessPage;
