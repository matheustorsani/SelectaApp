import React from "react";
import { View, Text, FlatList } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { products, Product } from "../data/Products";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Favorites() {
    const { favorites } = useFavorites();

    const favoriteProducts: Product[] = products.filter(p => favorites.includes(p.id));

    return (
        <GestureHandlerRootView style={{ flex: 1, padding: 16, paddingBottom: 0 }}>
            <View>
                <Text style={Styles.title}>Meus Favoritos</Text>
                <Text style={Styles.TextSubtitle}>
                    {favoriteProducts.length === 1
                        ? "1 Produto Salvo"
                        : favoriteProducts.length > 1
                            ? `${favoriteProducts.length} Produtos Salvos`
                            : "Nenhum Produto Salvo"}
                </Text>
            </View>
            
            {favorites.length && (
                <FlatList
                    data={favoriteProducts}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ProductCard item={item} />}
                />
            )}
        </GestureHandlerRootView >
    );
}
