import React, { useState, useMemo } from "react";
import { Text, FlatList, RefreshControl, View } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { Styles } from "../styles/Styles";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hook/useProducts";
import { debounce } from "../utils/debounce";
import { Error } from "../components/Error";
import Icon from "react-native-vector-icons/Feather";

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

    const isSearching = query.trim().length > 0;

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
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} colors={['#0063E6']}/>}
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
            ListEmptyComponent={
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 30,
                    marginTop: 30,
                    minHeight: 200,
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#E2E8F0',
                    marginHorizontal: 16,
                }}>
                    <Icon name="search" size={50} color="#CBD5E1" style={{ marginBottom: 15 }} />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: '#334155',
                        marginBottom: 8,
                        textAlign: 'center',
                    }}>
                        {isSearching ? "Nenhum resultado encontrado" : "Nenhum produto disponível"}
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#64748B',
                        textAlign: 'center',
                    }}>
                        {isSearching ? "Tente buscar por termos diferentes." : "O catálogo está vazio no momento."}
                    </Text>
                </View>
            }
            ListHeaderComponent={
                <View style={{ marginBottom: 10 }}>
                    <SearchBar value={query} onChangeText={handleChangeText} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 4,
                    }}>
                        <Icon name={isSearching ? "tag" : "grid"} size={20} color="#0063E6" />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#1e293b'
                        }}>
                            {isSearching ? "Resultados da Busca" : "Catálogo de Produtos"}
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 14,
                        color: '#64748B',
                        marginBottom: 10,
                    }}>
                        {isSearching
                            ? `Exibindo ${products.length} resultados para "${query}"`
                            : "Explore nosso catálogo completo"
                        }
                    </Text>

                    {products.length > 0 && (
                        <View style={{
                            height: 1,
                            backgroundColor: '#F1F5F9',
                            marginBottom: 10
                        }} />
                    )}
                </View>
            }
        />
    );
}
