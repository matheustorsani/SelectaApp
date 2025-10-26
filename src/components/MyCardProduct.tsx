import { useNavigation } from "@react-navigation/native";
import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";

type CardProps = {
    name: string;
    category: string;
    price: string;
    image: any;
    rating: number;
    totalRatings: number;
}

export const MyCardProduct = ({ name, category, image, price, rating, totalRatings }: CardProps) => {
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity activeOpacity={0.6} style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            borderWidth: 1,
            backgroundColor: "#fff",
            borderColor: "#E2E4E9",
            borderRadius: 10,
            marginBottom: 15
        }} onPress={() => navigation.navigate("EditProduct")}>
            <Image source={image} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 15 }} />
            <View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 250 }}>
                    <Text>{name}</Text>
                    <Icon name="edit" size={16}/>
                </View>
                <Text style={{ color: "#6C7493" }}>{category}</Text>
                <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                    <Icon name="star" size={14} color="#F97A1F" />
                    <Text>{rating}</Text>
                    <Text style={{ color: "#000", backgroundColor: "#F0F2F5", borderRadius: 8, fontWeight: "bold", paddingHorizontal: 10, paddingVertical: 2 }}>{totalRatings} Avalições</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 5, color: "#1D77ED" }}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
}