import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/ProductCard/ProductCard.styles';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
    </TouchableOpacity>
  );
}

