// src/screens/Home.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import {products} from '../data/Products';

export default function Home() {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 16 }}>
                        <Image source={item.image} style={{ width: 100, height: 100 }} />
                        <Text>{item.name}</Text>
                        <Text>R$ {item.price.toFixed(2)}</Text>
                    </View>
                )}
            />
        </View>
    );
}
