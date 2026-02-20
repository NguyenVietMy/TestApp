import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="container">
          <p>FREE U.S. SHIPPING ON ORDERS $75+</p>
        </div>
      </div>
      
      <div className="navbar-main">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-logo">
              <span className="logo-text">GYM POWER</span>
              <span className="logo-icon">⚡</span>
            </Link>

            <div className="navbar-links">
              <div 
                className="nav-item"
                onMouseEnter={() => setShowDropdown('supplements')}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link to="/products?category=supplements">SUPPLEMENTS</Link>
                {showDropdown === 'supplements' && (
                  <div className="dropdown-menu">
                    <Link to="/products?category=supplements">All Supplements</Link>
                    <Link to="/products?category=supplements&type=protein">Protein</Link>
                    <Link to="/products?category=supplements&type=preworkout">Pre-Workout</Link>
                    <Link to="/products?category=supplements&type=recovery">Recovery</Link>
                  </div>
                )}
              </div>

              <div 
                className="nav-item"
                onMouseEnter={() => setShowDropdown('merchandise')}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link to="/products?category=merchandise">MERCHANDISE</Link>
                {showDropdown === 'merchandise' && (
                  <div className="dropdown-menu">
                    <Link to="/products?category=merchandise">All Merchandise</Link>
                    <Link to="/products?category=merchandise&type=apparel">Apparel</Link>
                    <Link to="/products?category=merchandise&type=accessories">Accessories</Link>
                  </div>
                )}
              </div>

              <div 
                className="nav-item"
                onMouseEnter={() => setShowDropdown('equipment')}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link to="/products?category=equipment">EQUIPMENT</Link>
                {showDropdown === 'equipment' && (
                  <div className="dropdown-menu">
                    <Link to="/products?category=equipment">All Equipment</Link>
                    <Link to="/products?category=equipment&type=belts">Belts</Link>
                    <Link to="/products?category=equipment&type=straps">Straps</Link>
                  </div>
                )}
              </div>
            </div>

            <div className="navbar-actions">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </form>

              {isAuthenticated ? (
                <div 
                  className="nav-item account-menu"
                  onMouseEnter={() => setShowDropdown('account')}
                  onMouseLeave={() => setShowDropdown(null)}
                >
                  <button className="icon-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>
                  {showDropdown === 'account' && (
                    <div className="dropdown-menu account-dropdown">
                      <p className="user-name">{user?.name}</p>
                      <p className="user-membership">{user?.membership?.toUpperCase()} MEMBER</p>
                      <Link to="/checkout">Orders</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="icon-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
              )}

              <Link to="/cart" className="icon-button cart-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

