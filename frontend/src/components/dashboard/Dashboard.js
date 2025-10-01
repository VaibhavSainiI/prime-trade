import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Fetching dashboard data from:', '/dashboard');
      const response = await api.get('/dashboard');
      console.log('Dashboard response:', response.data);
      setDashboardData(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      console.error('Error response:', error.response);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="alert alert-error">
            {error}
            <button 
              onClick={fetchDashboardData}
              className="btn btn-outline"
              style={{ marginLeft: '1rem' }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header fade-in">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's what's happening with your trading account today.</p>
        </div>

        {/* Statistics Grid */}
        <div className="dashboard-grid fade-in">
          <div className="stat-card">
            <div className="stat-value">{dashboardData?.stats?.totalTrades}</div>
            <div className="stat-label">Total Trades</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatCurrency(dashboardData?.stats?.totalProfit)}</div>
            <div className="stat-label">Total Profit</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{dashboardData?.stats?.winRate}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{dashboardData?.stats?.activePositions}</div>
            <div className="stat-label">Active Positions</div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Portfolio Overview */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Portfolio Overview</h3>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6b7280' }}>Total Value</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {formatCurrency(dashboardData?.portfolio?.totalValue)}
                </span>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6b7280' }}>Day Change</span>
                <span style={{ 
                  color: parseFloat(dashboardData?.portfolio?.dayChange) >= 0 ? '#10b981' : '#ef4444',
                  fontWeight: 'bold'
                }}>
                  {parseFloat(dashboardData?.portfolio?.dayChange) >= 0 ? '+' : ''}
                  {formatCurrency(dashboardData?.portfolio?.dayChange)} 
                  ({parseFloat(dashboardData?.portfolio?.dayChangePercent) >= 0 ? '+' : ''}
                  {dashboardData?.portfolio?.dayChangePercent}%)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Quick Actions</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {dashboardData?.quickActions?.map((action) => (
                <button
                  key={action.id}
                  className="btn btn-outline"
                  style={{ 
                    textAlign: 'left', 
                    padding: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {action.title}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {action.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card fade-in">
          <h3 style={{ marginBottom: '1.5rem', color: '#1a202c' }}>Recent Activity</h3>
          <ul className="activity-list">
            {dashboardData?.recentActivity?.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-info">
                  <div className="activity-description">{activity.description}</div>
                  <div className="activity-time">{getTimeAgo(activity.timestamp)}</div>
                </div>
                <div className={`activity-amount ${activity.amount.startsWith('-') ? 'negative' : ''}`}>
                  {activity.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Account Info */}
        <div className="card fade-in">
          <h3 style={{ marginBottom: '1rem', color: '#1a202c' }}>Account Information</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Member Since</span>
              <span>{formatDate(dashboardData?.user?.memberSince)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Last Login</span>
              <span>{dashboardData?.user?.lastLogin ? formatDate(dashboardData.user.lastLogin) : 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Account Status</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;