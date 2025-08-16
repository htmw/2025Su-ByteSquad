import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Programs = () => {
  const navigate = useNavigate();

  const programs = [
    {
      id: 1,
      title: 'Beginner Fitness Program',
      description: 'A comprehensive program for fitness beginners',
      duration: '8 weeks',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Strength Training Program',
      description: 'Focus on building strength and muscle mass',
      duration: '12 weeks',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Fat Loss Program',
      description: 'Targeted program for fat loss and body composition',
      duration: '16 weeks',
      difficulty: 'Advanced'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Training Programs
      </Typography>
      
      <Grid container spacing={4}>
        {programs.map((program) => (
          <Grid item xs={12} sm={6} md={4} key={program.id}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/programs/${program.id}`)}
            >
              <Typography variant="h6" gutterBottom>
                {program.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {program.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Duration: {program.duration}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Difficulty: {program.difficulty}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Programs;
