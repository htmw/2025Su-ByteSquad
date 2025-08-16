import React, { useEffect, useState } from "react";
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
  styled,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../context/CartContext";
import api from "../../utils/api";

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
  price_id: string;
  fallbackImage?: string;
}

const fallbackImages = {
  protein:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/Wey.png",
  performance:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/creatine.png",
  aminoacid:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/bca.png",
  recovery:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/ZMA.png",
  health:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/fishoil.png",
  energy:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/prework.png",
  default:
    "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/bca.png",
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
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
        setLoading(true);
        setError(null);

        const response = await api.get("/supplements");

        const normalized = response.data.map((s: any) => {
          const n = {
            ...s,
            price_id: s.price_id, // <-- normalize for Stripe
            fallbackImage:
              fallbackImages[s.category?.toLowerCase?.() || ""] ||
              fallbackImages.default,
          };

          console.log("Supplement raw:", s);
          console.log("Supplement normalized:", n);

          return n;
        });

        console.table(
          normalized.map((x: any) => ({
            id: x.id,
            name: x.name,
            category: x.category,
            brand: x.brand,
            price: x.price,
            price_id: x.price_id,
          }))
        );

        setSupplements(normalized);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch supplements");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  const handleAddToCart = (s: any, qty = 1) => {
    const price_id = s.price_id; 
    if (!price_id) {
      console.error("Missing price_id for supplement", s);
      alert(`"${s?.name ?? s?.id}" cannot be added (missing Stripe price_id).`);
      return;
    }
    addToCart({
      id: s.id,
      name: s.name,
      price: s.price,
      price_id,
      quantity: qty,
      imageUrl: s.imageUrl,
      category: s.category,
    });
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
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
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
                    objectFit: "cover",
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
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" color="primary">
                      ${supplement.price.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
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
