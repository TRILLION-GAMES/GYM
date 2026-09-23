import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  ArrowRight,
  Plus,
  CalendarCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HomeModuleGrid } from '../common/HomeModuleGrid';

export const TrainerDashboard: React.FC = () => {
  const { currentUser, sessions, members } = useApp();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* 1. Trainer Header (Requirement 16) */}
      <div className="dashboard-greeting-hero">
        <div className="greeting-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-green">Trainer Portal</span>
          </div>
          <h1>Good Morning, {currentUser.name} 👋</h1>
          <p>You have <strong>{sessions.length} personal coaching sessions</strong> scheduled.</p>
        </div>

        <button
          onClick={() => navigate('/sessions')}
          className="btn-primary touch-target"
        >
          <Plus size={16} />
          <span>Add Session</span>
        </button>
      </div>

      {/* 2. Trainer Priority Widgets */}
      <div className="widgets-grid-main">
        {/* TRAINER MEMBER CARD (Requirement 18) */}
        <div className="col-4 glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>
                ASSIGNED CLIENTS
              </span>
              <span className="badge badge-green">{members.length} Members</span>
            </div>

            <div style={{ margin: '16px 0 12px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                {members.length} <span style={{ fontSize: '14px', color: 'var(--text-dim)', fontWeight: 500 }}>Total</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <CalendarCheck size={15} color="var(--primary)" />
                <span>Routines & progress tracking active</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/members')}
            className="btn-ghost"
            style={{ marginTop: '18px', paddingLeft: 0, justifyContent: 'space-between', width: '100%', color: 'var(--primary)' }}
          >
            <span>View Client Directory</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* TODAY'S SESSIONS TIMELINE (Requirement 16) */}
        <div className="col-8 glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Coaching Appointments</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scheduled sessions on gym floor</p>
            </div>
            <span className="badge badge-green">{sessions.length} Scheduled</span>
          </div>

          {sessions.length === 0 ? (
            <div className="empty-state-card" style={{ padding: '28px 16px' }}>
              <Clock size={28} color="var(--primary)" />
              <h4>No sessions scheduled for today</h4>
              <p>Add a 1-on-1 personal coaching session for your gym members.</p>
              <button onClick={() => navigate('/sessions')} className="btn-primary touch-target" style={{ padding: '8px 16px' }}>
                <Plus size={16} />
                <span>Schedule Session</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sessions.slice(0, 4).map(session => (
                <div
                  key={session.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: session.status === 'in_progress' ? '#0d2818' : '#161616',
                    border: session.status === 'in_progress' ? '1px solid var(--primary-border)' : '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontFamily: 'monospace',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: session.status === 'in_progress' ? 'var(--primary)' : 'var(--text-muted)'
                      }}
                    >
                      <Clock size={14} />
                      {session.time}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{session.clientName}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{session.activity}</div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => navigate('/sessions')}
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sessions.length > 0 && (
            <button
              onClick={() => navigate('/sessions')}
              className="btn-ghost"
              style={{ marginTop: '14px', paddingLeft: 0, justifyContent: 'space-between', width: '100%', color: 'var(--primary)' }}
            >
              <span>View All Sessions</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 3. Trainer Module Cards (Requirement 17 & 23) */}
      <HomeModuleGrid
        title="Trainer Operations"
        subtitle="Manage member training routines, assessments & calendar"
      />
    </div>
  );
};
