import React, { useState } from 'react';
import { Text, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useProducts } from '../hook/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Styles } from '../styles/Styles';
import { LoadingSkeletonItems } from '../components/LoadingSkeletonItems';

export default function Home() {
    const { products, loading, loadProducts, error } = useProducts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    };

    if (error) {
        return (
            <View style={[Styles.Main, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ marginBottom: 8, color: 'red', textAlign: "center" }}>{error}</Text>
                <TouchableOpacity onPress={loadProducts} style={{ padding: 10, backgroundColor: '#007bff', borderRadius: 8 }}>
                    <Text style={{ color: '#fff' }}>Tentar novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={products}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={loadProducts}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={loading ? <LoadingSkeletonItems /> : <Text>Não há produtos.</Text>}
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
                        Produtos baseados no seu perfil e histórico
                    </Text>
                </>
            }
        />
    );
}
