import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import SpendingChart from '../components/SpendingChart';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to load transactions:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  const handleSave = async (formData) => {
    if (editData) {
      await axios.put(`/api/transactions/${editData._id}`, formData);
    } else {
      await axios.post('/api/transactions', formData);
    }
    fetchTransactions();
    setEditData(null);
  };

  const handleEdit = (tx) => { setEditData(tx); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    await axios.delete(`/api/transactions/${id}`);
    setTransactions(prev => prev.filter(t => t._id !== id));
  };

  const handleCloseForm = () => { setShowForm(false); setEditData(null); };
  const handleAdd = () => { setEditData(null); setShowForm(true); };

  const totalIncome  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Navbar onAddTransaction={handleAdd} />

      {/* Main area */}
      <div className="main-content">
        {/* Top bar */}
        <div className="topbar">
          <div className="topbar-left">
            <h2>Overview</h2>
            <p>{today}</p>
          </div>
          <div className="topbar-right">
            <div className="user-pill">
              <div className="user-pill-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="user-pill-name">{user?.name}</span>
            </div>
            <button
              id="add-transaction-btn"
              className="btn btn-green btn-sm"
              onClick={handleAdd}
            >
              + Add
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="page-body">
          {/* Summary row */}
          <div className="summary-row">
            <SummaryCard title="Net Balance"     amount={balance}      icon="💰" type="balance" />
            <SummaryCard title="Total Income"    amount={totalIncome}  icon="📥" type="income"  />
            <SummaryCard title="Total Expenses"  amount={totalExpense} icon="📤" type="expense" />
          </div>

          {/* Charts */}
          <SpendingChart transactions={transactions} />

          {/* Transaction list */}
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <TransactionForm
          onClose={handleCloseForm}
          onSave={handleSave}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Dashboard;
