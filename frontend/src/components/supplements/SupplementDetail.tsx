import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CardMedia,
  Button,
  Box,
  Paper,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { useCart } from "../../context/CartContext"; 


interface Supplement {
  id: number;
  name: string;
  description: string;
  price: number; 
  price_id: string; 
  imageUrl: string;
  category: string;
  brand: string;
  benefits: string;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const SupplementDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart(); 
  const [supplement, setSupplement] = useState<Supplement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchSupplement = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `http://localhost:8080/api/supplements/${id}`
        );
        const s = res.data;

        const normalized: Supplement = {
          id: s.id,
          name: s.name,
          description: s.description,
          price: Number(s.price),
          price_id: s.price_id, 
          imageUrl: s.imageUrl,
          category: s.category,
          brand: s.brand,
          benefits: s.benefits,
        };

        console.log("Detail raw:", s);
        console.log("Detail normalized:", normalized);

        setSupplement(normalized);
      } catch (e) {
        console.error("Error fetching supplement:", e);
        setError("Failed to load supplement details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplement();
  }, [id]);

  const handleAddToCart = () => {
    if (!supplement) return;
    addToCart(supplement as any, quantity);
  };

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box mt={4}>
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!supplement) {
    return (
      <Container>
        <Box mt={4}>
          <Alert severity="warning" variant="filled">
            Supplement not found
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: "1800px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <IconButton
          onClick={() => navigate("/supplements")}
          sx={{ mb: 2, "&:hover": { background: "rgba(33, 150, 243, 0.1)" } }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, lg: 8 },
          alignItems: "flex-start",
          maxWidth: "1600px",
          margin: "0 auto",
          flex: 1,
        }}
      >
        {/* Left: Image */}
        <Box
          sx={{
            flex: "1 1 50%",
            position: "sticky",
            top: 24,
            maxWidth: { md: "600px", lg: "800px", xl: "1000px" },
            "@media (min-width: 2000px)": { maxWidth: "1200px" },
            height: { md: "calc(100vh - 120px)" },
          }}
        >
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="100%"
              image={
                supplement.imageUrl ||
                "https://gymnetics-storage.s3.us-east-2.amazonaws.com/uploads/ZMA.png"
              }
              alt={supplement.name}
              sx={{ objectFit: "cover", height: "100%" }}
            />
          </Paper>
        </Box>

        {/* Right: Details */}
        <Box sx={{ flex: "1 1 50%" }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <StyledChip label={supplement.category} color="primary" />
              <Rating value={4} readOnly />
            </Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {supplement.name}
            </Typography>
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 2 }}>
              {supplement.brand}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              ${Number(supplement.price).toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {supplement.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Benefits
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {supplement.benefits}
            </Typography>
          </Box>

          {/* Quantity + Add to Cart */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              type="number"
              size="small"
              label="Qty"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value) || 1))
              }
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                py: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: "medium",
                borderRadius: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1CACF3 90%)",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SupplementDetail;
