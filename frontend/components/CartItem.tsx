import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CartItemProps {
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onRemove: () => void;
  onQuantityChange: (qty: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  imageUrl,
  title,
  price,
  quantity,
  selected,
  onSelect,
  onRemove,
  onQuantityChange,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onSelect(!selected)} style={styles.checkbox}>
      <View style={[styles.checkboxBox, selected && styles.checkboxBoxChecked]} />
    </TouchableOpacity>
    <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
    <View style={styles.info}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <View style={styles.quantityRow}>
        <Text>Qty:</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => onQuantityChange(quantity - 1)} disabled={quantity <= 1}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => onQuantityChange(quantity + 1)}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
      <Text style={styles.removeBtnText}>Remove</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    elevation: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkboxBoxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  price: {
    color: '#333',
    marginBottom: 6,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginHorizontal: 2,
  },
  qtyBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyText: {
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: 10,
    padding: 6,
  },
  removeBtnText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
}); 