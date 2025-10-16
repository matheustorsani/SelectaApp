import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hook/useProducts";
import { LoadingSkeletonItems } from "../components/LoadingSkeletonItems";
import { debounce } from "../utils/debounce";

export default function Search() {
    const { products, loading, loadProducts, search } = useProducts();
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const debouncedSearch = debounce(async (text: string) => {
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
        }, 500);

        debouncedSearch(query);
    }, [query, products]);

    useEffect(() => {
        if (!query.trim()) setFilteredProducts(products);
    }, [products, query]);

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
            numColumns={2}
            onEndReached={!query ? loadProducts : null}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
                loading || searching ? <LoadingSkeletonItems /> : <Text>Não há produtos.</Text>
            }
            getItemLayout={(_, index) => ({
                length: 260,
                offset: 260 * index,
                index,
            })}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={
                <>
                    <SearchBar value={query} onChangeText={setQuery} />
                    <Text style={Styles.TextTitle}>Todos os produtos</Text>
                    <Text style={Styles.TextSubtitle}>
                        Explore nosso catálogo completo
                    </Text>
                </>
            }
        />
    );
}
