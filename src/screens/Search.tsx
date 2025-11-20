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

    if (error) return Error({ error, onPress: onRefresh });

    return (
        <FlatList
            style={Styles.Main}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            renderItem={({ item }) => <ProductCard item={item} />}
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
