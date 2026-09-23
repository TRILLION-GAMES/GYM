import React, { useState } from 'react';
import { TrendingDown, Plus, Check, Calendar, Scale } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { PROGRESS_HISTORY } from '../../services/mockData';
import type { ProgressMetric } from '../../types';

export const ProgressPage: React.FC = () => {
  const [metrics, setMetrics] = useState<ProgressMetric[]>(PROGRESS_HISTORY);
  const [showLogModal, setShowLogModal] = useState(false);

  const [newWeight, setNewWeight] = useState('72.0');
  const [newBodyFat, setNewBodyFat] = useState('18.0');
  const [newChest, setNewChest] = useState('100');
  const [newWaist, setNewWaist] = useState('80');

  const hasMetrics = metrics.length > 0;
  const latest = hasMetrics ? metrics[metrics.length - 1] : null;
  const initial = hasMetrics ? metrics[0] : null;
  const totalChange = latest && initial ? (initial.weightKg - latest.weightKg).toFixed(1) : '0.0';

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: ProgressMetric = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weightKg: Number(newWeight),
      bodyFatPercentage: Number(newBodyFat),
      chestCm: Number(newChest),
      waistCm: Number(newWaist)
    };
    setMetrics(prev => [...prev, newEntry]);
    setShowLogModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Body Progress & Metrics"
        subtitle="Track weight changes, body fat percentage, and muscle measurements"
        actionText="+ Log Weight"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowLogModal(true)}
      />

      {/* Hero Metric Banner */}
      <div className="widgets-grid-main">
        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              CURRENT WEIGHT
            </span>
            <div className="kpi-number" style={{ color: 'var(--primary)' }}>
              {latest ? `${latest.weightKg} kg` : '-- kg'}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
              <TrendingDown size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {latest ? `${totalChange} kg tracked` : 'No logs recorded'}
            </span>
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              TARGET GOAL
            </span>
            <div className="kpi-number">70.0 kg</div>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
              {latest ? `${Math.abs(latest.weightKg - 70.0).toFixed(1)} kg remaining to target` : 'Set your fitness target'}
            </span>
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              BODY FAT %
            </span>
            <div className="kpi-number" style={{ color: 'var(--primary)' }}>
              {latest ? `${latest.bodyFatPercentage}%` : '-- %'}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
              {latest ? 'Current estimated fat ratio' : 'Awaiting baseline log'}
            </span>
          </div>
        </div>
      </div>

      {!hasMetrics ? (
        <div className="empty-state-card" style={{ marginTop: '24px' }}>
          <div className="empty-state-icon">
            <Scale size={28} />
          </div>
          <h3 className="empty-state-title">No Progress Logs Yet</h3>
          <p className="empty-state-desc">
            Start logging your body weight and circumference measurements to track physical transformations over time.
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowLogModal(true)}
          >
            <Plus size={16} />
            <span>Log Baseline Weight</span>
          </button>
        </div>
      ) : (
        <>
          {/* Target Progress Bar */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Transformation Milestone</h3>
              <span className="badge badge-green">Active Progress</span>
            </div>
            <div className="progress-track-bg" style={{ height: '12px' }}>
              <div className="progress-fill-bar" style={{ width: '60%' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
              <span>Baseline: {initial?.weightKg} kg</span>
              <span>Current: {latest?.weightKg} kg</span>
              <span>Target: 70.0 kg</span>
            </div>
          </div>

          {/* Measurements Comparison */}
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Circumference Measurements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#121212', border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Chest Size</div>
                <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--text-main)' }}>{latest?.chestCm || '--'} cm</div>
                <div style={{ fontSize: '11px', color: 'var(--primary)' }}>Upper torso gauge</div>
              </div>
              <div style={{ background: '#121212', border: '1px solid var(--border-color)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Waistline</div>
                <div style={{ fontSize: '24px', fontWeight: 800, marginTop: '4px', color: 'var(--text-main)' }}>{latest?.waistCm || '--'} cm</div>
                <div style={{ fontSize: '11px', color: 'var(--primary)' }}>Core measurement</div>
              </div>
            </div>
          </div>

          {/* Measurement History Log */}
          <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Timeline Entries</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: '#141414',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)'
                    }}
                  >
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{m.date}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Fat: {m.bodyFatPercentage}% · Chest: {m.chestCm}cm · Waist: {m.waistCm}cm
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)' }}>
                  {m.weightKg} kg
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Log Modal */}
      {showLogModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowLogModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-main)' }}>Log New Check-in</h3>
            <form onSubmit={handleAddMetric} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Weight (KG)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={e => setNewWeight(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Body Fat (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newBodyFat}
                  onChange={e => setNewBodyFat(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Chest (cm)
                  </label>
                  <input
                    type="number"
                    value={newChest}
                    onChange={e => setNewChest(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Waist (cm)
                  </label>
                  <input
                    type="number"
                    value={newWaist}
                    onChange={e => setNewWaist(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save Entry</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

