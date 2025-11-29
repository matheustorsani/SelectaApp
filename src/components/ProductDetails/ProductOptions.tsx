import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface Props {
    onAdd: () => void;
    onBuy: () => void;
}

export const ProductOptions = ({ onAdd, onBuy }: Props) => {
    return (
        <View style={{ flexDirection: "row", gap: 12, marginVertical: 15 }}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    padding: 16,
                    borderRadius: 8,
                    alignItems: "center",
                    elevation: 1
                }}
                onPress={onAdd}
            >
                <Text style={{ color: "#000", fontWeight: "600" }}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: "#007bff",
                    padding: 16,
                    borderRadius: 8,
                    elevation: 2,
                    alignItems: "center",
                }}
                onPress={onBuy}
            >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Comprar Agora</Text>
            </TouchableOpacity>
        </View>
    );
};
