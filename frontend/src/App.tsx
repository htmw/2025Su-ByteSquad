import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SupplementList from './components/supplements/SupplementList';
import SupplementDetail from './components/supplements/SupplementDetail';
import Cart from './components/cart/Cart';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import WorkoutRoutines from './components/workouts/WorkoutRoutines';
import WorkoutDetails from './components/workouts/WorkoutDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/supplements" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/supplements" />} />
        <Route path="/supplements" element={isAuthenticated ? <SupplementList /> : <Navigate to="/login" />} />
        <Route path="/supplements/:id" element={isAuthenticated ? <SupplementDetail /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/workouts" element={isAuthenticated ? <WorkoutRoutines /> : <Navigate to="/login" />} />
        <Route path="/workout-details/:id" element={isAuthenticated ? <WorkoutDetails /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        m: 0,
        p: 0
      }}>
        <AuthProvider>
          <CartProvider>
            <Router>
              <AppRoutes />
            </Router>
          </CartProvider>
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;
