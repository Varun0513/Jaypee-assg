import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLORS = {
  'Food & Dining':    '#ff7043',
  'Transport':        '#42a5f5',
  'Shopping':         '#ab47bc',
  'Entertainment':    '#ec407a',
  'Bills & Utilities':'#ffa726',
  'Health':           '#26a69a',
  'Education':        '#5c6bc0',
  'Salary':           '#66bb6a',
  'Freelance':        '#26c6da',
  'Investment':       '#8d6e63',
  'Other':            '#bdbdbd',
};

const SpendingChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  const catTotals = {};
  expenses.forEach(t => {
    catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
  });
  const cats = Object.keys(catTotals);
  const vals = Object.values(catTotals);
  const colors = cats.map(c => COLORS[c] || '#bdbdbd');

  const doughnutData = {
    labels: cats,
    datasets: [{
      data: vals,
      backgroundColor: colors.map(c => c + 'dd'),
      borderColor: colors,
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const doughnutOpts = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#5a6872',
          font: { family: 'Inter', size: 11 },
          padding: 12,
          usePointStyle: true,
          pointStyleWidth: 8,
          boxHeight: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const pct = ((ctx.raw / total) * 100).toFixed(0);
            return ` ₹${ctx.raw.toLocaleString('en-IN')} · ${pct}%`;
          },
        },
        backgroundColor: '#1c2b1c',
        titleColor: '#fff',
        bodyColor: '#ccc',
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  // Monthly bar
  const monthly = {};
  transactions.forEach(t => {
    const key = new Date(t.date).toLocaleString('en-IN', { month: 'short', year: '2-digit' });
    if (!monthly[key]) monthly[key] = { income: 0, expense: 0 };
    monthly[key][t.type] += t.amount;
  });
  const months = Object.keys(monthly).slice(-6);

  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: months.map(m => monthly[m]?.income || 0),
        backgroundColor: '#2ebd6b',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Expense',
        data: months.map(m => monthly[m]?.expense || 0),
        backgroundColor: '#ef4444',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#5a6872',
          font: { family: 'Inter', size: 11 },
          usePointStyle: true,
          boxHeight: 8,
        },
      },
      tooltip: {
        backgroundColor: '#1c2b1c',
        titleColor: '#fff',
        bodyColor: '#ccc',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: ctx => ` ₹${ctx.raw.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#9aabb5', font: { family: 'Inter', size: 11 } },
        border: { display: false },
      },
      y: {
        grid: { color: '#f0f2f5' },
        ticks: {
          color: '#9aabb5',
          font: { family: 'Inter', size: 11 },
          callback: val => `₹${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`,
        },
        border: { display: false },
      },
    },
  };

  if (transactions.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px 24px', marginBottom: 24 }}>
        <div style={{ fontSize: '2rem', marginBottom: 10, opacity: 0.4 }}>📊</div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Add transactions to see your charts</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16, marginBottom: 24 }}>
      {/* Doughnut */}
      <div className="card">
        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, color: 'var(--text)' }}>
          Spending by Category
        </p>
        {expenses.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', padding: '20px 0', textAlign: 'center' }}>
            No expenses yet
          </p>
        ) : (
          <div style={{ height: 200 }}>
            <Doughnut data={doughnutData} options={doughnutOpts} />
          </div>
        )}
      </div>

      {/* Bar */}
      <div className="card">
        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 16, color: 'var(--text)' }}>
          Monthly Overview
        </p>
        {months.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', padding: '20px 0', textAlign: 'center' }}>
            No data yet
          </p>
        ) : (
          <div style={{ height: 200 }}>
            <Bar data={barData} options={barOpts} />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 800px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpendingChart;
