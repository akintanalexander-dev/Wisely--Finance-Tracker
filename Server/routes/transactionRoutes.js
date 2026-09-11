import express from 'express';
import pool from '../db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;
    const userId = req.user.userId;

    if (!type || !amount) {
      return res.status(400).json({ error: 'Type and amount are required' });
    }

    const newTransaction = await pool.query(
      'INSERT INTO transactions (user_id, type, amount, category, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, type, amount, category, description]
    );

    res.status(201).json({ transaction: newTransaction.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;

    const transactions = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json({ transactions: transactions.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactionId = req.params.id;

    const deleted = await pool.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [transactionId, userId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted', transaction: deleted.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;