import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCart } from "../../context/CartContext";
import api from "../../utils/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  price_id: string;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

const fallbackImages = {
  protein: "",
  preworkout: "https://images.unsplash.com/photo-1574773054289-745b28746f8b",
  vitamins: "https://images.unsplash.com/photo-1507399929280-54b1725998d0",
  recovery: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  default: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
};

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleCheckout = async () => {
    console.log("🛒 Cart items (raw):", items);

    if (!items.length) {
      console.warn("⚠️ No items in cart, aborting checkout.");
      return;
    }

    const products = items
      .filter((i) => !!i.price_id)
      .map((i) => ({ price_id: i.price_id, quantity: i.quantity }));

    console.log("📦 Payload products (to backend):", products);

    if (!products.length) {
      alert("No valid items to checkout (missing priceId).");
      return;
    }

    try {
      const { data } = await api.post("/product/v1/checkoutCart", { products });
      console.log("StripeResponse from backend:", data);

      if (data?.status?.toLowerCase() === "failed") {
        alert(data.message || "Checkout failed");
        return;
      }
      if (data?.sessionUrl) {
        window.location.href = data.sessionUrl;
        return;
      }
      if (data?.sessionId) {
        alert(
          "Got sessionId, but no Stripe.js integration is configured here."
        );
        return;
      }
      alert("Checkout created, but no redirect info provided.");
    } catch (err: any) {
      console.error("Checkout error", err?.response || err);
      alert(
        err?.response?.data?.message ||
          err?.message ||
          `Checkout failed (${err?.response?.status || "network"})`
      );
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="h5">Your cart is empty</Typography>
          <Button
            variant="contained"
            href="/supplements"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            }}
          >
            Browse Supplements
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <Box flex={1} display="flex" flexDirection="column" gap={3}>
          {items.map((item) => (
            <Card key={item.id} sx={{ display: "flex", p: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: "cover" }}
                image={
                  item.imageUrl ||
                  fallbackImages[
                    item.category?.toLowerCase() as keyof typeof fallbackImages
                  ] ||
                  fallbackImages.default
                }
                alt={item.name}
              />
              <Box flex={1} ml={2} display="flex" flexDirection="column">
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    size="small"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        updateQuantity(item.id, value);
                      }
                    }}
                    inputProps={{
                      min: 1,
                      style: { textAlign: "center", width: "40px" },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ ml: "auto" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
        <Box flex={{ md: "0 0 28%" }} width="100%">
          <Card sx={{ p: 3, position: "sticky", top: 24 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Subtotal</Typography>
              <Typography>${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Shipping</Typography>
              <Typography>Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Cart;
