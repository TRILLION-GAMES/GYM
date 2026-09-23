import React, { useState } from 'react';
import { Receipt, Plus, AlertTriangle, Clock, X, Check } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const PaymentsPage: React.FC = () => {
  const { payments, recordPayment } = useApp();
  const [showModal, setShowModal] = useState(false);

  // New payment record form
  const [memberName, setMemberName] = useState('');
  const [amount, setAmount] = useState('7500');
  const [method, setMethod] = useState('UPI / GPay');
  const [plan] = useState('Quarterly Pro');
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Paid');

  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = payments
    .filter(p => p.status !== 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleRecordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    recordPayment({
      memberName,
      memberId: `usr_${Date.now()}`,
      amount: Number(amount),
      paymentMethod: method,
      plan,
      status
    });

    setMemberName('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Billing & Payments"
        subtitle="Manage membership fees, invoices, UPI transactions, and overdue dues"
        actionText="+ Record Payment"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowModal(true)}
      />

      {/* Financial KPIs */}
      <div className="widgets-grid-main">
        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              TOTAL COLLECTED
            </span>
            <div className="kpi-number" style={{ color: 'var(--primary)' }}>
              ₹{(totalRevenue / 100000).toFixed(2)}L
            </div>
            <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
              +14% vs previous month
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(34, 197, 94, 0.15)', color: 'var(--primary)' }}>
            <Receipt size={24} />
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              PENDING & OVERDUE
            </span>
            <div className="kpi-number" style={{ color: 'var(--accent-orange)' }}>
              ₹{totalPending.toLocaleString()}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--accent-orange)', fontWeight: 600 }}>
              Renewal notices sent
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(249, 115, 22, 0.15)', color: 'var(--accent-orange)' }}>
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="col-4 kpi-card">
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
              TRANSACTIONS
            </span>
            <div className="kpi-number">{payments.length} Invoices</div>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
              100% digital audit trace
            </span>
          </div>
          <div className="brand-icon-wrapper" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Transaction History</h3>
      {payments.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-state-icon">
            <Receipt size={28} />
          </div>
          <h3 className="empty-state-title">No Transactions Recorded Yet</h3>
          <p className="empty-state-desc">
            Record your first member subscription payment, class enrollment fee, or personal training package to start tracking real-time gym cashflow.
          </p>
          <button
            className="btn-primary touch-target"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            <span>Record First Payment</span>
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ overflowX: 'auto', padding: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-dim)', fontSize: '12px' }}>
                <th style={{ padding: '12px' }}>INVOICE ID</th>
                <th style={{ padding: '12px' }}>MEMBER</th>
                <th style={{ padding: '12px' }}>PLAN</th>
                <th style={{ padding: '12px' }}>DATE</th>
                <th style={{ padding: '12px' }}>METHOD</th>
                <th style={{ padding: '12px' }}>AMOUNT</th>
                <th style={{ padding: '12px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '13px' }}>
                  <td style={{ padding: '14px 12px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                    {inv.id}
                  </td>
                  <td style={{ padding: '14px 12px', fontWeight: 700 }}>{inv.memberName}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{inv.plan}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-dim)' }}>{inv.date}</td>
                  <td style={{ padding: '14px 12px' }}>{inv.paymentMethod}</td>
                  <td style={{ padding: '14px 12px', fontWeight: 700, color: 'var(--text-main)' }}>
                    ₹{inv.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span
                      className={`badge ${
                        inv.status === 'Paid' ? 'badge-green' : inv.status === 'Pending' ? 'badge-orange' : 'badge-purple'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Record Payment Modal */}
      {showModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowModal(false)} />
          <div className="bottom-sheet" style={{ maxWidth: '440px', margin: '0 auto', left: 0, right: 0 }}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h3 style={{ fontSize: '18px' }}>Record Payment / Fee</h3>
              <button onClick={() => setShowModal(false)} className="btn-ghost touch-target">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Member Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anujith or Arun Kumar"
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Amount (₹ INR)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Payment Mode
                  </label>
                  <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%' }}>
                    <option value="UPI / GPay">UPI / GPay</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Cash at Desk">Cash at Desk</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select value={status} onChange={e => setStatus(e.target.value as any)} style={{ width: '100%' }}>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary touch-target" style={{ marginTop: '10px', justifyContent: 'center' }}>
                <Check size={18} />
                <span>Save Payment Record</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
