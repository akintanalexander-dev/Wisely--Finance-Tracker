import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import './Auth.css';

function Login() {
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.error || 'Something went wrong';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return <Box className="auth-page"><Box className="auth-aside"><Box className="auth-logo"><Box className="auth-mark"><AutoGraphIcon /></Box><Typography>Wisely</Typography></Box><Typography variant="h2">Your money has a story. We help you read it.</Typography><Typography>See the full picture, make thoughtful choices, and feel at home in your finances.</Typography></Box><Box className="auth-main"><Box className="auth-card"><Typography className="auth-kicker">Welcome back</Typography><Typography variant="h4" className="auth-title">Log in to your calm.</Typography><Typography className="auth-subtitle">Pick up right where you left off.</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            {submitting ? 'Logging in...' : 'Log In'}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3 }} variant="body2" color="text.secondary">
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#0F4C4C', fontWeight: 600 }}>
            Sign Up
          </Link>
        </Typography>
      </Box></Box></Box>;
}

export default Login;