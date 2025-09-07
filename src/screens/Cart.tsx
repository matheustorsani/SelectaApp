import React from "react";
import { View, Text } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Styles } from "../styles/Styles";
import Icon from 'react-native-vector-icons/Feather';
import { user } from "../data/User";
import { Product, products } from "../data/Products";
import { ProductCard } from "../components/ProductCard";

export default function Cart() {
    const total = user.cart && user.cart.length > 0
        ? user.cart
            .map(id => {
                const product = products.find(p => p.id === id);
                if (!product) return 0;
                const discount = product.discount ? product.price * (product.discount / 100) : 0;
                return product.price - discount;
            }).reduce((acc, price) => acc + price, 0).toFixed(2) : '0.00';   
        
        return (
        <GestureHandlerRootView style={{ flex: 1, padding: 16, paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Icon name="shopping-cart" size={27} color="#0063E6" />
                    <Text style={Styles.TextTitle}>Meu Carrinho</Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                        marginBottom: 20,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        borderRadius: 8,
                        padding: 15,
                        width: '100%',
                        backgroundColor: '#F1F5F9',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={{ color: "#64748B" }}>{user.cart && user.cart.length || 0} Itens no carrinho</Text>
                    <Text style={{ color: "#020817", fontWeight: '900' }}>R$ {total}</Text>
                </View>
                {user.cart && user.cart.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={user.cart
                            .map(id => products.find(p => p.id === id))
                            .filter((item): item is Product => !!item)}
                        keyExtractor={item => item.id.toString()}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
                    />
                ) : (
                    <Text style={{ color: "#64748B" }}>Seu carrinho está vazio.</Text>
                )}
         </GestureHandlerRootView>
    );
}