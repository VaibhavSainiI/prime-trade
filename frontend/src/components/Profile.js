import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
    clearError();
  }, [user, clearError]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      errors.name = 'Name must be less than 50 characters';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear success message when user makes changes
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setSuccessMessage('');

    const result = await updateProfile(formData);
    
    if (result.success) {
      setSuccessMessage('Profile updated successfully!');
    }
    
    setIsSubmitting(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div className="container">
        <div className="dashboard-header fade-in">
          <h1>Account Profile</h1>
          <p>Manage your account information and preferences.</p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Profile Form */}
          <div className="card fade-in">
            <h3 style={{ marginBottom: '1.5rem', color: '#1a202c' }}>Personal Information</h3>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${formErrors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <div className="error-message">{formErrors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${formErrors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <div className="error-message">{formErrors.email}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>
                    <div className="spinner" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', display: 'inline-block' }}></div>
                    Updating...
                  </span>
                ) : (
                  'Update Profile'
                )}
              </button>
            </form>
          </div>

          {/* Account Details */}
          <div className="card fade-in">
            <h3 style={{ marginBottom: '1.5rem', color: '#1a202c' }}>Account Details</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontWeight: '500' }}>User ID</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{user?.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontWeight: '500' }}>Account Type</span>
                <span style={{ textTransform: 'capitalize' }}>{user?.role}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontWeight: '500' }}>Member Since</span>
                <span>{user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontWeight: '500' }}>Last Login</span>
                <span>{user?.lastLogin ? formatDate(user.lastLogin) : 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontWeight: '500' }}>Account Status</span>
                <span style={{ 
                  color: '#10b981', 
                  fontWeight: 'bold',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#d1fae5',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="card fade-in">
            <h3 style={{ marginBottom: '1.5rem', color: '#1a202c' }}>Security</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Password</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Last updated: Recently
                  </div>
                </div>
                <button className="btn btn-outline" disabled>
                  Change Password
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Two-Factor Authentication</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Add extra security to your account
                  </div>
                </div>
                <button className="btn btn-outline" disabled>
                  Enable 2FA
                </button>
              </div>
            </div>
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              backgroundColor: '#f3f4f6', 
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              🔒 These security features are coming soon in future updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;