import React from "react";
import { View, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Styles } from "../styles/Styles";
import { OrderSituation } from "../components/OrderSituation";
import { useUser } from "../hook/useUser";
import { useProducts } from "../hook/useProducts";

export const MyOrders = ({ navigation }: NativeStackScreenProps<any>) => {
    const { user } = useUser();
    const { products, loadProducts } = useProducts();
    loadProducts();
    
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false} style={Styles.Main}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Pedidos Recentes</Text>
            <View style={{ marginTop: 16, gap: 16 }}>
                {user?.orders && user.orders.length > 0 ? (
                    user.orders.map((orderId) => (
                        <OrderSituation
                            key={orderId}
                            order={"orderId"}
                            data={"2024-06-15"}
                            situation={"Entregue"}
                            trackingCode={"TRK123456789BR"}
                            item={products?.find((p) => p.id === orderId) ?? undefined}
                        />
                    ))
                ) : (
                    <Text>Você não possui pedidos recentes.</Text>
                )}
            </View>
        </ScrollView>
    );
}