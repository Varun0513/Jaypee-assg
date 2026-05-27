import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/auth/login', formData);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      {/* Left panel */}
      <div className="auth-left">
        <div className="auth-left-logo">
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', letterSpacing: '-1px' }}>FT</span>
        </div>
        <h1>FinTrack</h1>
        <p>Take control of your money.<br />Simple, clear, and always with you.</p>
        <ul className="auth-features">
          <li className="auth-feature-item">
            <div className="auth-feature-dot">📊</div>
            Visual spending breakdown
          </li>
          <li className="auth-feature-item">
            <div className="auth-feature-dot">🏷️</div>
            Smart categorization
          </li>
          <li className="auth-feature-item">
            <div className="auth-feature-dot">🔍</div>
            Search & date filters
          </li>
          <li className="auth-feature-item">
            <div className="auth-feature-dot">🔒</div>
            Your data, only yours
          </li>
        </ul>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue</p>

          {error && <div className="alert alert-error" style={{ marginBottom: 18 }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-green btn-lg btn-full"
              disabled={loading}
              style={{ marginTop: 6 }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="divider" />

          <p style={{ textAlign: 'center', fontSize: '0.87rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
