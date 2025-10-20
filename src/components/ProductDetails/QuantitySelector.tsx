import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

type Props = {
  amount: number;
  onToggle: (increment: boolean) => void;
};

export const QuantitySelector = ({ amount, onToggle }: Props) => (
  <View
    style={{
      marginTop: 16,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#ddd",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
    }}
  >
    <Text>Quantidade:</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={{ padding: 8, backgroundColor: "#ddd", borderRadius: 4 }}
        onPress={() => onToggle(false)}
      >
        <Text style={{ fontWeight: "bold" }}>-</Text>
      </TouchableOpacity>

      <Text style={{ marginHorizontal: 16, fontSize: 18 }}>{amount}</Text>

      <TouchableOpacity
        style={{ padding: 8, backgroundColor: "#ddd", borderRadius: 4 }}
        onPress={() => onToggle(true)}
      >
        <Text style={{ fontWeight: "bold" }}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);
