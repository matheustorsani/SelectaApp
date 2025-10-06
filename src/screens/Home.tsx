import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { getProducts, Product } from '../data/Products';
import { ProductCard } from '../components/ProductCard';
import { Styles } from '../styles/Styles';
import { allProducts } from '../services/apiService';
import { LoadingSkeleton } from '../components/LoadingSkeleton';

export default function Home() {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async () => {
        const data = await allProducts();
        console.log(data);
        if (loading) return;
        setLoading(true);
        try {
            const newProducts = await getProducts(); // a API precisa suportar paginação
            setProducts(prev => [...prev, ...newProducts]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={products}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            onEndReached={loadProducts}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={loading ? <LoadingSkeleton /> : <Text>Não há produtos.</Text>}
            getItemLayout={(data, index) => ({
                length: 260,
                offset: 260 * index,
                index,
            })}
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
