import React, { useState, useMemo } from "react";
import { Text, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hook/useProducts";
import { debounce } from "../utils/debounce";
import { Error } from "../components/Error";

export default function Search() {
    const { products, loading, loadProducts, search, error } = useProducts();
    const [query, setQuery] = useState("");

    const debouncedSearch = useMemo(
        () =>
            debounce((text: string) => {
                search(text);
            }, 600),
        [search]
    );

    const handleChangeText = (text: string) => {
        setQuery(text);
        debouncedSearch(text);
    };

    const onRefresh = async () => {
        await loadProducts();
    };

    if (error) return Error({ error, onPress: onRefresh, retryText: "Tentar Novamente" });

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={products}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            contentContainerStyle={{ paddingBottom: 40 }}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            onEndReached={loadProducts}
            onEndReachedThreshold={0.5}
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
                    <SearchBar value={query} onChangeText={handleChangeText} />
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
