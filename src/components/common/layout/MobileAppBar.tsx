import React from 'react';
import { Menu, Bell, Dumbbell } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface MobileAppBarProps {
  title?: string;
}

export const MobileAppBar: React.FC<MobileAppBarProps> = ({ title }) => {
  const { toggleDrawer, currentUser, unreadNotificationCount, markNotificationsAsRead } = useApp();
  const navigate = useNavigate();

  return (
    <header className="mobile-app-bar">
      {/* Left: Hamburger Menu */}
      <div className="mobile-appbar-left">
        <button
          onClick={toggleDrawer}
          className="hamburger-btn touch-target"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        {/* Center: Brand or Title */}
        <div className="mobile-brand" onClick={() => navigate('/')}>
          <div className="brand-icon-wrapper" style={{ width: '30px', height: '30px' }}>
            <Dumbbell size={16} />
          </div>
          <h2>{title || 'FitZone Gym'}</h2>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="mobile-appbar-right">
        <button
          onClick={markNotificationsAsRead}
          className="topbar-action-icon touch-target"
          style={{ width: '36px', height: '36px' }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadNotificationCount > 0 && <span className="notif-badge-dot" />}
        </button>

        <button
          onClick={() => navigate('/settings')}
          className="touch-target"
          aria-label="User profile"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="mobile-avatar-small"
          />
        </button>
      </div>
    </header>
  );
};
