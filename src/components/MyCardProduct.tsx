import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootStackNavigationProp } from "../types/Navigation";
import { getProductById } from "../services/api/products/getProductById";
import { Product } from "../types/Products";
import { LoadingSkeletonProduct } from "./LoadingSkeletonProduct";
import IconFE from "react-native-vector-icons/Feather";

type CardProps = {
    productId: number;
    name: string;
    price: number;
    rate?: number;
    totalRatings?: number;
    image?: string;
};

export const MyCardProduct = ({ productId, name, price, rate = 0, totalRatings = 0, image }: CardProps) => {
    const navigation = useNavigation<RootStackNavigationProp>();

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

            {image ? (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 65,
                        height: 65,
                        borderRadius: 12,
                        backgroundColor: "#F0F2F5",
                    }}
                />
            ) : (
                <View
                    style={{
                        backgroundColor: "#F3F4F6",
                        padding: 12,
                        borderRadius: 12,
                    }}
                >
                    <IconFE name="package" size={22} color="#6C7493" />
                </View>
            )}

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
                        {name}
                    </Text>

                    <Icon name="edit" size={16} color="#4B5563" />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 4,
                    }}
                >
                    <Icon name="star" size={15} color="#F97A1F" />
                    <Text style={{ color: "#333" }}>{rate}</Text>

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
                        {totalRatings} Avaliações
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
                    R$ {price}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
