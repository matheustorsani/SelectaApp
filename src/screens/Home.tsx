import React, { useState } from 'react';
import { Text, FlatList, RefreshControl, View } from 'react-native';
import { useProducts } from '../hook/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Styles } from '../styles/Styles';
import { LoadingSkeletonItems } from '../components/LoadingSkeletonItems';
import { Error } from '../components/Error';
import Icon from 'react-native-vector-icons/Feather';

export default function Home() {
    const { products, loading, loadProducts, error } = useProducts();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    };

    if (error) return Error({ error, onPress: onRefresh, retryText: "Tentar novamente" });

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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0063E6']} />}
            onEndReached={loadProducts}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
                loading ? <LoadingSkeletonItems /> :
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
                        <Icon name="alert-triangle" size={50} color="#CBD5E1" style={{ marginBottom: 15 }} />
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#334155',
                            marginBottom: 8,
                            textAlign: 'center',
                        }}>
                            Nenhum produto encontrado.
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#64748B',
                            textAlign: 'center',
                        }}>
                            Tente recarregar ou verificar sua conexão.
                        </Text>
                    </View>
            }
            getItemLayout={(data, index) => ({
                length: 260,
                offset: 260 * index,
                index,
            })}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingBottom: 15,
                    paddingTop: 5,
                    marginBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F1F5F9'
                }}>
                    <Icon name="star" size={24} color="#F59E0B" />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#1e293b'
                        }}>
                            Recomendado para Você
                        </Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#64748B'
                        }}>
                            Produtos baseados no seu perfil e histórico
                        </Text>
                    </View>
                </View>
            }
        />
    );
}
