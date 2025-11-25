import React from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { Styles } from "../styles/Styles";
import { Button, Card, ProgressBar } from "react-native-paper";
import { CardHeader } from "../components/Headers/CardHeader";
import { Status } from "../components/Status";

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
                        <Status checked={true} title="Pedido confirmado" subtitle="15/09/2025, 10:30:12" />
                        <Status checked={true} title="Pedido separado" subtitle="15/09/2025, 10:45:23" />
                        <Status checked={true} title="Saiu para entrega" subtitle="15/09/2025, 10:50:54" />
                        <Status checked={false} title="Entregue" />
                    </View>
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Endereço de Entrega" icon="location-arrow" />
                    <Text>Rua das flores</Text>
                    <Text style={{ color: "#8a8a8aff" }}>São Paulo, SP</Text>
                    <Text style={{ color: "#8a8a8aff" }}>01234-567</Text>
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Itens do Pedido" />
                    <View style={{ flexDirection: "row" }}>
                        <Image source={require("../../assets/smartphone.png")} style={{ width: 60, height: 70 }} />
                        <View>
                            <Text>Produto 1</Text>
                            <Text style={{ color: "#707070ff" }}>Quantidade: 1</Text>
                            <Text>R$ 199,99</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderColor: "#E2E4E9", paddingVertical: 10 }}>
                        <Text style={{ fontWeight: "bold" }}>Total</Text>
                        <Text style={{ fontWeight: "bold" }}>R$ 199,99</Text>
                    </View>

                </Card.Content>
            </Card>
            <Button onPress={() => undefined} elevation={5} textColor="#000" style={{ backgroundColor: "#FCFCFD", borderWidth: 1, borderColor: "#E2E4E9" }}>
                Abrir ticket de Suporte
            </Button>
        </ScrollView>
    );
}