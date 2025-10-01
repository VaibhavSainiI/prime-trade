const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token) {
      return res.status(401).json({ 
        message: 'Not authorized to access this route' 
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        return res.status(401).json({ 
          message: 'Not authorized, user not found' 
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({ 
          message: 'Account has been deactivated' 
        });
      }

      next();
    } catch (error) {
      console.error('JWT Error:', error.message);
      return res.status(401).json({ 
        message: 'Not authorized, token failed' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in authentication' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'Not authorized as an admin' 
    });
  }
};

module.exports = { auth, admin };