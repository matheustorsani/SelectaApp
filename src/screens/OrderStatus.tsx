import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { Styles } from "../styles/Styles";
import { Card, ProgressBar } from "react-native-paper";
import { CardHeader } from "../components/Headers/CardHeader";
import Icon from 'react-native-vector-icons/Feather';

export const OrderStatus = () => {
    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Status do Pedido" icon="inbox" />
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ backgroundColor: "#fff", borderRadius: 25, borderWidth: 1, padding: 2, paddingHorizontal: 10, fontWeight: 'bold' }}>Em transito</Text>
                        <Text style={{ color: "gray", fontSize: 12 }}>Pedido realizado em 15/09/2025</Text>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>Progresso da Entrega</Text>
                        <Text>70%</Text>
                    </View>
                    <ProgressBar style={{ marginTop: 10, backgroundColor: "#F0F2F5", borderRadius: 26 }} color="#1D77ED" progress={0.7} />
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Histórico de Pedidos" icon="clock-o" />
                    <View style={{ marginTop: 10, gap: 15 }}>
                        <Icon name="check-circle" size={20} color="green" />
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}