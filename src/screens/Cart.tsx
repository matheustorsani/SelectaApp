// arrumar imports etc.
// foca no productdetail, cpa q da mais trabalho

import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Styles } from "../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import { useUser } from "../hook/useUser";
import { Product, products } from "../types/Products";
import { ProductCard } from "../components/ProductCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export default function Cart({ navigation }: NativeStackScreenProps<any>) {
    const { user } = useUser();

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

    const cartProducts = (user.cart ?? [])
        .map((id) => products.find((p) => p.id === id))
        .filter((item): item is Product => !!item);

    const total =
        cartProducts.length > 0
            ? cartProducts
                .map((product) => {
                    const discount = product.discount ? product.price * (product.discount / 100) : 0;
                    return product.price - discount;
                })
                .reduce((acc, price) => acc + price, 0)
                .toFixed(2)
            : "0.00";

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={cartProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={() => (
                <View style={{ marginBottom: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 15 }}>
                        <Icon name="shopping-cart" size={27} color="#0063E6" />
                        <Text style={Styles.TextTitle}>Meu Carrinho</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#ddd",
                            borderRadius: 8,
                            padding: 15,
                            backgroundColor: "#F1F5F9",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ color: "#64748B" }}>{cartProducts.length} Itens no carrinho</Text>
                        <Text style={{ color: "#020817", fontWeight: "900" }}>R$ {total}</Text>
                        
                    </View>

                    {cartProducts.length === 0 && (
                        <Text style={{ color: "#64748B", marginTop: 16 }}>Seu carrinho está vazio.</Text>
                    )}
                </View>
            )}
        />
    );
}
