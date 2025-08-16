import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    weight: '',
    height: '',
    fitnessGoal: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        ...formData,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height)
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container 
        component="main" 
        maxWidth="sm" 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          m: 0,
          p: { xs: 2, sm: 3 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Create Account
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ mb: 3, color: 'text.secondary' }}
          >
            Join us to start your fitness journey
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ flex: 1 }}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ flex: 1 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="firstName"
                  label="First Name"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ flex: 1 }}
                />
                <TextField
                  required
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ flex: 1 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  name="weight"
                  label="Weight (kg)"
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ flex: 1 }}
                />
                <TextField
                  required
                  fullWidth
                  name="height"
                  label="Height (cm)"
                  type="number"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ flex: 1 }}
                />
              </Box>
              
              <TextField
                required
                fullWidth
                name="fitnessGoal"
                label="Fitness Goal"
                id="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'medium',
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1CACF3 90%)',
                }
              }}
            >
              Create Account
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#2196F3',
                    textDecoration: 'none',
                    fontWeight: 'medium'
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
