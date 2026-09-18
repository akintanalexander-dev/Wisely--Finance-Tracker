import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Layout from '../components/Layout';

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/transactions`, {
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
    setSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        { type, amount, category, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAmount('');
      setCategory('');
      setDescription('');
      fetchTransactions();
    } catch (err) {
      console.error('Failed to add transaction:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Layout>
      <Typography variant="overline" color="text.secondary">
        {today}
      </Typography>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
        Good day, {user?.name?.split(' ')[0]}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Here's where your money stands.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CardContent>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Current Balance
              </Typography>
              <Typography variant="h3" fontWeight={700} sx={{ my: 1 }}>
                ${balance.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrendingUpIcon />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Income
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  ${totalIncome.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrendingDownIcon />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Expenses
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  ${totalExpenses.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Add Transaction
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddTransaction}
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}
          >
            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ minWidth: 120 }}
              size="small"
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </TextField>

            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              size="small"
              sx={{ width: 120 }}
            />

            <TextField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              sx={{ width: 150 }}
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 150 }}
            />

            <Button type="submit" variant="contained" color="secondary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
        Recent Activity
      </Typography>

      {loading ? (
        <Typography>Loading transactions...</Typography>
      ) : transactions.length === 0 ? (
        <Typography color="text.secondary">No transactions yet. Add your first one above.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <Chip
                      label={t.type}
                      color={t.type === 'income' ? 'success' : 'error'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {t.type === 'income' ? '+' : '-'}${t.amount}
                  </TableCell>
                  <TableCell>{t.category || '—'}</TableCell>
                  <TableCell>{t.description || '—'}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleDelete(t.id)}>
                      <DeleteOutlineIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Layout>
  );
}

export default Dashboard;
