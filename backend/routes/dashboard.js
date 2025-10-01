const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Simulate dashboard data - in a real app, this would come from database
    const dashboardData = {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        memberSince: req.user.createdAt,
        lastLogin: req.user.lastLogin
      },
      stats: {
        totalTrades: Math.floor(Math.random() * 100) + 10,
        totalProfit: (Math.random() * 10000).toFixed(2),
        winRate: (Math.random() * 30 + 60).toFixed(1),
        activePositions: Math.floor(Math.random() * 5)
      },
      recentActivity: [
        {
          id: 1,
          type: 'trade',
          description: 'Bought 100 shares of AAPL',
          amount: '+$15,230.50',
          timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
          id: 2,
          type: 'profit',
          description: 'Profit from TSLA position',
          amount: '+$2,450.00',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
        },
        {
          id: 3,
          type: 'deposit',
          description: 'Account deposit',
          amount: '+$5,000.00',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
        }
      ],
      portfolio: {
        totalValue: (Math.random() * 50000 + 10000).toFixed(2),
        dayChange: ((Math.random() - 0.5) * 1000).toFixed(2),
        dayChangePercent: ((Math.random() - 0.5) * 5).toFixed(2)
      },
      quickActions: [
        { id: 1, title: 'New Trade', description: 'Place a new trade order', icon: 'trade' },
        { id: 2, title: 'Deposit Funds', description: 'Add money to your account', icon: 'deposit' },
        { id: 3, title: 'View Reports', description: 'Check your trading reports', icon: 'reports' },
        { id: 4, title: 'Account Settings', description: 'Manage your account', icon: 'settings' }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      message: 'Server error getting dashboard data'
    });
  }
});

// @desc    Get user statistics
// @route   GET /api/dashboard/stats
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Simulate detailed statistics
    const stats = {
      overview: {
        totalTrades: Math.floor(Math.random() * 500) + 50,
        successfulTrades: Math.floor(Math.random() * 300) + 30,
        totalProfit: (Math.random() * 25000).toFixed(2),
        totalLoss: (Math.random() * 5000).toFixed(2)
      },
      monthly: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
        profit: (Math.random() * 3000).toFixed(2),
        trades: Math.floor(Math.random() * 50) + 5
      })),
      performance: {
        winRate: (Math.random() * 30 + 60).toFixed(1),
        avgProfit: (Math.random() * 500 + 100).toFixed(2),
        avgLoss: (Math.random() * 200 + 50).toFixed(2),
        sharpeRatio: (Math.random() * 2 + 0.5).toFixed(2)
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      message: 'Server error getting statistics'
    });
  }
});

module.exports = router;