import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, Shield, X, Check } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const MembersPage: React.FC = () => {
  const { members, addMember } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New member form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('Premium Annual VIP');
  const [trainer, setTrainer] = useState('Rahul Sharma');

  const filteredMembers = members.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);
    const matchesFilter = filterStatus === 'All' || m.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addMember({
      name,
      email,
      phone,
      plan,
      trainer,
      status: 'Active',
      daysLeft: 365,
      attendanceRate: 100,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });

    setName('');
    setEmail('');
    setPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Member Management"
        subtitle="Manage member profiles, membership validity, and assigned coaches"
        actionText="+ Add Member"
        actionIcon={<UserPlus size={16} />}
        onAction={() => setShowAddModal(true)}
      />

      {/* Filter and Search Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)'
            }}
          />
          <input
            type="text"
            placeholder="Search by name, email or mobile..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px' }}
          />
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Active', 'Expiring', 'Inactive'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`btn-secondary touch-target ${filterStatus === st ? 'badge-green' : ''}`}
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Member Directory Cards Grid */}
      {filteredMembers.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <UserPlus size={28} />
          </div>
          <h3 className="empty-state-title">
            {members.length === 0 ? 'No Members Enrolled Yet' : 'No Members Match Filter'}
          </h3>
          <p className="empty-state-desc">
            {members.length === 0
              ? 'Start building your gym community by enrolling new members into active training programs and subscription tiers.'
              : 'Try changing your search query or switching the status filter tab.'}
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowAddModal(true)}
          >
            <UserPlus size={16} />
            <span>Enroll New Member</span>
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px'
          }}
        >
          {filteredMembers.map(m => (
            <div key={m.id} className="glass-panel glow-hover" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={m.avatar}
                    alt={m.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{m.name}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{m.plan}</span>
                  </div>
                </div>

                <span
                  className={`badge ${
                    m.status === 'Active' ? 'badge-green' : m.status === 'Expiring' ? 'badge-orange' : 'badge-purple'
                  }`}
                >
                  {m.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="var(--text-dim)" />
                  <span>{m.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="var(--text-dim)" />
                  <span>{m.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={14} color="var(--text-dim)" />
                  <span>Coach: {m.trainer}</span>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-glass)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px'
                }}
              >
                <span style={{ color: 'var(--text-dim)' }}>Last visit: {m.lastVisit || 'Not yet visited'}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  {m.daysLeft > 0 ? `${m.daysLeft} days left` : 'Expired'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '460px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px' }}>Enroll New Member</h3>
              <button onClick={() => setShowAddModal(false)} className="btn-ghost touch-target">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohith Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="rohith@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Mobile Phone (+91)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Membership Plan
                  </label>
                  <select value={plan} onChange={e => setPlan(e.target.value)} style={{ width: '100%' }}>
                    <option value="Premium Annual VIP">Premium Annual VIP</option>
                    <option value="Annual Elite">Annual Elite</option>
                    <option value="Quarterly Pro">Quarterly Pro</option>
                    <option value="Monthly Fitness">Monthly Fitness</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Assigned Coach
                  </label>
                  <select value={trainer} onChange={e => setTrainer(e.target.value)} style={{ width: '100%' }}>
                    <option value="Rahul Sharma">Rahul Sharma</option>
                    <option value="Kavita Joshi">Kavita Joshi</option>
                    <option value="Priya Nair">Priya Nair</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '12px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save Member Profile</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
