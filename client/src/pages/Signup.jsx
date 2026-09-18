import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });

      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.error || 'Something went wrong';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          p: 5,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" fontWeight={700} align="center" sx={{ mb: 3 }}>
          Sign Up
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" size="large" disabled={submitting}>
            {submitting ? 'Signing up...' : 'Sign Up'}
          </Button>
        </Box>

        <Typography textAlign="center" sx={{ mt: 3 }} variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0F4C4C', fontWeight: 600 }}>
            Log In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;