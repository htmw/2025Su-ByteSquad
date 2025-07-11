import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
  Divider,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../context/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8 }, py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="h5" component="h1">
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/supplements"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CACF3 90%)',
              }
            }}
          >
            Browse Supplements
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 6, lg: 8, xl: 10 }, py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: { xs: 'stretch', md: 'flex-start' }
        }}
      >
        <Box
          sx={{
            flex: { md: '1 1 70%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          {items.map((item: CartItem) => (
            <Card key={item.id} sx={{ display: 'flex', p: 3, mb: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
                  image={item.imageUrl || 'https://via.placeholder.com/140'}
                  alt={item.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, ml: 2 }}>
                  <CardContent sx={{ flex: '1 0 auto', p: 0 }}>
                    <Typography component="h2" variant="h6">
                      {item.name}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 2
                    }}
                  >
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
                        style: { textAlign: 'center', width: '40px' }
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
                      sx={{ ml: 'auto' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        <Box sx={{ flex: { md: '0 0 28%' }, width: '100%' }}>
          <Card sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Subtotal</Typography>
              <Typography variant="subtitle1">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1">Shipping</Typography>
              <Typography variant="subtitle1">Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">${totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1CACF3 90%)',
                }
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}

export default Cart;
