import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Package, Heart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BasketIcon } from './ProductCard';

const Navbar = ({ onSearch, favoritesCount = 0 }) => {
  const { itemsCount } = useCart();
  const { user, logout } = useAuth();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword);
    } else {
      navigate(`/?search=${encodeURIComponent(keyword)}`);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setKeyword(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <header className="brand-header">
      <div className="header-inner">
        {/* Brand Logo MLC */}
        <Link to="/" className="brand-logo" title="MLC Store">
          <span className="brand-name">MLC</span>
        </Link>

        {/* Search Bar */}
        <form className="header-search-wrap" onSubmit={handleSearchSubmit}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={keyword}
            onChange={handleSearchChange}
          />
        </form>

        {/* Right Navigation Actions */}
        <nav className="header-actions">
          {/* Orders */}
          <Link to="/orders" className="nav-action-link" title="Orders">
            <Package size={20} className="nav-icon" />
            <span>Orders</span>
          </Link>

          {/* Favourites */}
          <Link
            to="/?filter=favourites"
            className="nav-action-link"
            title="Favourites"
          >
            <Heart size={20} className="nav-icon" />
            <span>Favourites</span>
            {favoritesCount > 0 && (
              <span className="fav-counter-badge">{favoritesCount}</span>
            )}
          </Link>

          {/* Cart with Orange Badge */}
          <Link to="/cart" className="nav-action-link cart-link" title="View Cart">
            <div className="cart-icon-wrap">
              <BasketIcon size={20} />
              <span className="cart-badge-count">{itemsCount > 0 ? itemsCount : 16}</span>
            </div>
            <span>Cart</span>
          </Link>

          {/* User Profile Avatar / Login */}
          {user ? (
            <div className="user-profile-menu">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt={user.name}
                className="user-avatar"
                title={`Signed in as ${user.name}`}
              />
              <button
                onClick={logout}
                className="logout-btn"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="user-profile-menu" title="Account">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                alt="Account"
                className="user-avatar"
              />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
