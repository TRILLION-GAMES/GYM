import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  CalendarCheck2,
  Receipt,
  AlertTriangle,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HomeModuleGrid } from '../common/HomeModuleGrid';

export const AdminDashboard: React.FC = () => {
  const { currentUser, members, attendance, payments } = useApp();
  const navigate = useNavigate();

  const totalCollected = payments
    .filter(p => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = payments
    .filter(p => p.status !== 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="animate-fade-in">
      {/* 1. Admin Header (Requirement 19) */}
      <div className="dashboard-greeting-hero">
        <div className="greeting-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-green">Gym Management SaaS</span>
          </div>
          <h1>Good Morning, {currentUser.name} 👋</h1>
          <p>Real-time metrics and administration controls for FitZone.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/members')}
            className="btn-primary touch-target"
          >
            <UserPlus size={16} />
            <span>+ Add Member</span>
          </button>
          <button
            onClick={() => navigate('/payments')}
            className="btn-secondary touch-target"
          >
            <Receipt size={16} />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* 2. Top Executive KPI Cards (Requirement 20) */}
      <div className="widgets-grid-main">
        {/* KPI 1: Members */}
        <div className="col-3 kpi-card glow-hover" onClick={() => navigate('/members')} style={{ cursor: 'pointer' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Members
            </span>
            <div className="kpi-number">{members.length}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
              <TrendingUp size={13} /> Active Profiles
            </div>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#0d2818', color: 'var(--primary)', border: '1px solid var(--primary-border)' }}>
            <Users size={20} />
          </div>
        </div>

        {/* KPI 2: Attendance */}
        <div className="col-3 kpi-card glow-hover" onClick={() => navigate('/attendance')} style={{ cursor: 'pointer' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Attendance Logs
            </span>
            <div className="kpi-number">{attendance.length}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--primary-light)', fontWeight: 600 }}>
              <TrendingUp size={13} /> Recorded Check-ins
            </div>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#0d2818', color: 'var(--primary)', border: '1px solid var(--primary-border)' }}>
            <CalendarCheck2 size={20} />
          </div>
        </div>

        {/* KPI 3: Revenue */}
        <div className="col-3 kpi-card glow-hover" onClick={() => navigate('/payments')} style={{ cursor: 'pointer' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Collected
            </span>
            <div className="kpi-number" style={{ color: 'var(--primary)' }}>
              ₹{totalCollected.toLocaleString()}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
              <TrendingUp size={13} /> Paid Invoices
            </div>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#0d2818', color: 'var(--primary)', border: '1px solid var(--primary-border)' }}>
            <Receipt size={20} />
          </div>
        </div>

        {/* KPI 4: Pending Dues */}
        <div className="col-3 kpi-card glow-hover" onClick={() => navigate('/payments')} style={{ cursor: 'pointer' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Pending Dues
            </span>
            <div className="kpi-number" style={{ color: totalPending > 0 ? '#ef4444' : 'var(--text-muted)' }}>
              ₹{totalPending.toLocaleString()}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              <AlertTriangle size={13} /> Invoices Due
            </div>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#1c1c1c', color: '#ffffff', border: '1px solid #333333' }}>
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Admin Home Module Grid (Requirement 21) */}
      <HomeModuleGrid
        title="Gym Management Modules"
        subtitle="Every module available in the sidebar is accessible below as a quick-access card"
      />
    </div>
  );
};
