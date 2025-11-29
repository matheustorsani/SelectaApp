import React, { useState } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import { ProductCard } from "../components/ProductCard";
import { useUser } from "../hook/useUser";
import { RootStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "../hook/useFavorites";
import { Error } from "../components/Error";

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

    if (!user) return Error({ error: "Você precisa estar logado para ver os favoritos.", retryText: "Ir para o Login", onPress: () => navigation.navigate("Login") });

    const numFavorites = favoriteProducts.length;

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
            ListHeaderComponent={
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: numFavorites > 0 ? 'space-between' : 'flex-start',
                    paddingVertical: 10,
                    marginBottom: 10,
                    borderBottomWidth: numFavorites > 0 ? 1 : 0,
                    borderBottomColor: '#F1F5F9',
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Icon name="heart" size={24} color="#E74C3C" />
                        <Text style={{ fontSize: 22, fontWeight: "700", color: '#1e293b' }}>
                            Meus Favoritos
                        </Text>
                    </View>
                    {numFavorites > 0 && (
                        <View style={{
                            backgroundColor: '#F1F5F9',
                            paddingVertical: 4,
                            paddingHorizontal: 8,
                            borderRadius: 15,
                        }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748B' }}>
                                {numFavorites} {numFavorites === 1 ? 'item' : 'itens'}
                            </Text>
                        </View>
                    )}
                </View>
            }
            ListEmptyComponent={
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 30,
                    marginTop: 50,
                    minHeight: 300,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#E2E8F0',
                }}>
                    <Icon name="heart" size={60} color="#CBD5E1" style={{ marginBottom: 20, opacity: 0.7 }} />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#334155',
                        marginBottom: 8,
                        textAlign: 'center',
                    }}>
                        Sua lista de favoritos está vazia.
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#64748B',
                        textAlign: 'center',
                    }}>
                        Adicione produtos que você amou para encontrá-los facilmente aqui!
                    </Text>
                </View>
            }
        />
    );
}
