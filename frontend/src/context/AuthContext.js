import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../utils/api';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

// Actions
const authActions = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case authActions.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case authActions.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case authActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case authActions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case authActions.UPDATE_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on mount if token exists
  useEffect(() => {
    if (state.token) {
      loadUser();
    } else {
      dispatch({ type: authActions.SET_LOADING, payload: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load user data
  const loadUser = async () => {
    try {
      const response = await api.get('/auth/me');
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: {
          user: response.data.user,
          token: state.token
        }
      });
    } catch (error) {
      console.error('Load user error:', error);
      dispatch({ type: authActions.LOGOUT });
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      dispatch({ type: authActions.CLEAR_ERROR });

      console.log('Attempting login with email:', email);
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Login error response:', error.response);
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: authActions.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      dispatch({ type: authActions.CLEAR_ERROR });

      console.log('Attempting registration with:', { name, email });
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Registration response:', response.data);
      
      dispatch({
        type: authActions.LOGIN_SUCCESS,
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Registration error response:', error.response);
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: authActions.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: authActions.LOGOUT });
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: authActions.CLEAR_ERROR });
      
      const response = await api.put('/auth/profile', profileData);
      
      dispatch({
        type: authActions.UPDATE_USER,
        payload: response.data.user
      });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      dispatch({ type: authActions.SET_ERROR, payload: message });
      return { success: false, error: message };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: authActions.CLEAR_ERROR });
  };

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateProfile,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;