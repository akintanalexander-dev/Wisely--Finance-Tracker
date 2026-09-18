import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/SpaceDashboardOutlined';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const drawerWidth = 240;
const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 minutes in milliseconds

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const timerRef = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_LIMIT);
    };

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Transactions', icon: <ReceiptLongIcon />, path: '/dashboard' },
    { label: 'Profile', icon: <PersonIcon />, path: '/dashboard' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'primary.main',
            color: 'white',
            border: 'none',
          },
        }}
      >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 32, height: 32, display: 'grid', placeItems: 'center', borderRadius: '10px', bgcolor: 'secondary.main', color: 'primary.main', transform: 'rotate(-6deg)' }}><AutoGraphIcon sx={{ fontSize: 19, transform: 'rotate(6deg)' }} /></Box>
          <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.04em' }}>
            Wisely
          </Typography>
        </Box>

        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: 'white',
                '&.Mui-selected': {
                  bgcolor: 'secondary.main',
                  '&:hover': { bgcolor: 'secondary.main' },
                },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{ borderRadius: 2, color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2, px: 1 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: 14 }}>
              {user?.name?.charAt(0)}
            </Avatar>
            <Typography variant="body2" noWrap>
              {user?.name}
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4, md: 5 }, bgcolor: 'background.default', minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
