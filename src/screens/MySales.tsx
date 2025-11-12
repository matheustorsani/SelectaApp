import React from "react";
import { Cards } from "../components/Cards";
import { ScrollView, View, Text } from "react-native";
import { Styles } from "../styles/Styles";
import { OptionCard } from "../components/OptionCard";

export const MySales = () => {
    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Cards number={3} text="Vendas" color="#1D77ED"  />
            <Cards number={"R$ 2.249,97"} text="Total" color="#21C45D" />
            <Cards number={4.6} text="Avaliação" color="#F97A1F" />
            <View style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between" }}>
                <OptionCard itens={2} bgColor="white" color="black" icon="trending-up" text="Relatórios" />
                <OptionCard itens={2} bgColor="white" color="black" icon="dollar-sign" text="Pagamentos" />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>Minhas vendas</Text>
            {/* Cards de vendas realizadas aparecerão aqui. */}
        </ScrollView>
    );
}