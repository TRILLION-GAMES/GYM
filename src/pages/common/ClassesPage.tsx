import React, { useState } from 'react';
import { Clock, Users, MapPin, Plus, Check } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const ClassesPage: React.FC = () => {
  const { classes, addClass, toggleBookClass } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // New Class Form
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('Rahul Sharma');
  const [time, setTime] = useState('07:00 AM');
  const [durationMins, setDurationMins] = useState('45');
  const [room, setRoom] = useState('Studio A - Main Deck');
  const [capacity, setCapacity] = useState('20');
  const [difficulty, setDifficulty] = useState<'All Levels' | 'Intermediate' | 'High Intensity'>('All Levels');

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addClass({
      title,
      instructor,
      time,
      durationMins: Number(durationMins),
      room,
      capacity: Number(capacity),
      difficulty
    });

    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Group Fitness Classes"
        subtitle="Reserve spots in daily HIIT, CrossFit, Yoga, and Spin sessions"
        actionText="+ Add Class"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowAddModal(true)}
      />

      {classes.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Users size={28} />
          </div>
          <h3 className="empty-state-title">No Group Classes Scheduled</h3>
          <p className="empty-state-desc">
            Create scheduled group classes like HIIT, Power Yoga, Spin Bootcamp, and CrossFit to let members book slots.
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Create First Class</span>
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {classes.map(c => (
            <div
              key={c.id}
              className={`glass-panel ${c.isBookedByUser ? 'glow-hover' : ''}`}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: c.isBookedByUser ? '1.5px solid var(--primary)' : '1px solid var(--border-glass)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-purple">{c.difficulty}</span>
                  {c.isBookedByUser && <span className="badge badge-green">Booked ✓</span>}
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '12px', color: 'var(--text-main)' }}>{c.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Instructor: <strong>{c.instructor}</strong>
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="var(--primary)" />
                    <span>{c.time} ({c.durationMins} mins)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={15} color="var(--text-dim)" />
                    <span>{c.room}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} color="var(--primary)" />
                    <span>{c.bookedCount} / {c.capacity} slots filled</span>
                  </div>
                </div>

                <div className="progress-track-bg" style={{ height: '6px' }}>
                  <div
                    className="progress-fill-bar"
                    style={{
                      width: `${Math.min(100, (c.bookedCount / c.capacity) * 100)}%`,
                      background: c.bookedCount >= c.capacity ? '#ef4444' : undefined
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => toggleBookClass(c.id)}
                className={c.isBookedByUser ? 'btn-secondary touch-target' : 'btn-primary touch-target'}
                style={{ width: '100%', justifyContent: 'center', marginTop: '18px' }}
              >
                {c.isBookedByUser ? 'Cancel Reservation' : 'Reserve Spot'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Class Modal */}
      {showAddModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-main)' }}>Schedule New Class</h3>
            <form onSubmit={handleAddClass} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Class Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. HIIT Power Sprint"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Instructor
                  </label>
                  <select value={instructor} onChange={e => setInstructor(e.target.value)} style={{ width: '100%' }}>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Kavita Joshi">Kavita Joshi</option>
                    <option value="Priya Nair">Priya Nair</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Difficulty
                  </label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value as any)} style={{ width: '100%' }}>
                    <option value="All Levels">All Levels</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="High Intensity">High Intensity</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={time}
                    placeholder="07:00 AM"
                    onChange={e => setTime(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Duration (mins)
                  </label>
                  <input
                    type="number"
                    value={durationMins}
                    onChange={e => setDurationMins(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Studio / Room
                  </label>
                  <input
                    type="text"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Publish Class</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

