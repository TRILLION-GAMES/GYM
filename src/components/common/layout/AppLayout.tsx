import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Search, UserCheck, Shield, Award } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { MobileAppBar } from './MobileAppBar';
import { MobileDrawer } from './MobileDrawer';
import { MobileBottomNav } from './MobileBottomNav';
import { useApp } from '../../../context/AppContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { role, setRole, currentUser, unreadNotificationCount, markNotificationsAsRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current page title from path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/workouts') return 'Workouts';
    if (path === '/diet') return 'Diet & Nutrition';
    if (path === '/progress') return 'Body Progress';
    if (path === '/attendance') return 'Attendance';
    if (path === '/members') return 'Members';
    if (path === '/memberships') return 'Memberships';
    if (path === '/payments') return 'Payments';
    if (path === '/classes') return 'Classes';
    if (path === '/sessions') return 'Personal Training';
    if (path === '/leads') return 'Leads CRM';
    if (path === '/equipment') return 'Equipment';
    if (path === '/messages') return 'Messages';
    if (path === '/reports') return 'Reports & BI';
    if (path === '/settings') return 'Settings';
    return 'FitZone Elite';
  };

  const pageTitle = getPageTitle();

  return (
    <div className="app-container">
      {/* 1. Desktop Sidebar */}
      <Sidebar />

      {/* 2. Main Wrapper */}
      <div className="main-wrapper">
        {/* Mobile App Bar */}
        <MobileAppBar title={pageTitle === 'Dashboard' ? 'FitZone Gym' : pageTitle} />

        {/* Desktop Topbar */}
        <header className="desktop-topbar">
          <div className="topbar-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600 }}>Active Portal:</span>
              {/* Role Switcher Pill */}
              <div className="role-switcher-container">
                <button
                  onClick={() => setRole('member')}
                  className={`role-switcher-btn ${role === 'member' ? 'active' : ''}`}
                >
                  <Award size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Member
                </button>
                <button
                  onClick={() => setRole('trainer')}
                  className={`role-switcher-btn ${role === 'trainer' ? 'active' : ''}`}
                >
                  <UserCheck size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Trainer
                </button>
                <button
                  onClick={() => setRole('admin')}
                  className={`role-switcher-btn ${role === 'admin' ? 'active' : ''}`}
                >
                  <Shield size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Admin / Owner
                </button>
              </div>
            </div>
          </div>

          <div className="topbar-right">
            {/* Quick Search */}
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-dim)'
                }}
              />
              <input
                type="text"
                placeholder="Search workouts, members..."
                style={{ paddingLeft: '36px', width: '220px', height: '38px', borderRadius: 'var(--radius-pill)' }}
              />
            </div>

            {/* Notification Bell */}
            <button
              onClick={markNotificationsAsRead}
              className="topbar-action-icon"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell size={18} />
              {unreadNotificationCount > 0 && <span className="notif-badge-dot" />}
            </button>

            {/* User Avatar & Status */}
            <div
              onClick={() => navigate('/settings')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '2px solid var(--primary)',
                  objectFit: 'cover'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>{currentUser.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--primary)', textTransform: 'capitalize' }}>
                  {role} view
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="page-content-scroll">
          {children}
        </main>

        {/* Mobile Drawer */}
        <MobileDrawer />

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
