import React, { useState } from 'react';

const CATEGORIES = [
  'All Categories', 'Food & Dining', 'Transport', 'Shopping',
  'Entertainment', 'Bills & Utilities', 'Health', 'Education',
  'Salary', 'Freelance', 'Investment', 'Other',
];

const CAT_ICON = {
  'Food & Dining': '🍽️', 'Transport': '🚗', 'Shopping': '🛍️',
  'Entertainment': '🎬', 'Bills & Utilities': '💡', 'Health': '💊',
  'Education': '📚', 'Salary': '💼', 'Freelance': '💻',
  'Investment': '📈', 'Other': '📦',
};

const CAT_COLOR = {
  'Food & Dining': '#ff7043', 'Transport': '#42a5f5', 'Shopping': '#ab47bc',
  'Entertainment': '#ec407a', 'Bills & Utilities': '#ffa726', 'Health': '#26a69a',
  'Education': '#5c6bc0', 'Salary': '#66bb6a', 'Freelance': '#26c6da',
  'Investment': '#8d6e63', 'Other': '#bdbdbd',
};

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  const [filters, setFilters] = useState({
    search: '', type: '', category: '', startDate: '', endDate: '',
  });
  const [sortBy, setSortBy] = useState('date-desc');

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const clearFilters = () => {
    setFilters({ search: '', type: '', category: '', startDate: '', endDate: '' });
    setSortBy('date-desc');
  };

  const filtered = transactions.filter(t => {
    const mSearch = filters.search
      ? (t.description || '').toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const mType = filters.type ? t.type === filters.type : true;
    const mCat = filters.category && filters.category !== 'All Categories'
      ? t.category === filters.category : true;
    const mStart = filters.startDate ? new Date(t.date) >= new Date(filters.startDate) : true;
    const mEnd = filters.endDate
      ? new Date(t.date) <= new Date(filters.endDate + 'T23:59:59') : true;
    return mSearch && mType && mCat && mStart && mEnd;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'date-asc') {
      const dateDiff = new Date(a.date) - new Date(b.date);
      if (dateDiff !== 0) return dateDiff;
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'amount-desc') {
      return b.amount - a.amount;
    }
    if (sortBy === 'amount-asc') {
      return a.amount - b.amount;
    }
    return 0;
  });

  const hasFilters = Object.values(filters).some(v => v !== '') || sortBy !== 'date-desc';

  const fmtAmt = (n) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(n);

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', margin: 0 }}>
          Transactions
        </p>
        <span style={{
          fontSize: '0.75rem', color: 'var(--text-muted)',
          background: 'var(--bg)', border: '1px solid var(--border)',
          padding: '3px 10px', borderRadius: 100
        }}>
          {sorted.length} records
        </span>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          id="search-input"
          type="text"
          name="search"
          className="form-input"
          placeholder="Search description..."
          value={filters.search}
          onChange={handleChange}
          style={{ minWidth: 180 }}
        />
        <select id="filter-type" name="type" className="form-select" value={filters.type} onChange={handleChange}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select id="filter-category" name="category" className="form-select" value={filters.category} onChange={handleChange}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input id="filter-start-date" type="date" name="startDate" className="form-input" value={filters.startDate} onChange={handleChange} />
        <input id="filter-end-date" type="date" name="endDate" className="form-input" value={filters.endDate} onChange={handleChange} />
        
        {/* Sort Select Dropdown */}
        <select id="sort-by" name="sortBy" className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Latest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Amount: High to Low</option>
          <option value="amount-asc">Amount: Low to High</option>
        </select>

        {hasFilters && (
          <button className="btn btn-ghost btn-sm" onClick={clearFilters}>✕ Clear</button>
        )}
      </div>

      <div className="divider" style={{ margin: '14px 0' }} />

      {/* List */}
      {loading ? (
        <div className="spinner" />
      ) : sorted.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🔍</div>
          <h3>No transactions found</h3>
          <p>{hasFilters ? 'Try adjusting your filters.' : 'Add your first transaction.'}</p>
        </div>
      ) : (
        <div>
          {sorted.map(t => {
            const color = CAT_COLOR[t.category] || '#bdbdbd';
            return (
              <div key={t._id} className="tx-item">
                {/* Icon */}
                <div
                  className="tx-icon"
                  style={{ background: color + '22', color }}
                >
                  {CAT_ICON[t.category] || '💳'}
                </div>

                {/* Info */}
                <div className="tx-info">
                  <div className="tx-name">{t.description || t.category}</div>
                  <div className="tx-sub">
                    <span className={`badge badge-${t.type}`}>{t.type}</span>
                    {' · '}
                    <span>{t.category}</span>
                    {' · '}
                    <span>{fmtDate(t.date)}</span>
                  </div>
                </div>

                {/* Amount + actions */}
                <div className="tx-right">
                  <div
                    className="tx-amount"
                    style={{ color: t.type === 'income' ? 'var(--green)' : 'var(--red)' }}
                  >
                    {t.type === 'income' ? '+' : '−'}{fmtAmt(t.amount)}
                  </div>
                  <div className="tx-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => onEdit(t)} title="Edit">✏️</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(t._id)} title="Delete">🗑</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
