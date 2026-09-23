import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, ShieldCheck } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { NAVIGATION_ITEMS, CATEGORY_LABELS } from '../../../config/navigation';
import { DynamicIcon } from '../DynamicIcon';
import type { NavCategory } from '../../../types';

export const Sidebar: React.FC = () => {
  const { role, currentUser } = useApp();

  // Filter navigation items accessible to active role
  const accessibleItems = NAVIGATION_ITEMS.filter(item => item.roles.includes(role));

  // Group by category
  const categories: NavCategory[] = [
    'MAIN',
    'MEMBERS',
    'FITNESS',
    'TRAINING',
    'MANAGEMENT',
    'COMMUNICATION',
    'REPORTS',
    'SYSTEM'
  ];

  return (
    <aside className="desktop-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-icon-wrapper">
          <Dumbbell size={24} strokeWidth={2.5} />
        </div>
        <div className="brand-title-group">
          <h2>FITZONE</h2>
          <span>ELITE FITNESS OS</span>
        </div>
      </div>

      {/* Nav groups */}
      <div className="sidebar-nav-container">
        {categories.map(cat => {
          const itemsInCat = accessibleItems.filter(item => item.category === cat);
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat} className="nav-group-section">
              <div className="nav-group-title">{CATEGORY_LABELS[cat] || cat}</div>
              <div className="sidebar-nav-items">
                {itemsInCat.map(item => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `sidebar-nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <div className="nav-link-left">
                      <DynamicIcon name={item.iconName} size={18} />
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
            </div>
          );
        })}
      </div>

      {/* Footer Profile Area */}
      <div className="sidebar-footer">
        <div className="user-profile-widget">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="user-avatar"
          />
          <div className="user-info-text">
            <div className="user-name">{currentUser.name}</div>
            <div className="user-role-badge">
              <ShieldCheck size={12} style={{ display: 'inline', marginRight: '3px' }} />
              {currentUser.role}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
