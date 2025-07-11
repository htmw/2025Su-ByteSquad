import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Paper, 
  Tabs, 
  Tab, 
  useTheme,
  styled,
  CardMedia,
  Chip,
  Divider,
  Rating,
  useMediaQuery
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FitnessCenter, Timer, Star, CheckCircle, HelpOutline } from '@mui/icons-material';
import type { WorkoutRoutine } from './WorkoutRoutineGenerator';
import WorkoutRoutineGenerator from './WorkoutRoutineGenerator';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledCardContent = styled(CardContent)({
  padding: '24px',
});

interface WorkoutProgram {
  id: number;
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  equipment: string[];
  days: {
    day: number;
    exercises: {
      name: string;
      sets: number;
      reps: string;
      notes: string;
    }[];
  }[];
  benefits: string[];
  tips: string[];
  imageUrl: string;
  category: string;
  rating?: number;
  reviews?: number;
}

const workoutPrograms: WorkoutProgram[] = [
  {
    id: 1,
    name: 'Muscle Building Program',
    description: 'A comprehensive program designed to build muscle mass and strength',
    duration: '12 weeks',
    difficulty: 'Intermediate',
    equipment: ['Dumbbells', 'Barbell', 'Bench', 'Pull-up Bar'],
    days: [
      {
        day: 1,
        exercises: [
          {
            name: 'Bench Press',
            sets: 4,
            reps: '8-10',
            notes: 'Focus on form and control'
          },
          {
            name: 'Pull-ups',
            sets: 3,
            reps: 'Max',
            notes: 'Use assistance if needed'
          },
          {
            name: 'Barbell Rows',
            sets: 3,
            reps: '8-10',
            notes: 'Keep back straight'
          }
        ]
      },
      {
        day: 2,
        exercises: [
          {
            name: 'Squats',
            sets: 4,
            reps: '8-10',
            notes: 'Keep knees behind toes'
          },
          {
            name: 'Deadlifts',
            sets: 3,
            reps: '6-8',
            notes: 'Focus on form'
          },
          {
            name: 'Leg Press',
            sets: 3,
            reps: '12-15',
            notes: 'Control the movement'
          }
        ]
      }
    ],
    benefits: [
      'Increased muscle mass',
      'Improved strength',
      'Better posture',
      'Enhanced athletic performance'
    ],
    tips: [
      'Warm up properly before each workout',
      'Focus on form over weight',
      'Progress gradually',
      'Stay hydrated and eat well'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    category: 'Strength'
  },
  {
    id: 2,
    name: 'Fat Loss Program',
    description: 'A high-intensity program focused on burning fat and improving cardiovascular health',
    duration: '8 weeks',
    difficulty: 'Advanced',
    equipment: ['Kettlebells', 'Jump Rope', 'Medicine Ball'],
    days: [
      {
        day: 1,
        exercises: [
          {
            name: 'Kettlebell Swings',
            sets: 4,
            reps: '20-25',
            notes: 'Keep hips engaged'
          },
          {
            name: 'Burpees',
            sets: 3,
            reps: '15-20',
            notes: 'Maintain proper form'
          },
          {
            name: 'Mountain Climbers',
            sets: 3,
            reps: '30-40',
            notes: 'Keep core tight'
          }
        ]
      },
      {
        day: 2,
        exercises: [
          {
            name: 'Battle Ropes',
            sets: 4,
            reps: '30s',
            notes: 'Full body movement'
          },
          {
            name: 'Box Jumps',
            sets: 3,
            reps: '12-15',
            notes: 'Land softly'
          },
          {
            name: 'Sled Push',
            sets: 3,
            reps: '30m',
            notes: 'Push with power'
          }
        ]
      }
    ],
    benefits: [
      'Increased calorie burn',
      'Improved cardiovascular health',
      'Enhanced endurance',
      'Toned muscles'
    ],
    tips: [
      'Stay hydrated',
      'Monitor heart rate',
      'Include active rest',
      'Cool down properly'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    category: 'Cardio'
  },
  {
    id: 3,
    name: 'Yoga & Flexibility',
    description: 'A gentle program focused on improving flexibility and reducing stress',
    duration: '6 weeks',
    difficulty: 'Beginner',
    equipment: ['Yoga Mat', 'Blocks', 'Strap'],
    days: [
      {
        day: 1,
        exercises: [
          {
            name: 'Sun Salutation',
            sets: 4,
            reps: '1 round',
            notes: 'Flow through movements'
          },
          {
            name: 'Warrior Pose',
            sets: 3,
            reps: '30s',
            notes: 'Hold strong'
          },
          {
            name: 'Tree Pose',
            sets: 3,
            reps: '30s',
            notes: 'Balance with focus'
          }
        ]
      },
      {
        day: 2,
        exercises: [
          {
            name: 'Downward Dog',
            sets: 4,
            reps: '1 minute',
            notes: 'Stretch and breathe'
          },
          {
            name: 'Cobra Pose',
            sets: 3,
            reps: '30s',
            notes: 'Open chest'
          },
          {
            name: 'Child Pose',
            sets: 3,
            reps: '1 minute',
            notes: 'Rest and recover'
          }
        ]
      }
    ],
    benefits: [
      'Improved flexibility',
      'Reduced stress',
      'Better posture',
      'Enhanced mindfulness'
    ],
    tips: [
      'Breathe deeply',
      'Listen to your body',
      'Practice regularly',
      'Stay consistent'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    category: 'Flexibility'
  },
  {
    id: 4,
    name: 'CrossFit Program',
    description: 'A high-intensity program combining strength and conditioning',
    duration: '10 weeks',
    difficulty: 'Advanced',
    equipment: ['Kettlebells', 'Barbell', 'Rings', 'Wall Ball'],
    days: [
      {
        day: 1,
        exercises: [
          {
            name: 'Fran (Thrusters + Pull-ups)',
            sets: 3,
            reps: '21-15-9',
            notes: 'For time'
          },
          {
            name: 'Deadlifts',
            sets: 4,
            reps: '5',
            notes: 'Heavy weight'
          },
          {
            name: 'Ring Dips',
            sets: 3,
            reps: 'Max',
            notes: 'Use bands if needed'
          }
        ]
      },
      {
        day: 2,
        exercises: [
          {
            name: 'Cindy (Pull-ups + Push-ups + Squats)',
            sets: 20,
            reps: '5-5-5',
            notes: 'As many rounds as possible'
          },
          {
            name: 'Clean & Jerk',
            sets: 4,
            reps: '3',
            notes: 'Focus on technique'
          },
          {
            name: 'Wall Ball Shots',
            sets: 3,
            reps: '20',
            notes: 'Maintain form'
          }
        ]
      }
    ],
    benefits: [
      'Improved strength',
      'Enhanced conditioning',
      'Better endurance',
      'Increased power'
    ],
    tips: [
      'Scale movements appropriately',
      'Focus on technique',
      'Stay hydrated',
      'Listen to your body'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    category: 'CrossFit'
  }
];

const WorkoutDetails = () => {
  const [value, setValue] = useState(0);
  const [activeDay, setActiveDay] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const program = workoutPrograms.find(p => p.id === Number(id));

  if (!program) {
    return <Typography variant="h5">Program not found</Typography>;
  }

  const rating = program.rating || 4.5;
  const reviews = program.reviews || 128;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={program.imageUrl}
              alt={program.name}
              sx={{
                objectFit: 'cover',
                borderRadius: '16px 16px 0 0',
              }}
            />
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {program.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" paragraph>
                    {program.description}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <Rating value={rating} precision={0.5} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {reviews} reviews
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Chip 
                  icon={<Timer sx={{ mr: 0.5 }} />} 
                  label={`Duration: ${program.duration}`} 
                  color="primary" 
                />
                <Chip 
                  icon={<FitnessCenter sx={{ mr: 0.5 }} />} 
                  label={`Difficulty: ${program.difficulty}`} 
                  color="secondary" 
                />
                <Chip 
                  icon={<CheckCircle sx={{ mr: 0.5 }} />} 
                  label={`Category: ${program.category}`} 
                />
              </Box>

              <Tabs value={value} onChange={handleChange} sx={{ mb: 4 }}>
                <Tab icon={<HelpOutline sx={{ mr: 1 }} />} label="Program Details" />
                <Tab icon={<FitnessCenter sx={{ mr: 1 }} />} label="Generate Routine" />
              </Tabs>

              {value === 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Workout Schedule
                    </Typography>
                    {program.days.map((day) => (
                      <Paper 
                        key={day.day}
                        elevation={1}
                        sx={{ 
                          p: 2, 
                          mb: 2,
                          borderRadius: 1,
                          transition: 'transform 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[4],
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Day {day.day}
                          </Typography>
                          <Chip 
                            label={`${day.exercises.length} exercises`} 
                            size="small" 
                            color="primary" 
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {day.exercises.map((exercise) => (
                            <Box 
                              key={exercise.name} 
                              sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                p: 1,
                                borderRadius: 1,
                                bgcolor: 'action.hover',
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                  bgcolor: 'action.selected',
                                }
                              }}
                            >
                              <Typography variant="body2">
                                {exercise.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {exercise.sets} sets × {exercise.reps}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Paper>
                    ))}
                  </Box>

                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Benefits
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {program.benefits.map((benefit) => (
                        <Box
                          key={benefit} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'action.hover',
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                              bgcolor: 'action.selected',
                            }
                          }}
                        >
                          <CheckCircle sx={{ color: 'success.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Tips
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {program.tips.map((tip) => (
                        <Box
                          key={tip} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'action.hover',
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                              bgcolor: 'action.selected',
                            }
                          }}
                        >
                          <HelpOutline sx={{ color: 'info.main' }} />
                          <Typography variant="body2" color="text.secondary">
                            {tip}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <WorkoutRoutineGenerator program={program} />
              )}

              <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  onClick={() => navigate('/workouts')}
                  startIcon={<FitnessCenter />}
                >
                  Back to Programs
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={() => navigate('/workout-routine?programId=' + program.id)}
                  startIcon={<FitnessCenter />}
                >
                  Start Program
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Program Overview
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1">
                    {program.duration}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Difficulty
                  </Typography>
                  <Typography variant="body1">
                    {program.difficulty}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Equipment Needed
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {program.equipment.map((item) => (
                      <Chip key={item} label={item} size="small" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkoutDetails;
