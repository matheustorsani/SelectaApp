import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Product } from "../../types/Products";

type Props = { product: Product };

export const ProductHeader = ({ product }: Props) => (
  <View>
    <Image
      source={typeof product.image === "string" ? { uri: product.image } : product.image}
      style={{ width: "100%", height: 300, borderRadius: 8, marginBottom: 12 }}
    />
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name={i < (product.rate ?? 0) ? "star" : "star-o"}
          size={16}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      ))}
      <Text style={{ color: "gray", marginLeft: 6 }}>
        {product.rate ?? ""} ({product.totalRatings ?? ""})
      </Text>
    </View>
    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{product.name}</Text>
  </View>
);
