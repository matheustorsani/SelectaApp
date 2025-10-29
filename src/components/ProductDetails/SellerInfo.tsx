import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconO from "react-native-vector-icons/Octicons";

/**
 * @returns Componente que exibe informações do vendedor do produto.
 */
export const SellerInfo = () => (
  <View
    style={{
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 8,
      marginBottom: 16,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Text style={{ color: "#6C7493" }}>
        Vendido por: <Text style={{ color: "#000" }}>Livraria do Harry</Text>
      </Text>
      <IconO name="verified" size={12} />
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 5 }}>
      <Icon name="star" color="#FFD700" size={13} />
      <Text>5</Text>
    </View>
  </View>
);
