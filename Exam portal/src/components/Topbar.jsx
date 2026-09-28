import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Topbar({ onMenuToggle, title, subtitle }) {
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="sidebar-toggle btn-icon btn btn-ghost" onClick={onMenuToggle} aria-label="Toggle sidebar">
          <Menu size={20} />
        </button>
        <div>
          {title && <div className="topbar-title">{title}</div>}
          {subtitle && <div className="topbar-subtitle">{subtitle}</div>}
        </div>
      </div>

      <div className="topbar-right">
        <div className="tooltip-wrapper" style={{ position: 'relative' }}>
          <button
            className="btn btn-ghost btn-icon"
            style={{ position: 'relative' }}
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute', top: 5, right: 5,
              width: 8, height: 8, borderRadius: '50%',
              background: '#dc2626', border: '2px solid white'
            }} />
          </button>
          {!notifOpen && <span className="tooltip">Notifications</span>}
          {notifOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 8,
              width: 250, background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--border-radius-sm)', boxShadow: 'var(--shadow-md)',
              zIndex: 100, padding: 12
            }}>
              <h4 style={{ fontSize: '0.85rem', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Notifications</h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '8px 0' }}>
                You have no new notifications.
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer'
          }}>
            {user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {user?.full_name?.split(' ')[0]}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
