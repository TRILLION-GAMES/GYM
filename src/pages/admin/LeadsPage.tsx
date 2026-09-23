import React, { useState } from 'react';
import { Plus, Phone, Check, X, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';
import type { LeadRecord } from '../../types';

export const LeadsPage: React.FC = () => {
  const { leads, addLead, updateLeadStage } = useApp();
  const [showModal, setShowModal] = useState(false);

  // New lead form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Weight Loss & Personal Training');
  const [source, setSource] = useState('Instagram Ad');
  const [assignedTo, setAssignedTo] = useState('Rahul');

  const stages: LeadRecord['stage'][] = ['New', 'Contacted', 'Trial Booked', 'Converted'];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addLead({
      name,
      phone,
      interest,
      source,
      stage: 'New',
      assignedTo
    });

    setName('');
    setPhone('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Leads & CRM Pipeline"
        subtitle="Manage member enquiries, trial workout bookings, and conversion stages"
        actionText="+ New Lead"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowModal(true)}
      />

      {leads.length === 0 ? (
        <div className="empty-state-card" style={{ marginBottom: '24px' }}>
          <div className="empty-state-icon">
            <Plus size={28} />
          </div>
          <h3 className="empty-state-title">No Leads in Pipeline</h3>
          <p className="empty-state-desc">
            Capture new prospective member inquiries, gym tour walk-ins, and free trial bookings into your conversion CRM pipeline.
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            <span>Create First Lead</span>
          </button>
        </div>
      ) : null}

      {/* Kanban Pipeline Board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          alignItems: 'start'
        }}
      >
        {stages.map(stage => {
          const stageLeads = leads.filter(l => l.stage === stage);

          return (
            <div
              key={stage}
              className="glass-panel"
              style={{
                padding: '16px',
                background: '#0d0d0d',
                border: '1px solid var(--border-color)',
                minHeight: '380px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>{stage}</h4>
                <span className="badge badge-green">{stageLeads.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stageLeads.length === 0 ? (
                  <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '12px', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    No prospects in this stage
                  </div>
                ) : (
                  stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="glass-panel glow-hover"
                      style={{
                        padding: '14px',
                        background: '#121212',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h5 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>{lead.name}</h5>
                        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{lead.source}</span>
                      </div>

                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '8px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Phone size={12} color="var(--primary)" />
                          <span>{lead.phone}</span>
                        </div>
                        <div style={{ marginTop: '4px', color: 'var(--text-muted)', fontSize: '12px' }}>
                          Interest: <span style={{ color: 'var(--text-main)' }}>{lead.interest}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          borderTop: '1px solid var(--border-glass)',
                          paddingTop: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Rep: {lead.assignedTo}</span>

                        {/* Advance Stage Control */}
                        {stage !== 'Converted' && (
                          <button
                            onClick={() => {
                              const nextStageIndex = stages.indexOf(stage) + 1;
                              updateLeadStage(lead.id, stages[nextStageIndex]);
                            }}
                            className="btn-ghost"
                            style={{ padding: '2px 6px', fontSize: '11px', color: 'var(--primary)' }}
                          >
                            <span>Advance</span>
                            <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Lead */}
      {showModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px' }}>Add Prospective Member Lead</h3>
              <button onClick={() => setShowModal(false)} className="btn-ghost touch-target">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Prospect Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Divya Roy"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91 98111 22334"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Goal / Fitness Interest
                </label>
                <input
                  type="text"
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Source
                  </label>
                  <select value={source} onChange={e => setSource(e.target.value)} style={{ width: '100%' }}>
                    <option value="Instagram Ad">Instagram Ad</option>
                    <option value="Walk-In">Walk-In</option>
                    <option value="Google Maps">Google Maps</option>
                    <option value="Member Referral">Member Referral</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Assign Rep
                  </label>
                  <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)} style={{ width: '100%' }}>
                    <option value="Rahul">Rahul</option>
                    <option value="Priya">Priya</option>
                    <option value="Vikram">Vikram</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save Lead Record</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
