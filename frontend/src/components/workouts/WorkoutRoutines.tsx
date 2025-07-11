import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WorkoutRoutines: React.FC = () => {
  const navigate = useNavigate();

  const workoutRoutines = [
    {
      id: 1,
      title: 'Muscle Building',
      description: 'A comprehensive program designed to build muscle mass and strength',
      duration: '12 weeks',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2NsZSUyMGJ1aWxkfGVufDB8fDB8fHww',
    },
    {
      id: 2,
      title: 'Fat Loss',
      description: 'Targeted workouts to burn fat and improve body composition',
      duration: '8 weeks',
      level: 'Beginner',
      image: 'https://plus.unsplash.com/premium_photo-1661690197844-a57eade71342?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmF0JTIwbG9zc3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 3,
      title: 'Strength Training',
      description: 'Focus on building functional strength and power',
      duration: '16 weeks',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Workout Routines
        </Typography>
        <Grid container spacing={4}>
          {workoutRoutines.map((routine) => (
            <Grid item xs={12} sm={6} md={4} key={routine.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={routine.image}
                  alt={routine.title}
                />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {routine.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {routine.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                      Duration: {routine.duration}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      Level: {routine.level}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/workout-details/${routine.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WorkoutRoutines;
