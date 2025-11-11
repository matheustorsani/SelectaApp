import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../styles/Styles";
import { MyProductsCard } from "../components/MyProductsCard";
import Icon from "react-native-vector-icons/Feather";
import { MyCardProduct } from "../components/MyCardProduct";

export const MyProducts = () => {
    // Por enquanto, não existe um endpoint onde retorna todos os produtos de um determinado usuario.
    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "column" }}>
                <MyProductsCard number={1} text="Ativos" color="#1D77ED" />
                <MyProductsCard number={23} text="Vendidos" color="#F97A1F" />
                <MyProductsCard number={"R$2.1k"} text="Faturamento" color="#21C45D" />
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                borderWidth: 1,
                borderColor: "#E2E4E9",
                borderRadius: 10,
                gap: 10,
                backgroundColor: "#1D77ED",
            }}>
                <Icon name="plus" color={"white"} />
                <Text style={{ color: "white" }}>Cadastrar novo produto</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>Meus produtos</Text>
            <View>
                <MyCardProduct
                    productId={1}
                />
            </View>
        </ScrollView>
    );
}
