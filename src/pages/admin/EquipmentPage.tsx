import React, { useState } from 'react';
import { Wrench, CheckCircle2, AlertTriangle, MapPin, Plus, Check } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';
import type { EquipmentRecord } from '../../types';

export const EquipmentPage: React.FC = () => {
  const { equipment, addEquipment, updateEquipmentStatus } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // New equipment form
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Strength / Weight Training');
  const [count, setCount] = useState('1');
  const [location, setLocation] = useState('Zone 1 - Main Floor');
  const [status, setStatus] = useState<EquipmentRecord['status']>('Good');

  const totalCount = equipment.reduce((acc, curr) => acc + curr.count, 0);
  const maintenanceCount = equipment.filter(e => e.status !== 'Good').length;
  const operationalRate = equipment.length > 0 
    ? Math.round(((equipment.length - maintenanceCount) / equipment.length) * 100) 
    : 100;

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addEquipment({
      name,
      category,
      count: Number(count),
      location,
      status
    });

    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Gym Equipment & Maintenance"
        subtitle="Track machinery condition, safety certifications, and service schedules"
        actionText="+ Add Equipment"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowAddModal(true)}
      />

      {/* KPI Cards */}
      <div className="widgets-grid-main">
        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              TOTAL ASSETS
            </span>
            <div className="kpi-number">{totalCount} Units</div>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
              {equipment.length} unique machines logged
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#121212', border: '1px solid var(--border-color)', color: 'var(--primary)' }}>
            <Wrench size={24} />
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              SERVICE REQUIRED
            </span>
            <div className="kpi-number" style={{ color: maintenanceCount > 0 ? '#fb923c' : 'var(--primary)' }}>
              {maintenanceCount} Items
            </div>
            <span style={{ fontSize: '12px', color: maintenanceCount > 0 ? '#fb923c' : 'var(--primary)' }}>
              {maintenanceCount > 0 ? 'Technician dispatch pending' : 'All equipment certified'}
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#121212', border: '1px solid var(--border-color)', color: maintenanceCount > 0 ? '#fb923c' : 'var(--primary)' }}>
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              OPERATIONAL RATE
            </span>
            <div className="kpi-number" style={{ color: 'var(--primary)' }}>
              {operationalRate}%
            </div>
            <span style={{ fontSize: '12px', color: 'var(--primary)' }}>High safety standard</span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: '#121212', border: '1px solid var(--border-color)', color: 'var(--primary)' }}>
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Equipment List */}
      <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Machine Inventory Log</h3>
      {equipment.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Wrench size={28} />
          </div>
          <h3 className="empty-state-title">No Equipment Registered Yet</h3>
          <p className="empty-state-desc">
            Catalog your cardio treadmills, Olympic barbell sets, dumbbell racks, and cable crossover machines to log inspections and maintenance schedules.
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add First Machine</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {equipment.map(item => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</h4>
                  <span className="badge badge-purple">{item.category}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>
                    ({item.count} Units)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="var(--primary)" />
                    <span>{item.location}</span>
                  </div>
                  <span>Last Inspected: {item.lastService}</span>
                  <span>Next Service: {item.nextService}</span>
                </div>
              </div>

              {/* Status Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <select
                  value={item.status}
                  onChange={e => updateEquipmentStatus(item.id, e.target.value as EquipmentRecord['status'])}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontSize: '12px',
                    background: item.status === 'Good' ? '#0d2818' : '#1a1a1a',
                    color:
                      item.status === 'Good'
                        ? 'var(--primary-light)'
                        : item.status === 'Needs Service'
                        ? '#fb923c'
                        : '#f87171',
                    border: '1px solid currentColor'
                  }}
                >
                  <option value="Good">Good Condition</option>
                  <option value="Needs Service">Needs Service</option>
                  <option value="Broken">Out of Order / Broken</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Equipment Modal */}
      {showAddModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-main)' }}>Register Equipment</h3>
            <form onSubmit={handleAddEquipment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Equipment / Machine Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. LifeFitness Treadmill Pro 9"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%' }}>
                    <option value="Strength / Weight Training">Strength</option>
                    <option value="Cardio Machinery">Cardio</option>
                    <option value="Free Weights & Benches">Free Weights</option>
                    <option value="Functional / CrossFit">CrossFit</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Quantity Units
                  </label>
                  <input
                    type="number"
                    value={count}
                    onChange={e => setCount(e.target.value)}
                    style={{ width: '100%' }}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Location / Zone
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Initial Status
                  </label>
                  <select value={status} onChange={e => setStatus(e.target.value as any)} style={{ width: '100%' }}>
                    <option value="Good">Good</option>
                    <option value="Needs Service">Needs Service</option>
                    <option value="Broken">Broken</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save Equipment</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

