import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Styles } from "../styles/Styles";
import { Cards } from "../components/Cards";
import { OptionCard } from "../components/OptionCard";
import { MyCardProduct } from "../components/MyCardProduct";
import { RootStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";

export const MyProducts = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    // Por enquanto, não existe um endpoint onde retorna todos os produtos de um determinado usuario.
    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "column" }}>
                <Cards number={1} text="Ativos" color="#1D77ED" />
            </View>
            <OptionCard itens={1} bgColor="blue" color="white" icon="plus" text="Adicionar novo produto" onPress={() => navigation.navigate("AddProduct")}/>
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>Meus produtos</Text>
            <View>
                <MyCardProduct
                    productId={1}
                />
            </View>
        </ScrollView>
    );
}
