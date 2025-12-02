import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-paper";

interface Props {
    onAdd: () => void;
    onBuy: () => void;
    disable?: boolean;
}

export const ProductOptions = ({ onAdd, onBuy, disable }: Props) => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
            <Button
                loading={disable}
                textColor={"#005FDB"}
                mode="contained"
                elevation={1}

                style={{
                    backgroundColor: "#f4f4f4ff",
                    borderRadius: 8,
                    paddingVertical: 8,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={onAdd}>
                <Text style={{ color: "#000", fontWeight: "600", fontSize: 13 }}>Adicionar ao Carrinho</Text>
            </Button>

            <Button
                mode="contained"
                style={{
                    backgroundColor: "#007bff",
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 1
                }}
                onPress={onBuy}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Comprar Agora</Text>
            </Button>
        </View>
    );
};
