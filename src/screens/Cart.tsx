import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Styles } from "../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import { useUser } from "../hook/useUser";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hook/useProducts";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";
import { Error } from "../components/Error";

export default function Cart() {
    const { user } = useUser();
    const { products } = useProducts();

    const navigation = useNavigation<RootStackNavigationProp>();

    if (!user) return Error({ error: "Você precisa estar logado para ver o carrinho.", retryText: "Ir para o Login", onPress: () => navigation.navigate("Login") });

    const cartProducts = (user.cart ?? [])
        .map((id) => products.find((p) => p.id === id))
        .filter((item): item is typeof products[0] => !!item);

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
            contentContainerStyle={{ paddingBottom: 30 }}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("ProductDetails", { productId: item.id })}
                >
                    <ProductCard key={item.id} item={item} />
                </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
                <View style={{ marginBottom: 16, paddingBottom: 10 }}>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Icon name="shopping-cart" size={26} color="#0063E6" />
                            <Text style={{ fontSize: 22, fontWeight: "700", color: '#1e293b' }}>
                                Meu Carrinho
                            </Text>
                        </View>

                        <TouchableOpacity
                            disabled={cartProducts.length === 0}
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 15,
                                borderRadius: 20,
                                backgroundColor: '#EBF5FF',
                            }}
                            onPress={() => navigation.navigate("Checkout")}
                        >
                            <Text style={{
                                color: cartProducts.length > 0 ? "#0063E6" : "#94a3b8",
                                fontWeight: "700",
                                fontSize: 14,
                            }}>
                                Pagar ({cartProducts.length})
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: "#e2e8f0",
                            borderRadius: 10,
                            padding: 18,
                            backgroundColor: "#f8fafc",
                            justifyContent: "space-between",
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.05,
                            shadowRadius: 2,
                            elevation: 1,
                        }}
                    >
                        <Text style={{ color: "#475569", fontSize: 16 }}>Total de itens</Text>
                        <Text style={{ color: "#020817", fontWeight: "bold", fontSize: 20 }}>
                            R$ {total}
                        </Text>
                    </View>

                    {cartProducts.length === 0 && (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 40,
                            padding: 20,
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#e2e8f0',
                        }}>
                            <Icon name="frown" size={50} color="#cbd5e1" style={{ marginBottom: 10 }} />
                            <Text style={{ color: "#64748B", fontSize: 16, textAlign: 'center' }}>
                                Seu carrinho está vazio. Adicione alguns produtos!
                            </Text>
                        </View>
                    )}
                </View>
            )}
        />
    );
}
