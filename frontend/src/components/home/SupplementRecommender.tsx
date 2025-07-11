import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';

type FitnessGoal = 'weight loss' | 'muscle gain' | 'maintenance' | '';

interface Product {
  name: string;
  link: string;
}

const SupplementRecommender: React.FC = () => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [goal, setGoal] = useState<FitnessGoal>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const supplementAI = (height: number, weight: number, goal: FitnessGoal): Product[] => {
    const bmi = weight / ((height / 100) ** 2);
    let recommendations: Product[] = [];

    if (goal === 'weight loss') {
      recommendations = [
        { name: 'Green Tea Extract', link: '/supplements/green-tea' },
        { name: 'CLA', link: '/supplements/cla' },
        { name: 'L-Carnitine', link: '/supplements/carnitine' }
      ];
      if (bmi > 30) recommendations.push({ name: 'Apple Cider Vinegar Capsules', link: '/supplements/acv' });
    } else if (goal === 'muscle gain') {
      recommendations = [
        { name: 'Whey Protein', link: '/supplements/whey' },
        { name: 'Creatine', link: '/supplements/creatine' },
        { name: 'BCAA', link: '/supplements/bcaa' }
      ];
      if (weight < 60) recommendations.push({ name: 'Mass Gainer', link: '/supplements/gainer' });
    } else if (goal === 'maintenance') {
      recommendations = [
        { name: 'Multivitamin', link: '/supplements/vitamins' },
        { name: 'Fish Oil', link: '/supplements/fishoil' },
        { name: 'Probiotics', link: '/supplements/probiotics' }
      ];
    }

    return recommendations;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !goal) {
      alert('Please fill out all fields correctly.');
      return;
    }
    const results = supplementAI(height, weight, goal);
    setSuggestions(results);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        AI-Powered Supplement Recommender
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          type="number"
          label="Height (cm)"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          required
          fullWidth
        />
        <TextField
          type="number"
          label="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          required
          fullWidth
        />
        <TextField
          select
          label="Fitness Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value as FitnessGoal)}
          required
          fullWidth
        >
          <MenuItem value="">Select Goal</MenuItem>
          <MenuItem value="weight loss">Weight Loss</MenuItem>
          <MenuItem value="muscle gain">Muscle Gain</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" size="large">
          Get Recommendations
        </Button>
      </Box>

      {suggestions.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" gutterBottom>
            Your Personalized Recommendations:
          </Typography>
          <Grid container spacing={2}>
            {suggestions.map((product, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href={product.link}
                      variant="outlined"
                    >
                      View Product
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default SupplementRecommender; 