import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-content fade-in">
        <h1>Welcome to PrimeTrade</h1>
        <p>
          Your gateway to smart trading. Experience a scalable platform built 
          with modern technology, secure authentication, and intuitive design.
        </p>
        <div className="landing-actions">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline">
            Sign In
          </Link>
        </div>
        
        <div style={{ marginTop: '3rem', textAlign: 'left', maxWidth: '500px' }}>
          <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Features</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              ✅ Secure JWT Authentication
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              ✅ Real-time Dashboard
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              ✅ User Profile Management
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              ✅ Responsive Design
            </li>
            <li style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              ✅ RESTful API Backend
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;