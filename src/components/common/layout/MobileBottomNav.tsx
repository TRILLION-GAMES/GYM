import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MoreHorizontal, X } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { NAVIGATION_ITEMS } from '../../../config/navigation';
import { DynamicIcon } from '../DynamicIcon';
import type { NavItemConfig } from '../../../types';

export const MobileBottomNav: React.FC = () => {
  const { role, isMoreSheetOpen, setIsMoreSheetOpen } = useApp();
  const location = useLocation();

  // Role-customized primary 4 bottom tabs
  let primaryItemIds: string[] = [];
  if (role === 'member') {
    primaryItemIds = ['dashboard', 'workouts', 'diet', 'messages'];
  } else if (role === 'trainer') {
    primaryItemIds = ['dashboard', 'sessions', 'members', 'messages'];
  } else {
    // Admin
    primaryItemIds = ['dashboard', 'members', 'attendance', 'payments'];
  }

  const primaryItems = primaryItemIds
    .map(id => NAVIGATION_ITEMS.find(item => item.id === id))
    .filter(Boolean) as NavItemConfig[];

  // All other accessible items for this role that aren't in primary items
  const accessibleItems = NAVIGATION_ITEMS.filter(item => item.roles.includes(role));
  const moreItems = accessibleItems.filter(item => !primaryItemIds.includes(item.id));

  const isAnyMoreItemActive = moreItems.some(item => location.pathname === item.path);

  return (
    <>
      <nav className="mobile-bottom-nav" aria-label="Bottom Navigation">
        {primaryItems.map(item => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="nav-icon-container">
              <DynamicIcon name={item.iconName} size={22} />
              {item.badge && item.id === 'messages' && (
                <span className="bottom-tab-badge">{item.badge}</span>
              )}
            </div>
            <span>{item.id === 'dashboard' ? 'Home' : item.title.split(' ')[0]}</span>
          </NavLink>
        ))}

        {/* 5th Tab: More Button */}
        <button
          onClick={() => setIsMoreSheetOpen(!isMoreSheetOpen)}
          className={`bottom-nav-item ${isAnyMoreItemActive || isMoreSheetOpen ? 'active' : ''}`}
          aria-label="More navigation options"
        >
          <div className="nav-icon-container">
            <MoreHorizontal size={22} />
          </div>
          <span>More</span>
        </button>
      </nav>

      {/* "More" Bottom Sheet Modal */}
      {isMoreSheetOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setIsMoreSheetOpen(false)}
            aria-hidden="true"
          />
          <div className="bottom-sheet" role="dialog" aria-modal="true" aria-label="More options">
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>More Features</h3>
              <button
                onClick={() => setIsMoreSheetOpen(false)}
                className="btn-ghost touch-target"
                aria-label="Close sheet"
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}
            >
              {moreItems.map(item => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMoreSheetOpen(false)}
                  className={({ isActive }) =>
                    `module-card ${isActive ? 'glow-hover' : ''}`
                  }
                  style={{ minHeight: '100px', padding: '14px' }}
                >
                  <div className="module-card-icon-wrap" style={{ marginBottom: '8px' }}>
                    <DynamicIcon name={item.iconName} size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700 }}>{item.title}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.subtitle}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
