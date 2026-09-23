import React from 'react';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';
import { PageHeader } from '../../components/common';

export const ReportsPage: React.FC = () => {
  const peakHours = [
    { time: '06:00 - 08:00 AM', count: 94, pct: 90 },
    { time: '08:00 - 10:00 AM', count: 62, pct: 60 },
    { time: '12:00 - 02:00 PM', count: 28, pct: 30 },
    { time: '04:00 - 06:00 PM', count: 55, pct: 55 },
    { time: '06:00 - 08:30 PM', count: 105, pct: 100 },
    { time: '08:30 - 10:00 PM', count: 40, pct: 40 }
  ];

  const monthlyRevenue = [
    { month: 'Apr', rev: '₹3.80L' },
    { month: 'May', rev: '₹4.10L' },
    { month: 'Jun', rev: '₹4.25L' },
    { month: 'Jul', rev: '₹4.40L' },
    { month: 'Aug', rev: '₹4.60L' },
    { month: 'Sep', rev: '₹4.82L' }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Business Intelligence & Reports"
        subtitle="Revenue growth, retention metrics, and gym capacity utilization"
      />

      {/* KPI Overview */}
      <div className="widgets-grid-main">
        <div className="col-3 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>RETENTION RATE</span>
            <div className="kpi-number" style={{ color: 'var(--primary)' }}>88.4%</div>
            <span style={{ fontSize: '12px', color: 'var(--primary)' }}>+2.1% this quarter</span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--primary)' }}>
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="col-3 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>AVG LIFETIME VALUE</span>
            <div className="kpi-number">₹18,400</div>
            <span style={{ fontSize: '12px', color: '#38bdf8' }}>Per active member</span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Award size={22} />
          </div>
        </div>

        <div className="col-3 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>LEAD CONVERSION</span>
            <div className="kpi-number" style={{ color: '#fb923c' }}>41.8%</div>
            <span style={{ fontSize: '12px', color: '#fb923c' }}>Trials converted</span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="col-3 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>TRAINER OCCUPANCY</span>
            <div className="kpi-number">91.2%</div>
            <span style={{ fontSize: '12px', color: 'var(--primary)' }}>High slot efficiency</span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Revenue Trajectory Chart Representation */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>6-Month Revenue Trajectory (INR)</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Steady month-over-month growth of subscriptions</p>
          </div>
          <span className="badge badge-green">+26.8% H1 Growth</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px', alignItems: 'flex-end', height: '180px', paddingTop: '20px' }}>
          {monthlyRevenue.map((m, idx) => {
            const heightPct = 50 + idx * 10;
            return (
              <div key={m.month} style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, marginBottom: '6px' }}>
                  {m.rev}
                </span>
                <div
                  style={{
                    height: `${heightPct}%`,
                    background: idx === monthlyRevenue.length - 1
                      ? 'var(--primary)'
                      : '#1e1e1e',
                    borderRadius: '6px 6px 0 0'
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '8px', fontWeight: 600 }}>
                  {m.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Peak Gym Floor Hours */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Floor Attendance Peak Times</h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Live turnstile density to optimize equipment availability and trainer shift schedules
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {peakHours.map(p => (
            <div key={p.time}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>{p.time}</span>
                <span style={{ color: p.pct > 80 ? '#f87171' : 'var(--primary)', fontWeight: 700 }}>
                  {p.count} Active Members ({p.pct > 80 ? 'Peak' : 'Normal'})
                </span>
              </div>
              <div className="progress-track-bg" style={{ margin: 0, height: '8px' }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: 'var(--radius-pill)',
                    width: `${p.pct}%`,
                    background: p.pct > 80 ? '#ef4444' : 'var(--primary)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
