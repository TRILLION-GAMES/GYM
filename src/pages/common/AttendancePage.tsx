import React, { useState } from 'react';
import { CalendarCheck2, Flame, QrCode, CheckCircle2, Clock } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const AttendancePage: React.FC = () => {
  const { attendance, streakDays, hasCheckedInToday, checkInToday } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleSimulateScan = () => {
    checkInToday();
    setShowQrModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Attendance Tracker"
        subtitle="Gym facility check-ins, consistency streaks, and monthly rate"
        actionText={hasCheckedInToday ? 'Checked In Today ✓' : 'Scan QR Check-In'}
        actionIcon={<QrCode size={16} />}
        onAction={() => setShowQrModal(true)}
      />

      {/* Top Attendance Stats */}
      <div className="widgets-grid-main">
        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              RECORDED VISITS
            </span>
            <div className="kpi-number">{attendance.length} Visits</div>
            <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
              Active Member Attendance
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#0d2818', color: 'var(--primary)', border: '1px solid var(--primary-border)' }}>
            <CalendarCheck2 size={22} />
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              CURRENT STREAK
            </span>
            <div className="kpi-number" style={{ color: 'var(--primary-light)' }}>{streakDays} Days</div>
            <span style={{ fontSize: '12px', color: 'var(--primary-light)', fontWeight: 600 }}>
              Consecutive Workouts
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#0d2818', color: 'var(--primary)', border: '1px solid var(--primary-border)' }}>
            <Flame size={22} />
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              TODAY'S STATUS
            </span>
            <div className="kpi-number" style={{ color: hasCheckedInToday ? 'var(--primary)' : 'var(--text-muted)' }}>
              {hasCheckedInToday ? 'Present' : 'Not Checked In'}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {hasCheckedInToday ? 'Verified turnstile entry' : 'Scan front desk QR'}
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#181818', color: '#ffffff', border: '1px solid #333333' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Monthly Attendance Calendar */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Monthly Calendar Check-ins</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active attendance log</p>
          </div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--primary)' }} />
              <span>Visited</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#1a1a1a', border: '1px solid #333' }} />
              <span>Rest</span>
            </div>
          </div>
        </div>

        {/* 7-column calendar grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            textAlign: 'center'
          }}
        >
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, paddingBottom: '6px' }}>
              {day}
            </div>
          ))}

          {daysInMonth.map(day => {
            const hasRecord = attendance.some(a => a.date.endsWith(`-${day.toString().padStart(2, '0')}`));
            const isToday = day === new Date().getDate();

            return (
              <div
                key={day}
                style={{
                  height: '46px',
                  borderRadius: 'var(--radius-sm)',
                  background: hasRecord ? '#0d2818' : '#141414',
                  border: isToday
                    ? '2px solid var(--primary)'
                    : hasRecord
                    ? '1px solid var(--primary-border)'
                    : '1px solid var(--border-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: hasRecord ? 'var(--primary-light)' : 'var(--text-dim)',
                  fontWeight: hasRecord ? 700 : 400
                }}
              >
                <span style={{ fontSize: '13px' }}>{day}</span>
                {hasRecord && <span style={{ fontSize: '9px', textTransform: 'uppercase' }}>Present</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Log History */}
      <h3 style={{ fontSize: '17px', marginBottom: '14px' }}>Recent Check-in Logs</h3>
      {attendance.length === 0 ? (
        <div className="empty-state-card">
          <CalendarCheck2 size={36} color="var(--primary)" />
          <h4>No attendance recorded yet</h4>
          <p>Scan your digital QR code at the gym front desk or turnstile to start logging your attendance streak.</p>
          <button onClick={() => setShowQrModal(true)} className="btn-primary touch-target" style={{ marginTop: '8px' }}>
            <QrCode size={16} />
            <span>Scan QR Gate Pass</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {attendance.map(rec => (
            <div
              key={rec.id}
              className="glass-panel"
              style={{
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#0d2818',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--primary-border)'
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700 }}>{rec.date}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Check-in: {rec.checkInTime}
                  </div>
                </div>
              </div>

              <div>
                <span className="badge badge-green">Present</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Check-In Modal Simulation */}
      {showQrModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowQrModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '400px', margin: '0 auto', left: 0, right: 0, textAlign: 'center' }}>
            <div className="sheet-handle" />
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Gym Entry QR Pass</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Hold your pass against the turnstile scanner
            </p>

            <div
              style={{
                width: '180px',
                height: '180px',
                margin: '0 auto 20px',
                background: '#ffffff',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <QrCode size={150} color="#000000" />
            </div>

            <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: '20px' }}>
              Pass Code: FTZ-{Date.now().toString().slice(-6)}
            </p>

            <button
              onClick={handleSimulateScan}
              className="btn-primary touch-target"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Simulate Gate Scan & Check In
            </button>
          </div>
        </>
      )}
    </div>
  );
};
