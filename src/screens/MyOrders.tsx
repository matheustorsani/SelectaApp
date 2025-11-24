import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Styles } from "../styles/Styles";
import { OrderSituation } from "../components/OrderSituation";
import { useUser } from "../hook/useUser";
import { Product } from "../types/Products";
import { getProductById } from "../services/api/products/getProductById";
import { Error } from "../components/Error";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";

export const MyOrders = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useUser();
    const navigation = useNavigation<RootStackNavigationProp>()

    if (!user) return Error({ error: "Você precisa estar logado para ver seus pedidos.", retryText: "Ir para o Login", onPress: () => navigation.navigate("Login") });


    useEffect(() => {
        const fetchAllProducts = async () => {
            if (!user?.orders || user.orders.length === 0) return setProducts([]);

            try {
                const promises = user.orders.map(id => getProductById(id));
                const results = await Promise.all(promises);
                const validProducts = results.flat().filter(Boolean) as Product[];
                setProducts(validProducts);
            } catch (error) {
                console.error("deu pau...", error);
                setProducts([]);
            }
        };

        fetchAllProducts();
    }, [user.orders]);
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false} style={Styles.Main}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }} onPress={() => navigation.navigate("OrderStatus")}>Pedidos Recentes</Text>
            <View style={{ marginTop: 16, gap: 16 }}>
                {products.length > 0 ? (
                    products.map(item => (
                        <OrderSituation
                            key={item.id}
                            order={`PED-${new Date().getFullYear()}-00${item.id}`}
                            data={"2025-09-15"}
                            situation={"Entregue"}
                            trackingCode={"TRK123456789BR"}
                            item={item}
                        />
                    ))
                ) : (
                    <Text>Você não possui pedidos recentes.</Text>
                )}
            </View>
        </ScrollView>
    );
}
