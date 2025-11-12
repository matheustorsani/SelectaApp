import React, { useState, useEffect } from "react";
import { Text, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hook/useProducts";
import { LoadingSkeletonItems } from "../components/LoadingSkeletonItems";
import { debounce } from "../utils/debounce";

export default function Search() {
    const { products, loading, loadProducts, search, error } = useProducts();
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searching, setSearching] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!query.trim()) setFilteredProducts(products);
    }, [products, query]);

    useEffect(() => {
        debounce(async (text: string) => {
            text = query;
            if (!text.trim()) {
                setFilteredProducts(products);
                setSearching(false);
                return;
            }

            setSearching(true);
            try {
                await search(text);
                setFilteredProducts(products);
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
            } finally {
                setSearching(false);
            }
        }, 600);
    }, [query]);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    };

    if (error) {
        return (
            <View style={[Styles.Main, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ marginBottom: 8, color: 'red' }}>{error}</Text>
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
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            contentContainerStyle={{ paddingBottom: 40 }}
            removeClippedSubviews
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={!query ? loadProducts : null}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
                loading || searching ? (
                    <LoadingSkeletonItems />
                ) : (
                    <Text>Não há produtos encontrados.</Text>
                )
            }
            getItemLayout={(_, index) => ({
                length: 260,
                offset: 260 * index,
                index,
            })}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            numColumns={2}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={
                <>
                    <SearchBar value={query} onChangeText={setQuery} />
                    <Text style={Styles.TextTitle}>
                        {query.trim() ? "Resultados da busca" : "Todos os produtos"}
                    </Text>
                    <Text style={Styles.TextSubtitle}>
                        {query.trim()
                            ? `Exibindo resultados para "${query}"`
                            : "Explore nosso catálogo completo"}
                    </Text>
                </>
            }
        />
    );
}
