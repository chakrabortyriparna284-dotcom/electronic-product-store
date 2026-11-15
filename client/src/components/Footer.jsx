import React from 'react';
import { Zap, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Value Props */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            paddingBottom: '32px',
            marginBottom: '24px',
            borderBottom: '1px solid #1e293b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Truck color="#3b82f6" size={28} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>Free Express Delivery</h4>
              <p style={{ fontSize: '0.8rem' }}>On all orders above $100</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck color="#3b82f6" size={28} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>2-Year Warranty</h4>
              <p style={{ fontSize: '0.8rem' }}>100% Genuine electronics</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RefreshCw color="#3b82f6" size={28} />
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>30 Days Easy Return</h4>
              <p style={{ fontSize: '0.8rem' }}>No questions asked refund</p>
            </div>
          </div>
        </div>

        <div className="footer-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700 }}>
            <Zap size={18} color="#3b82f6" />
            <span>VoltTech Electronics Store</span>
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} VoltTech Inc. Built for MERN Stack College Capstone Project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
