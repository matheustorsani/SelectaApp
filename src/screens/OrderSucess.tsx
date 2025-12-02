import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";
import { Button } from "react-native-paper";

export const OrderSuccess = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
        }}>
            <View style={{
                width: 260,
                height: 260,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
            }}>
                <LottieView
                    source={require("../../assets/animation.json")}
                    autoPlay
                    loop={false}
                    style={{ width: 200, height: 200 }}
                />
            </View>

            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "800",
                    color: "#0f172a",
                    marginBottom: 8,
                }}
            >
                Pedido Confirmado!
            </Text>

            <Text
                style={{
                    fontSize: 15,
                    textAlign: "center",
                    color: "#475569",
                    marginBottom: 25,
                    paddingHorizontal: 20,
                }}
            >
                Sua compra foi realizada com sucesso!
            </Text>

            <Button
                mode="contained"
                style={{
                    backgroundColor: "#0063E6",
                    borderRadius: 10,
                    width: "80%",
                    paddingVertical: 5,
                }}
                labelStyle={{ fontSize: 16, fontWeight: "700" }}
                onPress={() => navigation.replace("MyOrders")}
            >
                Ir para Meus Pedidos agora
            </Button>
        </View>
    );
}
