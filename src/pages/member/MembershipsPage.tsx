import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const MembershipsPage: React.FC = () => {
  const { currentUser } = useApp();

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Fitness',
      price: '₹2,999',
      period: 'per month',
      features: ['Access to main gym floor', 'Locker & shower access', '1 Fitness assessment', 'Standard cardio equipment'],
      recommended: false,
      tier: 'Standard'
    },
    {
      id: 'quarterly',
      name: 'Quarterly Pro',
      price: '₹7,499',
      period: 'per 3 months',
      features: ['All Monthly benefits', '2 Group classes per week', 'Personal diet guideline', 'Body composition analysis'],
      recommended: false,
      tier: 'Pro'
    },
    {
      id: 'annual',
      name: 'Premium Annual VIP',
      price: '₹24,999',
      period: 'per year',
      features: ['Full gym & steam bath access', 'Unlimited Group Classes', 'Dedicated Personal Trainer', 'Custom Nutrition Plan & App Sync', 'Free Gym Kit & Shaker Bottle'],
      recommended: true,
      tier: 'VIP'
    }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Membership Plans & Validity"
        subtitle="Current plan details, renewal cycles, and tier upgrades"
      />

      {/* Current Active Plan Status */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', background: '#0d2818', border: '1px solid var(--primary-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-green">Your Active Subscription</span>
            <h2 style={{ fontSize: '26px', marginTop: '6px' }}>{currentUser.membershipPlan || 'Premium Annual VIP'}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              Joined on {currentUser.joinDate || '15 Oct 2025'} · Assigned Coach: {currentUser.assignedTrainer || 'Rahul Sharma'}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>
              {currentUser.membershipDaysLeft || 23} Days Left
            </span>
            <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Renewal Date: 15 Oct 2026</div>
          </div>
        </div>

        <div className="progress-track-bg" style={{ height: '10px', margin: '16px 0 8px' }}>
          <div className="progress-fill-bar" style={{ width: `${currentUser.membershipProgress || 78}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Billing cycle elapsed</span>
          <span>{currentUser.membershipProgress || 78}% completed</span>
        </div>
      </div>

      {/* Plan Tiers Selection */}
      <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Available Membership Tiers</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}
      >
        {plans.map(p => (
          <div
            key={p.id}
            className={`glass-panel ${p.recommended ? 'glow-hover' : ''}`}
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              border: p.recommended ? '2px solid var(--primary)' : '1px solid var(--border-glass)',
              position: 'relative'
            }}
          >
            {p.recommended && (
              <span
                className="badge badge-green"
                style={{ position: 'absolute', top: '-12px', right: '16px' }}
              >
                Recommended
              </span>
            )}

            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>
                {p.tier}
              </span>
              <h4 style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px' }}>{p.name}</h4>

              <div style={{ margin: '16px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>
                  {p.price}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '4px' }}>{p.period}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
                {p.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <Check size={16} color="var(--primary)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert(`Selected ${p.name}. Proceed to Payment collection gateway.`)}
              className={p.recommended ? 'btn-primary touch-target' : 'btn-secondary touch-target'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{p.recommended ? 'Renew / Upgrade' : 'Choose Plan'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
