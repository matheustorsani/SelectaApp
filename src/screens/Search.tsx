import React, { useState, useMemo } from "react";
import { Text, FlatList } from "react-native";
import { products, Product } from "../data/Products";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { SearchBar } from "../components/SearchBar";

export default function Search() {
    const [query, setQuery] = useState("");

    const filteredProducts = useMemo(() => {
        return products.filter((product: Product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={
                <>
                    <SearchBar value={query} onChangeText={setQuery} />
                    <Text style={Styles.TextTitle}>Todos os produtos</Text>
                    <Text style={Styles.TextSubtitle}>Explore nosso catalogo completo</Text>
                </>
            }
        />
    );
}
