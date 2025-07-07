import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CartItem } from '@/components/CartItem';
import { ThemedText } from '@/components/ThemedText';

const placeholderCart = [
  {
    id: 1,
    imageUrl: 'https://example-s3-bucket.s3.amazonaws.com/protein.jpg',
    title: 'Protein Powder',
    price: 29.99,
    quantity: 1,
    selected: true,
  },
  {
    id: 2,
    imageUrl: 'https://example-s3-bucket.s3.amazonaws.com/multivitamin.jpg',
    title: 'Multivitamin',
    price: 19.99,
    quantity: 2,
    selected: false,
  },
];

export default function CartScreen() {
  const [cart, setCart] = useState(placeholderCart);

  const handleSelect = (id: number, checked: boolean) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, selected: checked } : item));
  };
  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };
  const handleQuantityChange = (id: number, qty: number) => {
    setCart((prev) => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const selectedItems = cart.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartList}>
        {cart.map(item => (
          <CartItem
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
            selected={item.selected}
            onSelect={checked => handleSelect(item.id, checked)}
            onRemove={() => handleRemove(item.id)}
            onQuantityChange={qty => handleQuantityChange(item.id, qty)}
          />
        ))}
      </View>
      <View style={styles.summary}>
        <ThemedText style={styles.summaryText}>
          Subtotal for selected items: <ThemedText style={styles.summaryAmount}>${subtotal.toFixed(2)}</ThemedText>
        </ThemedText>
        <TouchableOpacity style={styles.checkoutBtn} disabled={selectedItems.length === 0}>
          <ThemedText style={styles.checkoutBtnText}>Checkout Selected Items</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  cartList: {
    width: '100%',
    maxWidth: 600,
  },
  summary: {
    marginTop: 30,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  summaryAmount: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutBtn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    opacity: 1,
  },
  checkoutBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 