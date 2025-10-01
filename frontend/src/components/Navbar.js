import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          PrimeTrade
        </Link>

        <ul className="navbar-nav">
          {user ? (
            <>
              <li>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${isActiveLink('/dashboard') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className={`nav-link ${isActiveLink('/profile') ? 'active' : ''}`}
                >
                  Profile
                </Link>
              </li>
              <li className="user-menu" ref={dropdownRef}>
                <div 
                  className="user-avatar" 
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {getInitials(user.name)}
                </div>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" style={{ fontWeight: 'bold' }}>
                      {user.name}
                    </div>
                    <div className="dropdown-item" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {user.email}
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      Account Settings
                    </Link>
                    <button 
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={`nav-link ${isActiveLink('/login') ? 'active' : ''}`}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="btn btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;