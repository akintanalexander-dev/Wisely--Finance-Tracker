import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import './Auth.css';

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
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
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

  return <Box className="auth-page"><Box className="auth-aside"><Box className="auth-logo"><Box className="auth-mark"><AutoGraphIcon /></Box><Typography>Wisely</Typography></Box><Typography variant="h2">A clearer view is a better place to start.</Typography><Typography>Join a growing community making money feel less mysterious and more manageable.</Typography></Box><Box className="auth-main"><Box className="auth-card"><Typography className="auth-kicker">Start fresh</Typography><Typography variant="h4" className="auth-title">Create your Wisely.</Typography><Typography className="auth-subtitle">A few details, then you’re on your way.</Typography>

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

        <Typography align="center" sx={{ mt: 3 }} variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0F4C4C', fontWeight: 600 }}>
            Log In
          </Link>
        </Typography>
      </Box></Box></Box>;
}

export default Signup;