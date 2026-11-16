import React from 'react';
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { formatINR } from '../utils/currency';

const Footer = () => {
  return (
    <footer className="brand-footer">
      <div className="footer-inner">
        {/* Value Props */}
        <div className="footer-props-grid">
          <div className="footer-prop-item">
            <Truck color="#6857F7" size={26} />
            <div>
              <h4 style={{ color: '#111827', fontSize: '0.95rem', fontWeight: 700 }}>Free Express Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>On all orders above {formatINR(999, true)}</p>
            </div>
          </div>
          <div className="footer-prop-item">
            <ShieldCheck color="#6857F7" size={26} />
            <div>
              <h4 style={{ color: '#111827', fontSize: '0.95rem', fontWeight: 700 }}>2-Year Warranty</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>100% Genuine brand products</p>
            </div>
          </div>
          <div className="footer-prop-item">
            <RefreshCw color="#6857F7" size={26} />
            <div>
              <h4 style={{ color: '#111827', fontSize: '0.95rem', fontWeight: 700 }}>30 Days Easy Return</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Hassle-free direct refund</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-brand-title">
            <span className="brand-text">MLC</span>
            <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>Official Online Store</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#8E95A5' }}>
            © {new Date().getFullYear()} MLC Inc. All prices in Indian Rupees (₹ INR).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
