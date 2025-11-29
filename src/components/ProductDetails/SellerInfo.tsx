import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconO from "react-native-vector-icons/Octicons";
import { getUserById } from "../../services/api/client/getUserById";

interface Props {
  seller: number;
}

/**
 * @returns Componente que exibe informações do vendedor do produto.
 */
export const SellerInfo = ({ seller }: Props) => {
  const [sellerInfo, setSeller] = useState<any>(null);

  useEffect(() => {
    getUserById(seller).then((data) => {
      setSeller(data);
    });
  }, [seller])

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 14,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: "#fafafa",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Text style={{ color: "#6C7493" }}>
          Vendido por: <Text style={{ color: "#000" }}>{sellerInfo?.nome || "Buscando..."}</Text>
        </Text>
        <IconO name="verified" size={12} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4, gap: 5 }}>
        <Icon name="star" color="#FFD700" size={13} />
        <Text>5</Text>
      </View>
    </View >
  );
}