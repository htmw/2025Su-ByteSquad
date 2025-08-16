import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Link, 
  useTheme,
  CardMedia
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import WorkoutRoutines from '../workouts/WorkoutRoutines';
import { styled } from '@mui/material/styles';
import SupplementRecommender from './SupplementRecommender';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[8],
  },
}));

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <HeroSection>
        <CardMedia
          component="img"
          image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhlJTIwZ3ltfGVufDB8fDB8fHww"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.7,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontSize: { xs: '2rem', md: '4rem' },
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Your Journey to Fitness Starts Here
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              paragraph 
              sx={{ mb: 4 }}
            >
              Premium supplements and expert training programs for your fitness goals
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/workouts')}
                sx={{
                  px: 4,
                  py: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CACF3 90%)',
                  }
                }}
              >
                Start Your Workout
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/supplements')}
                sx={{
                  px: 4,
                  py: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: '#2196F3',
                    color: '#2196F3',
                  }
                }}
              >
                Browse Supplements
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ mb: 6 }}
        >
          Why Choose Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h4" gutterBottom>
                Expert Programs
              </Typography>
              <Typography variant="body1" paragraph>
                Our workout programs are crafted by certified trainers to help you achieve your fitness goals safely and effectively.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/workouts')}
                sx={{ mt: 2 }}
              >
                View Programs
              </Button>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h4" gutterBottom>
                Premium Supplements
              </Typography>
              <Typography variant="body1" paragraph>
                Get the best quality supplements to support your fitness journey. All products are lab-tested and backed by science.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/supplements')}
                sx={{ mt: 2 }}
              >
                Shop Now
              </Button>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <Typography variant="h4" gutterBottom>
                Personalized Support
              </Typography>
              <Typography variant="body1" paragraph>
                Get personalized guidance and support from our fitness experts to help you stay on track and reach your goals.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/contact')}
                sx={{ mt: 2 }}
              >
                Contact Us
              </Button>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      {/* Workout Routines Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          gutterBottom 
          align="center"
          sx={{ mb: 6 }}
        >
          Popular Workout Programs
        </Typography>
        <WorkoutRoutines />
      </Container>

      {/* Supplement Recommender Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <SupplementRecommender />
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom>
              Ready to Transform Your Body?
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 4 }}>
              Join thousands of satisfied customers who have achieved their fitness goals with our programs and supplements.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/workouts')}
                sx={{
                  px: 4,
                  py: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #f0f0f0 30%, #e0e0e0 90%)',
                  }
                }}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate('/supplements')}
                sx={{
                  px: 4,
                  py: 2,
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: '#fff',
                    color: '#fff',
                  }
                }}
              >
                Shop Supplements
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
