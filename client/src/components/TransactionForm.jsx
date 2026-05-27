import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Food & Dining', 'Transport', 'Shopping', 'Entertainment',
  'Bills & Utilities', 'Health', 'Education',
  'Salary', 'Freelance', 'Investment', 'Other',
];

const emptyForm = {
  type: 'expense',
  amount: '',
  category: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
};

const TransactionForm = ({ onClose, onSave, editData }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        type: editData.type,
        amount: editData.amount,
        category: editData.category,
        description: editData.description || '',
        date: editData.date?.split('T')[0] || emptyForm.date,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const setType = (type) => setForm({ ...form, type, category: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.category) { setError('Please select a category.'); return; }
    if (!form.amount || Number(form.amount) <= 0) {
      setError('Enter a valid amount greater than 0.');
      return;
    }
    setLoading(true);
    try {
      await onSave({ ...form, amount: Number(form.amount) });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const incomeCategories = ['Salary', 'Freelance', 'Investment', 'Other'];
  const expenseCategories = CATEGORIES.filter(c => !['Salary', 'Freelance', 'Investment'].includes(c));
  const relevantCats = form.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">
            {editData ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: 14 }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Type toggle */}
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-toggle">
              <button
                type="button"
                id="type-expense-btn"
                className={`type-btn ${form.type === 'expense' ? 'active-expense' : ''}`}
                onClick={() => setType('expense')}
              >
                📤 Expense
              </button>
              <button
                type="button"
                id="type-income-btn"
                className={`type-btn ${form.type === 'income' ? 'active-income' : ''}`}
                onClick={() => setType('income')}
              >
                📥 Income
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              name="amount"
              className="form-input"
              placeholder="0"
              min="0.01"
              step="any"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {relevantCats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">Note (optional)</label>
            <input
              id="description"
              type="text"
              name="description"
              className="form-input"
              placeholder="e.g. Grocery run, Monthly salary..."
              value={form.description}
              onChange={handleChange}
              maxLength={200}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label" htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              className="form-input"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button type="button" className="btn btn-outline btn-full" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-green btn-full" disabled={loading}>
              {loading ? 'Saving...' : editData ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
