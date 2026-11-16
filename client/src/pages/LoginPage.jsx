import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    try {
      await login(email, password);
      navigate(redirect);
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('demo@example.com');
    setPassword('password123');
  };

  return (
    <div className="showcase-outer-canvas">
      <div className="showcase-card-container" style={{ maxWidth: '480px', padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--brand-primary)', marginBottom: '4px' }}>
            MLC
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Welcome Back</h1>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '4px' }}>
            Sign in to track orders, saved favorites, and fast checkout.
          </p>
        </div>

        {/* 1-Click Demo Fill */}
        <button
          type="button"
          onClick={handleQuickDemoFill}
          style={{
            width: '100%',
            padding: '10px 14px',
            marginBottom: '20px',
            background: 'var(--brand-primary-light)',
            border: '1.5px dashed var(--brand-primary)',
            borderRadius: '12px',
            color: 'var(--brand-primary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Sparkles size={16} />
          <span>1-Click Auto Fill Demo Account</span>
        </button>

        {localError && <div className="alert-box alert-danger">{localError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '10px', justifyContent: 'center' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to MLC'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.875rem', color: '#64748B' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
