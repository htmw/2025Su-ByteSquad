import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  styled
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: 'none',
  fontWeight: 500,
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky" sx={{ 
      width: '100vw',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1000
    }}>
      <Toolbar sx={{ 
        width: '100%', 
        px: { xs: 1, sm: 2, md: 3, lg: 4, xlg:5, xxlg:6 },
        minHeight: { xs: 60, sm: 70, md: 80 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography 
          variant="h5" 
          component={RouterLink} 
          to="/"
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            '&:hover': {
              color: '#fff',
            }
          }}
        >
          Gymnetics
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <StyledButton 
            color="inherit" 
            startIcon={<FitnessCenterIcon />} 
            onClick={() => navigate('/workouts')}
          >
            Workouts
          </StyledButton>
          <StyledButton 
            color="inherit" 
            onClick={() => navigate('/supplements')}
          >
            Supplements
          </StyledButton>
          {/* <StyledButton 
            color="inherit" 
            onClick={() => navigate('/programs')}
          >
            Programs
          </StyledButton>
          <StyledButton 
            color="inherit" 
            onClick={() => navigate('/progress')}
          >
            Progress
          </StyledButton> */}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              color="inherit" 
              component={RouterLink} 
              to="/cart"
              sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
            >
              <Badge badgeContent={totalItems} color="error">
                {totalItems > 0 ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <Box>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {user.name?.[0] || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{ mt: 1 }}
                >
                  <MenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/login')}
                  startIcon={<PersonOutlineIcon />}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/register"
                  sx={{ 
                    fontWeight: 500,
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
