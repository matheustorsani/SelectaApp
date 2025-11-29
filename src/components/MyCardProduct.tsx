import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackNavigationProp } from "../types/Navigation";
import { getProductById } from "../services/api/products/getProductById";
import { Product } from "../types/Products";
import { LoadingSkeletonProduct } from "./LoadingSkeletonProduct";

type CardProps = {
    productId: number;
};

export const MyCardProduct = ({ productId }: CardProps) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getProductById(productId);
                setProduct(data.id ? data : undefined);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [productId]);

    if (loading) return <LoadingSkeletonProduct />;
    if (!product) return null;

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                borderWidth: 1,
                backgroundColor: "#fff",
                borderColor: "#E2E4E9",
                borderRadius: 14,
                marginBottom: 16,
                gap: 14,
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 1 },
                elevation: 3,
            }}
            onPress={() => navigation.navigate("EditProduct", { productId })}
        >
            
            <Image
                source={
                    product.image
                        ? { uri: product.image }
                        : require("../../assets/smartphone.png")
                }
                style={{
                    width: 65,
                    height: 65,
                    borderRadius: 12,
                    backgroundColor: "#F0F2F5",
                }}
            />

            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 15,
                            fontWeight: "600",
                            maxWidth: 210,
                        }}
                    >
                        {product.name}
                    </Text>

                    <Icon name="edit" size={16} color="#4B5563" />
                </View>

                <Text style={{ color: "#6C7493", marginTop: 2 }}>
                    {product.category}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                    }}
                >
                    <Icon name="star" size={15} color="#F97A1F" />
                    <Text style={{ color: "#333" }}>{product.rate}</Text>

                    <Text
                        style={{
                            color: "#000",
                            backgroundColor: "#F0F2F5",
                            borderRadius: 8,
                            fontWeight: "600",
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            fontSize: 11,
                        }}
                    >
                        {product.totalRatings} Avaliações
                    </Text>
                </View>

                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        marginTop: 6,
                        color: "#1D77ED",
                    }}
                >
                    R$ {product.price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
