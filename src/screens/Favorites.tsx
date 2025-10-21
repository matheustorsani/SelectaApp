import React, { useState, useMemo } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import { ProductCard } from "../components/ProductCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUser } from "../hook/useUser";
import { useProducts } from "../hook/useProducts";

export default function Favorites({ navigation }: NativeStackScreenProps<any>) {
    const { user, toggleFavorite, isFavorite } = useUser();
    const { products, loadProducts, loading, error } = useProducts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    };

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Entre ou se cadastre!</Text>
                <Text
                    style={{ color: "blue", marginTop: 10 }}
                    onPress={() => navigation.navigate("Login")}
                >
                    Ir para Login/Cadastro
                </Text>
            </View>
        );
    }

    const favoriteProducts = useMemo(() => {
        if (!user || products.length === 0) return [];

        return (user.favorites ?? [])
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is typeof products[0] => !!p);

    }, [user, products]);

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={favoriteProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    onToggleFavorite={() => toggleFavorite(item.id)}
                    isFavorite={isFavorite(item.id)}
                />
            )}
            ListHeaderComponent={() =>
                favoriteProducts.length > 0 ? (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 16,
                        }}
                    >
                        <Icon name="heart" size={27} color="#0063E6" />
                        <Text style={Styles.TextTitle}>Meus Favoritos</Text>
                    </View>
                ) : (
                    <Text style={{ color: "#64748B", marginBottom: 16 }}>
                        Você ainda não favoritou um item.
                    </Text>
                )
            }
            ListEmptyComponent={
                loading ? (
                    <Text>Carregando...</Text>
                ) : error ? (
                    <Text style={{ color: "red" }}>{error}</Text>
                ) : null
            }
        />
    );
}
