import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Paper, CircularProgress } from '@mui/material';
import { generateWorkoutRoutine } from '../../services/deepseekService';

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
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    experienceLevel: '',
    duration: '',
    equipment: [],
    focusAreas: [],
    frequency: ''
  });
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);

  const goalOptions = ['Muscle Gain', 'Fat Loss', 'Strength', 'Endurance', 'Flexibility', 'General Fitness'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const durations = ['4 weeks', '8 weeks', '12 weeks'];
  const frequencyOptions = [1, 2, 3, 4, 5, 6, 7];
  const equipmentOptions = ['Dumbbells', 'Barbell', 'Bodyweight', 'Kettlebells', 'Pull-up Bar', 'Bench'];
  const focusAreas = ['Upper Body', 'Lower Body', 'Core', 'Cardio', 'Strength', 'Hypertrophy'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const generatedRoutine = await generateWorkoutRoutine(preferences);
      setRoutine(generatedRoutine);
      if (onRoutineGenerated) {
        onRoutineGenerated(generatedRoutine);
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
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={preferences.age}
              onChange={(e) => setPreferences({ ...preferences, age: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth required sx={{ minWidth: 200 }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={preferences.gender}
                onChange={(e) => setPreferences({ ...preferences, gender: e.target.value })}
                label="Gender"
              >
                <MenuItem value="">Select gender</MenuItem>
                {genderOptions.map((gender) => (
                  <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Height (cm)"
              type="number"
              value={preferences.height}
              onChange={(e) => setPreferences({ ...preferences, height: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Weight (kg)"
              type="number"
              value={preferences.weight}
              onChange={(e) => setPreferences({ ...preferences, weight: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ minWidth: 200 }}>
              <InputLabel id="goal-label">Goal</InputLabel>
              <Select
                labelId="goal-label"
                id="goal"
                value={preferences.goal}
                onChange={(e) => setPreferences({ ...preferences, goal: e.target.value })}
                label="Goal"
              >
                <MenuItem value="">Select a goal</MenuItem>
                {goalOptions.map((goal) => (
                  <MenuItem key={goal} value={goal}>{goal}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ minWidth: 200 }}>
              <InputLabel>Experience Level</InputLabel>
              <Select
                value={preferences.experienceLevel}
                onChange={(e) => setPreferences({ ...preferences, experienceLevel: e.target.value })}
                label="Experience Level"
              >
                <MenuItem value="">Select experience level</MenuItem>
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ minWidth: 200 }}>
              <InputLabel>Duration</InputLabel>
              <Select
                value={preferences.duration}
                onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                label="Duration"
              >
                <MenuItem value="">Select duration</MenuItem>
                {durations.map((duration) => (
                  <MenuItem key={duration} value={duration}>{duration}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={{ minWidth: 200 }}>
              <InputLabel>Workout Frequency</InputLabel>
              <Select
                value={preferences.frequency}
                onChange={(e) => setPreferences({ ...preferences, frequency: e.target.value })}
                label="Workout Frequency"
              >
                <MenuItem value="">Select frequency</MenuItem>
                {frequencyOptions.map((freq) => (
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

          {/* Move the button outside the Grid, after all fields */}
        </Grid>
        <Box sx={{ mt: 4 }}>
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
        </Box>

        {error && (
          <Box sx={{ mt: 2 }}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}
      </form>
      {/* Render the generated workout plan below the form */}
      {routine && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            {routine.workoutPlan.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {routine.workoutPlan.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Workout Schedule
          </Typography>
          {routine.workoutPlan.days.map((day) => (
            <Box key={day.day} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Day {day.day}</Typography>
              {day.exercises.map((ex, idx) => (
                <Box key={idx} sx={{ ml: 2, my: 1 }}>
                  <Typography variant="body1">
                    {ex.name} — {ex.sets} sets × {ex.reps}
                  </Typography>
                  {ex.notes && (
                    <Typography variant="body2" color="text.secondary">
                      Notes: {ex.notes}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}
          {routine.workoutPlan.tips && routine.workoutPlan.tips.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Tips</Typography>
              <ul>
                {routine.workoutPlan.tips.map((tip, idx) => (
                  <li key={idx}><Typography variant="body2">{tip}</Typography></li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default WorkoutRoutineGenerator;
