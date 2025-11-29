import React from "react";
import { View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Product } from "../../types/Products";

interface Props { product: Product };

/**
 * Cabeçalho do componente de detalhes do produto.
 * Exibe a imagem do produto, avaliação em estrelas e nome.
 * 
 * @param {Props} props - Produto em si, confira em types/Products.
 * @returns Componente de cabeçalho do produto.
 */
export const ProductHeader = ({ product }: Props) => (
  <View>
    <View style={{ position: "relative" }}>
      {product.mainImage || product.image ? (
        <Image
          source={{ uri: product.mainImage || product.image }}
          style={{
            width: "100%",
            height: 340,
            borderRadius: 0,
            backgroundColor: "#eee",
          }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: "100%",
            height: 340,
            backgroundColor: "#eee",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#666", fontSize: 16 }}>Sem Imagem</Text>
        </View>
      )}

      {product.discount && (
        <View
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "#FF5252",
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            -{product.discount}%
          </Text>
        </View>
      )}
    </View>

    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, paddingHorizontal: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name={i < (product.rate ?? 0) ? "star" : "star-o"}
          size={18}
          color="#FFD700"
          style={{ marginRight: 2 }}
        />
      ))}
      <Text style={{ color: "#777", marginLeft: 6 }}>
        {product.rate} ({product.totalRatings})
      </Text>
    </View>

    <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 6, paddingHorizontal: 16 }}>
      {product.name}
    </Text>
  </View>
);
