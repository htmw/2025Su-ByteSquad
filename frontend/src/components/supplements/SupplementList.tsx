import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Container, 
  Button,
  CircularProgress,
  Alert,
  Box,
  Rating,
  Chip,
  Divider,
  Snackbar,
  IconButton,
  styled
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

interface Supplement {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  usage: string;
  benefits: string;
  fallbackImage?: string;
}

const fallbackImages = {
  protein: 'https://images.unsplash.com/photo-1546273043-76663a53f5bc',
  preworkout: 'https://images.unsplash.com/photo-1574773054289-745b28746f8b',
  vitamins: 'https://images.unsplash.com/photo-1507399929280-54b1725998d0',
  recovery: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  default: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc'
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SupplementList = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await axios.get('/api/supplements');
        setSupplements(response.data.map(supplement => ({
          ...supplement,
          fallbackImage: fallbackImages[supplement.category.toLowerCase()] || fallbackImages.default
        })));
      } catch (err) {
        setError('Failed to fetch supplements');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  const handleAddToCart = (supplement: Supplement) => {
    addToCart(supplement);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Premium Supplements
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {supplements.map((supplement) => (
            <Grid item xs={12} sm={6} md={4} key={supplement.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={supplement.imageUrl || supplement.fallbackImage}
                  alt={supplement.name}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = supplement.fallbackImage;
                  }}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {supplement.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {supplement.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary">
                      ${supplement.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <StyledChip label={supplement.category} color="primary" />
                    <StyledChip label={supplement.brand} color="secondary" />
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(supplement)}
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ mt: 2 }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Added to cart successfully!"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            ×
          </IconButton>
        }
      />
    </Container>
  );
};

export default SupplementList;