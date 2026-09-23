import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Dumbbell, LogOut } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { NAVIGATION_ITEMS } from '../../../config/navigation';
import { DynamicIcon } from '../DynamicIcon';
import type { UserRole } from '../../../types';

export const MobileDrawer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, role, setRole, currentUser } = useApp();

  if (!isDrawerOpen) return null;

  const accessibleItems = NAVIGATION_ITEMS.filter(item => item.roles.includes(role));

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  const handleLinkClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="drawer-backdrop"
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav className="mobile-drawer" aria-label="Mobile Navigation Drawer">
        {/* Header */}
        <div className="drawer-header">
          <div className="mobile-brand">
            <div className="brand-icon-wrapper">
              <Dumbbell size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px' }}>FitZone Elite</h2>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Mobile App</span>
            </div>
          </div>

          <button
            onClick={() => setIsDrawerOpen(false)}
            className="btn-ghost touch-target"
            aria-label="Close drawer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Role Switcher in Drawer for instant evaluation */}
        <div className="drawer-role-switch">
          <div className="drawer-role-label">Switch View / Role</div>
          <div className="drawer-role-buttons">
            <button
              onClick={() => handleRoleChange('member')}
              className={`drawer-role-btn ${role === 'member' ? 'active' : ''}`}
            >
              Member
            </button>
            <button
              onClick={() => handleRoleChange('trainer')}
              className={`drawer-role-btn ${role === 'trainer' ? 'active' : ''}`}
            >
              Trainer
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`drawer-role-btn ${role === 'admin' ? 'active' : ''}`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <div className="drawer-nav-list">
          {accessibleItems.map(item => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/'}
              onClick={handleLinkClick}
              className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DynamicIcon name={item.iconName} size={20} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="badge badge-green" style={{ fontSize: '10px' }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Footer with profile & logout */}
        <div className="sidebar-footer">
          <div className="user-profile-widget" style={{ marginBottom: '10px' }}>
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar" />
            <div className="user-info-text">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role-badge">{role}</div>
            </div>
          </div>

          <button
            onClick={() => {
              setIsDrawerOpen(false);
              alert('Session locked. You can switch roles at any time using the role bar!');
            }}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </>
  );
};
