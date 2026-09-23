import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { DynamicIcon } from './DynamicIcon';
import { useApp } from '../../context/AppContext';

interface HomeModuleGridProps {
  title?: string;
  subtitle?: string;
  excludeIds?: string[];
}

export const HomeModuleGrid: React.FC<HomeModuleGridProps> = ({
  title = 'Quick Access Modules',
  subtitle = 'Jump directly into any section of your fitness portal',
  excludeIds = ['dashboard']
}) => {
  const { role } = useApp();
  const navigate = useNavigate();

  // Filter modules accessible to this role, excluding 'dashboard'
  const modules = NAVIGATION_ITEMS.filter(
    item => item.roles.includes(role) && !excludeIds.includes(item.id)
  );

  return (
    <section className="home-modules-section">
      <div className="section-header-row">
        <div>
          <h2>{title}</h2>
          {subtitle && (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {subtitle}
            </p>
          )}
        </div>
        <span className="badge badge-cyan">{modules.length} Modules</span>
      </div>

      <div className="modules-grid">
        {modules.map(mod => (
          <div
            key={mod.id}
            onClick={() => navigate(mod.path)}
            className="module-card"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate(mod.path)}
          >
            <div>
              <div className="module-card-icon-wrap">
                <DynamicIcon name={mod.iconName} size={22} />
              </div>
              <h3>{mod.title}</h3>
              <p>{mod.subtitle || 'Explore feature'}</p>
            </div>

            <div className="module-card-footer">
              <span>{mod.stats?.value || 'Open →'}</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
