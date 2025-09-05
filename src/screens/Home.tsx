import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native';
import { products } from '../data/Products';
import { ProductCard } from '../components/ProductCard';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Styles } from '../styles/Styles';

export default function Home() {
    return (
        <GestureHandlerRootView style={{ flex: 1, padding: 16, paddingBottom: 0}}>
            <Text style={Styles.TextTitle}>Para você</Text>
            <Text style={Styles.TextSubtitle}>Produtos baseados com base no seu perfil e histórico</Text>
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (<ProductCard key={item.id} item={item} />)}
            />
        </GestureHandlerRootView>
    );
}