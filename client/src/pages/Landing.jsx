import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, Stack, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import './Landing.css';

const Logo = () => (
  <Box className="brand-lockup"><Box className="brand-mark"><AutoGraphIcon /></Box><Typography className="brand-name">Wisely</Typography></Box>
);

function Landing() {
  return <Box className="landing-page">
    <AppBar className="landing-nav" position="static" elevation={0}><Toolbar><Logo /><Box className="nav-actions"><Button component={Link} to="/login" color="inherit">Log in</Button><Button component={Link} to="/signup" variant="contained" endIcon={<ArrowForwardIcon />}>Start free</Button></Box></Toolbar></AppBar>
    <Box className="landing-hero"><Container maxWidth="lg" className="hero-grid"><Box className="hero-copy"><Chip label="A calmer way to manage money" className="eyebrow" /><Typography variant="h1">Make room for the life <em>behind</em> your numbers.</Typography><Typography className="hero-description">Wisely brings your income and spending into one clear, friendly view, so you can make decisions with confidence and get back to what matters.</Typography><Stack direction="row" spacing={2} className="hero-actions"><Button component={Link} to="/signup" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>Create your free account</Button><Button component={Link} to="/login" size="large" className="quiet-button">I have an account</Button></Stack><Stack direction="row" spacing={2} className="trust-row"><CheckCircleOutlineIcon /><Typography>Private by design</Typography><Typography>•</Typography><Typography>No spreadsheets required</Typography></Stack></Box><Box className="hero-visual"><Box className="visual-orbit orbit-one" /><Box className="visual-orbit orbit-two" /><Box className="balance-card"><Typography className="card-label">Your balance</Typography><Typography className="balance-amount">$8,240.50</Typography><Box className="balance-change"><Typography>↑ 12.8%</Typography><Typography>this month</Typography></Box><Box className="mini-chart"><span /><span /><span /><span /><span /><span /><span /></Box></Box><Box className="floating-note"><AutoGraphIcon /><Box><Typography>Spending is down</Typography><strong>$284 this week</strong></Box></Box></Box></Container></Box>
    <Box className="landing-proof"><Container maxWidth="lg"><Typography>Built for the moments when you want to feel a little more in control.</Typography><Box className="proof-items"><span>Know what is happening</span><span>Build better habits</span><span>Plan with less guesswork</span></Box></Container></Box>
  </Box>;
}

export default Landing;