import React from 'react';
import { Text, FlatList } from 'react-native';
import { products } from '../data/Products';
import { ProductCard } from '../components/ProductCard';
import { Styles } from '../styles/Styles';

export default function Home() {
    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={
                <>
                    <Text style={Styles.TextTitle}>Para você</Text>
                    <Text style={Styles.TextSubtitle}>
                        Produtos baseados com base no seu perfil e histórico
                    </Text>
                </>
            }
        />
    );
}
