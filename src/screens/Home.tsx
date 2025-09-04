// src/screens/Home.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { products } from '../data/Products';

export default function Home() {
    return (
        <ScrollView style={{ flex: 1, padding: 16 }} showsVerticalScrollIndicator={false}>
            <View style={styles.View}>
                {products.map((item) => (
                    <View key={item.id} style={styles.productsContainer}>
                        <Image source={item.image} style={{ width: 120, height: 120, alignSelf: 'center' }} />
                        <Text>{item.name}</Text>
                        <Text style={{ paddingTop: 5, paddingBottom: 5, color: 'gray' }}>⭐⭐⭐⭐⭐ {item.rate} {item.totalRatings}</Text>
                        <Text style={{ color: '#0063E6', fontWeight: 'bold' }}>R$ {(item.discount ? item.price - ((item.discount / 100) * item.price) : item.price).toFixed(2)}</Text>
                        {item.discount && <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 12 }}>R$ {item.price.toFixed(2)}</Text>}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    View: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 16,
    },
    productsContainer: {
        width: '48%',
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        elevation: 2,
    },
});
