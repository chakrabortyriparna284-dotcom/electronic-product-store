import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Zap, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onSearch }) => {
  const { itemsCount } = useCart();
  const { user, logout } = useAuth();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword);
    } else {
      navigate(`/?search=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Zap size={20} />
          </div>
          <span>VoltTech</span>
        </Link>

        {/* Global Search */}
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search laptops, smartphones, headphones..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (onSearch) onSearch(e.target.value);
            }}
          />
        </form>

        {/* Nav Actions */}
        <div className="nav-actions">
          <Link to="/cart" className="nav-btn" title="View Cart">
            <ShoppingCart size={20} />
            <span>Cart</span>
            {itemsCount > 0 && <span className="cart-badge">{itemsCount}</span>}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="nav-btn"
                style={{ color: '#ef4444' }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-btn">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
