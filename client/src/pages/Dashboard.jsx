import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

    const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data.transactions);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        { type, amount, category, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAmount('');
      setCategory('');
      setDescription('');

      fetchTransactions();
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

    const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTransactions();
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

    return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      </div>

      <div className="summary-cards">
        <div className="summary-card income-card">
          <p>Total Income</p>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-card expense-card">
          <p>Total Expenses</p>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card balance-card">
          <p>Balance</p>
          <p>${balance.toFixed(2)}</p>
        </div>
      </div>

      <form className="transaction-form" onSubmit={handleAddTransaction}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Transaction</button>
      </form>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet. Add your first one above.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t.id} className="transaction-item">
              <div>
                <span className={`transaction-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount}
                </span>
                <span> — {t.category || 'No category'} — {t.description || 'No description'}</span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  ); 
}

export default Dashboard;