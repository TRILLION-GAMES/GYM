import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  showBack?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onAction,
  actionIcon,
  showBack = true
}) => {
  const navigate = useNavigate();

  return (
    <div className="page-header-container">
      <div className="page-header-info">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="back-button touch-target"
            title="Go Back"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div className="page-header-titles">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      {actionText && onAction && (
        <button onClick={onAction} className="btn-primary touch-target">
          {actionIcon}
          <span>{actionText}</span>
        </button>
      )}

      {/* Mobile more button if no primary action */}
      {!actionText && (
        <button className="btn-ghost touch-target mobile-only-icon" aria-label="Page options">
          <MoreVertical size={20} />
        </button>
      )}
    </div>
  );
};
