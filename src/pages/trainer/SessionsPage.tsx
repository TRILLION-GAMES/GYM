import React, { useState } from 'react';
import { CheckCircle2, Play, Plus, X, Calendar } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const SessionsPage: React.FC = () => {
  const { sessions, addSession, updateSessionStatus } = useApp();
  const [showModal, setShowModal] = useState(false);

  // New session form
  const [clientName, setClientName] = useState('');
  const [time, setTime] = useState('02:00 PM');
  const [activity, setActivity] = useState('Core & Conditioning');

  const handleStartSession = (id: string) => {
    updateSessionStatus(id, 'in_progress');
  };

  const handleCompleteSession = (id: string) => {
    updateSessionStatus(id, 'completed');
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    addSession({
      time,
      clientName,
      clientId: `usr_${Date.now()}`,
      trainerName: 'Rahul Sharma',
      trainerId: 'usr_002',
      activity,
      status: 'upcoming'
    });

    setClientName('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Personal Training Sessions"
        subtitle="1-on-1 coaching appointments, floor schedules, and client check-ins"
        actionText="+ Schedule Session"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowModal(true)}
      />

      {sessions.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Calendar size={28} />
          </div>
          <h3 className="empty-state-title">No Coaching Sessions Scheduled</h3>
          <p className="empty-state-desc">
            Book 1-on-1 personal training sessions with clients to track their floor appointments, warmup routines, and workout focus.
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            <span>Schedule First Session</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {sessions.map(s => (
            <div
              key={s.id}
              className={`glass-panel ${s.status === 'in_progress' ? 'glow-hover' : ''}`}
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                border: s.status === 'in_progress' ? '1.5px solid var(--primary)' : '1px solid var(--border-glass)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div
                  style={{
                    background: '#141414',
                    border: '1px solid var(--border-color)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    minWidth: '90px'
                  }}
                >
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{s.date}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>
                    {s.time}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 700 }}>{s.clientName}</h4>
                    <span
                      className={`badge ${
                        s.status === 'completed'
                          ? 'badge-green'
                          : s.status === 'in_progress'
                          ? 'badge-orange'
                          : 'badge-purple'
                      }`}
                    >
                      {s.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {s.activity} · Coach: {s.trainerName}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {s.status === 'upcoming' && (
                  <button onClick={() => handleStartSession(s.id)} className="btn-primary touch-target">
                    <Play size={15} fill="currentColor" />
                    <span>Start Session</span>
                  </button>
                )}
                {s.status === 'in_progress' && (
                  <button onClick={() => handleCompleteSession(s.id)} className="btn-primary touch-target">
                    <CheckCircle2 size={16} />
                    <span>Mark Attended</span>
                  </button>
                )}
                {s.status === 'completed' && (
                  <span className="badge badge-green" style={{ padding: '8px 14px' }}>
                    Completed Session ✓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Session Modal */}
      {showModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px' }}>Book 1-on-1 Coaching Session</h3>
              <button onClick={() => setShowModal(false)} className="btn-ghost touch-target">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSession} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Member / Client Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Meera Nair"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Time Slot
                </label>
                <input
                  type="text"
                  placeholder="e.g. 05:30 PM"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Workout Focus / Target
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deadlift Technique & Back Hypertrophy"
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                Save Session Slot
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

