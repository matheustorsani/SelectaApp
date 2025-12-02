import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Styles } from "../styles/Styles";
import { OrderSituation } from "../components/OrderSituation";
import { useUser } from "../hook/useUser";
import { Error } from "../components/Error";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";
import { orders } from "../services/api/client/orders";

export const MyOrders = () => {
    const [myOrders, setMyOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { user } = useUser();
    const navigation = useNavigation<RootStackNavigationProp>();

    if (!user)
        return Error({
            error: "Você precisa estar logado para ver seus pedidos.",
            retryText: "Ir para o Login",
            onPress: () => navigation.navigate("Login")
        });

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await orders();
                setMyOrders(res || []);
            } catch (error) {
                console.error("Erro ao carregar pedidos:", error);
                setMyOrders([]);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            style={Styles.Main}
        >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Pedidos Recentes</Text>

            <View style={{ marginTop: 16, gap: 16 }}>
                {myOrders.length > 0 ? (
                    myOrders.map((order) => (
                        <OrderSituation
                            key={order.idPedido}
                            order={`PED-${order.idPedido}`}
                            data={order.dataPedido}
                            situation={"Processando"}
                            trackingCode={"Indisponível"}
                            item={order}
                            onPress={() => navigation.navigate("OrderStatus", { order })}
                        />

                    ))
                ) : (
                    <Text>Você não possui pedidos recentes.</Text>
                )}
            </View>
        </ScrollView>
    );
};
