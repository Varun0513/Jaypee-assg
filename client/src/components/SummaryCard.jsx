import React from 'react';

const SummaryCard = ({ title, amount, icon, type }) => {
  const styles = {
    balance: { accent: '#6366f1', iconBg: '#eef2ff', color: '#6366f1' },
    income:  { accent: '#2ebd6b', iconBg: '#e8f8ef', color: '#1fa557' },
    expense: { accent: '#ef4444', iconBg: '#fef2f2', color: '#ef4444' },
  };
  const s = styles[type] || styles.balance;

  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{ background: s.accent }} />
      <div className="stat-label">{title}</div>
      <div className="stat-amount" style={{ color: s.color }}>{formatted}</div>
      <div className="stat-trend">
        <span>All time</span>
      </div>
      <div className="stat-card-icon" style={{ background: s.iconBg, color: s.accent }}>
        {icon}
      </div>
    </div>
  );
};

export default SummaryCard;
