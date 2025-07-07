import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ProductCard } from '@/components/ProductCard';

const placeholderProducts = [
  {
    id: 1,
    imageUrl: 'https://example-s3-bucket.s3.amazonaws.com/protein.jpg',
    title: 'Protein Powder',
    description: 'High-quality whey protein isolate',
    price: 29.99,
  },
  {
    id: 2,
    imageUrl: 'https://example-s3-bucket.s3.amazonaws.com/multivitamin.jpg',
    title: 'Multivitamin',
    description: 'Complete daily vitamin supplement',
    price: 19.99,
  },
  {
    id: 3,
    imageUrl: 'https://example-s3-bucket.s3.amazonaws.com/omega3.jpg',
    title: 'Omega-3',
    description: 'Fish oil supplement for heart health',
    price: 24.99,
  },
  {
    id: 4,
    imageUrl: 'https://example-s3-bucket.s3.amazonaws.com/creatine.jpg',
    title: 'Creatine',
    description: 'Micronized creatine monohydrate',
    price: 14.99,
  },
];

export default function ProductsScreen() {
  const [cart, setCart] = useState<number[]>([]);

  const handleAddToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {placeholderProducts.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            description={product.description}
            price={product.price}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const numColumns = Dimensions.get('window').width > 600 ? 3 : 2;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
}); 