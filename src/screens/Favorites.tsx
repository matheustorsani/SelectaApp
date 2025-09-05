import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { products, Product } from "../data/Products";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Favorites() {
    const { favorites } = useFavorites();

    const favoriteProducts: Product[] = products.filter(p => favorites.includes(p.id));

    return (
        <GestureHandlerRootView style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' }}>
            <View style={Styles.Main}>
                <Text style={Styles.title}>Meus Favoritos</Text>

                {favoriteProducts.length !== 0 ? (
                    <><Text style={Styles.TextSubtitle}>
                        {favoriteProducts.length === 1
                            ? "1 Produto Salvo"
                            : `${favoriteProducts.length} Produtos Salvos`}
                    </Text><FlatList
                            data={favoriteProducts}
                            keyExtractor={item => item.id.toString()}
                            numColumns={2}
                            columnWrapperStyle={Styles.row}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <ProductCard item={item} />} /></>
                ) :
                    <Text style={Styles.empty}>Você não possui produtos salvos.</Text>
            }
            </View>
        </GestureHandlerRootView>
    );
}
