import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { products, Product } from "../data/Products";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";

export default function Favorites() {
    const { favorites } = useFavorites();

    const favoriteProducts: Product[] = products.filter(p => favorites.includes(p.id));

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.title}>Meus Favoritos</Text>
            {favoriteProducts.length === 0 ? (
                <Text style={styles.empty}>Você ainda não salvou nenhum produto.</Text>
            ) : (
                <>
                    <Text style={Styles.TextSubtitle}>
                        {favoriteProducts.length === 1
                            ? "1 Produto Salvo"
                            : `${favoriteProducts.length} Produtos Salvos`}
                    </Text>
                    <FlatList
                        data={favoriteProducts}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={{ padding: 16 }}
                        renderItem={({ item }) => <ProductCard item={item} />}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 16,
        marginBottom: 0,
    },
    empty: {
        margin: 16,
        fontSize: 14,
        color: "gray",
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
});
