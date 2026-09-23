import React, { useState } from 'react';
import { Send, CheckCheck } from 'lucide-react';
import { PageHeader } from '../../components/common';
import { useApp } from '../../context/AppContext';

export const MessagesPage: React.FC = () => {
  const { messages, sendMessage, currentUser } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <PageHeader
        title="Trainer & Gym Messages"
        subtitle="Direct communication channel with your assigned coach and gym front desk"
      />

      {/* Chat Container */}
      <div
        className="glass-panel"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--primary)',
                boxShadow: '0 0 8px var(--primary)'
              }}
            />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700 }}>FitZone Coach & Support Desk</h4>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Typical response time: ~5 mins</span>
            </div>
          </div>
          <span className="badge badge-green">Online</span>
        </div>

        {/* Message Feed */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {messages.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', padding: '32px 16px', maxWidth: '360px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#121212',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: 'var(--primary)'
                }}
              >
                <Send size={24} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                Direct Coach & Desk Channel
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Start a direct chat with your assigned personal coach or gym front desk for workout questions and plan assistance.
              </p>
            </div>
          ) : (
            messages.map(msg => {
              const isSelf = msg.isSelf || msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isSelf ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: '10px'
                  }}
                >
                  {!isSelf && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}

                  <div
                    style={{
                      maxWidth: '75%',
                      background: isSelf ? '#0d2818' : '#141414',
                      border: isSelf ? '1px solid var(--primary-border)' : '1px solid var(--border-color)',
                      color: '#fff',
                      padding: '12px 16px',
                      borderRadius: isSelf ? '16px 16px 4px 16px' : '16px 16px 16px 4px'
                    }}
                  >
                    <div style={{ fontSize: '11px', color: isSelf ? 'var(--primary-light)' : 'var(--text-dim)', marginBottom: '3px' }}>
                      {msg.senderName}
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: 1.4 }}>{msg.text}</div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: isSelf ? 'var(--primary-light)' : 'var(--text-dim)',
                        textAlign: 'right',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '4px'
                      }}
                    >
                      <span>{msg.timestamp}</span>
                      {isSelf && <CheckCheck size={12} />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--border-glass)',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Type your message to coach or admin..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-pill)' }}
          />
          <button
            type="submit"
            className="btn-primary touch-target"
            style={{ borderRadius: 'var(--radius-pill)', width: '44px', height: '44px', padding: 0 }}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
