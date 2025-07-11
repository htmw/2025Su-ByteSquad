import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Paper, CircularProgress } from '@mui/material';
import { generateWorkoutRoutine } from '../../services/openaiService';

// Export types
export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  notes: string;
}

export interface WorkoutDay {
  day: number;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  name: string;
  description: string;
  duration: string;
  days: WorkoutDay[];
  tips: string[];
}

export interface WorkoutRoutine {
  workoutPlan: WorkoutPlan;
}

interface WorkoutRoutineGeneratorProps {
  onRoutineGenerated?: (routine: WorkoutRoutine) => void;
}

const WorkoutRoutineGenerator: React.FC<WorkoutRoutineGeneratorProps> = ({ onRoutineGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preferences, setPreferences] = useState({
    goal: '',
    experienceLevel: 'Beginner',
    duration: '4 weeks',
    equipment: ['Dumbbells', 'Barbell', 'Bodyweight'],
    focusAreas: [],
    frequency: 3
  });

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['4 weeks', '8 weeks', '12 weeks'];
  const equipmentOptions = ['Dumbbells', 'Barbell', 'Bodyweight', 'Kettlebells', 'Pull-up Bar', 'Bench'];
  const focusAreas = ['Upper Body', 'Lower Body', 'Core', 'Cardio', 'Strength', 'Hypertrophy'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const routine = await generateWorkoutRoutine(preferences);
      if (onRoutineGenerated) {
        onRoutineGenerated(routine);
      }
    } catch (err) {
      setError('Failed to generate workout routine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Generate Workout Routine
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Goal"
              value={preferences.goal}
              onChange={(e) => setPreferences({ ...preferences, goal: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Experience Level</InputLabel>
              <Select
                value={preferences.experienceLevel}
                onChange={(e) => setPreferences({ ...preferences, experienceLevel: e.target.value })}
                label="Experience Level"
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select
                value={preferences.duration}
                onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                label="Duration"
              >
                {durations.map((dur) => (
                  <MenuItem key={dur} value={dur}>
                    {dur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Workout Frequency</InputLabel>
              <Select
                value={preferences.frequency}
                onChange={(e) => setPreferences({ ...preferences, frequency: Number(e.target.value) })}
                label="Workout Frequency"
              >
                {[3, 4, 5, 6].map((freq) => (
                  <MenuItem key={freq} value={freq}>
                    {freq} days per week
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Available Equipment
            </Typography>
            {equipmentOptions.map((eq) => (
              <FormControlLabel
                key={eq}
                control={
                  <Checkbox
                    checked={preferences.equipment.includes(eq)}
                    onChange={(e) => {
                      const newEquipment = preferences.equipment.includes(eq)
                        ? preferences.equipment.filter((item) => item !== eq)
                        : [...preferences.equipment, eq];
                      setPreferences({ ...preferences, equipment: newEquipment });
                    }}
                  />
                }
                label={eq}
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Focus Areas
            </Typography>
            {focusAreas.map((area) => (
              <FormControlLabel
                key={area}
                control={
                  <Checkbox
                    checked={preferences.focusAreas.includes(area)}
                    onChange={(e) => {
                      const newFocusAreas = preferences.focusAreas.includes(area)
                        ? preferences.focusAreas.filter((item) => item !== area)
                        : [...preferences.focusAreas, area];
                      setPreferences({ ...preferences, focusAreas: newFocusAreas });
                    }}
                  />
                }
                label={area}
              />
            ))}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              Generate Workout Routine
            </Button>
          </Grid>
        </Grid>

        {error && (
          <Box sx={{ mt: 2 }}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}
      </form>
    </Paper>
  );
};

export default WorkoutRoutineGenerator;
