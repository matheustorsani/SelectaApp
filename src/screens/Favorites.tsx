import React, { useState } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import { ProductCard } from "../components/ProductCard";
import { useUser } from "../hook/useUser";
import { RootStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../hook/useFavorites";

export default function Favorites() {
    const { user } = useUser();
    const { favoriteProducts, toggleFavorite, isFavorite, reloadFavorites } = useFavorites();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<RootStackNavigationProp>();

    const onRefresh = async () => {
        setRefreshing(true);
        await reloadFavorites();
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

    return (
        <FlatList
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            data={favoriteProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <Icon name="heart" size={27} color="#0063E6" />
                        <Text style={Styles.TextTitle}>Meus Favoritos</Text>
                    </View>
                ) : (
                    <Text style={{ color: "#64748B", marginBottom: 16 }}>
                        Você ainda não favoritou um item.
                    </Text>
                )
            }
            ListEmptyComponent={<Text>{favoriteProducts.length === 0 ? "Nenhum favorito" : ""}</Text>}
        />
    );
}
