import { useNavigation } from "@react-navigation/native";
import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";

type CardProps = {
    /** Nome do produto */
    name: string;
    /** Categoria do Produto */
    category: string;
    /** Preço do produto */
    price: string;
    /** Imagem do produto */
    image: any;
    /** Avaliação do produto */
    rating: number;
    /** Total de avaliações do produto */
    totalRatings: number;
}

/**
 * Componente de cartão de produto para a tela "Meus Produtos".
 * @param {CardProps} props - Propriedades do cartão de produto, incluindo nome, categoria, preço, imagem, avaliação e total de avaliações.
 * @returns Componente de cartão de produto para a tela "Meus Produtos".
 */
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
                    <Text style={{ color: "#000", backgroundColor: "#F0F2F5", borderRadius: 8, fontWeight: "bold", paddingHorizontal: 10, paddingVertical: 2 }}>{totalRatings} Avaliações</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 5, color: "#1D77ED" }}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
}