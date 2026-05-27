import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onAddTransaction }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const avatarLetter = user?.name?.charAt(0).toUpperCase() || '?';

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-row">
          <div className="sidebar-logo">
          <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff', letterSpacing: '-1px' }}>FT</span>
        </div>
          <span className="sidebar-app-name">FinTrack</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="sidebar-nav">
        <button className="nav-item active">
          <span className="nav-item-icon">▤</span>
          <span>Overview</span>
        </button>
        <button className="nav-item" onClick={onAddTransaction}>
          <span className="nav-item-icon">＋</span>
          <span>Add Transaction</span>
        </button>
      </nav>

      {/* User at bottom */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', marginBottom: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'var(--green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
          }}>
            {avatarLetter}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.email}
            </p>
          </div>
        </div>
        <button className="nav-item" onClick={handleLogout} id="logout-btn">
          <span className="nav-item-icon">→</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
