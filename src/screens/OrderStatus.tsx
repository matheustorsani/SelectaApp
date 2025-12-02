import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Styles } from "../styles/Styles";
import { Button, Card, ProgressBar } from "react-native-paper";
import { CardHeader } from "../components/Headers/CardHeader";
import { Status } from "../components/Status";
import { useRoute } from "@react-navigation/native";

export const OrderStatus = () => {
    const route = useRoute<any>();
    const { order } = route.params;

    const date = new Date(order.dataPedido).toLocaleDateString("pt-BR");

    const progressMap: Record<string, number> = {
        pendente: 0.25,
        processando: 0.45,
        enviado: 0.7,
        entregue: 1,
    };

    const status: Record<string, string> = {
        pendente: "Pagamento pendente",
        processando: "Processando pedido",
        enviado: "Em trânsito",
        entregue: "Entregue",
    };

    const progress = progressMap[order.statusPagamento] ?? 0.25;

    return (
        <ScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Status do Pedido" icon="inbox" />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 25,
                                borderWidth: 1,
                                padding: 2,
                                paddingHorizontal: 10,
                                fontWeight: "bold"
                            }}
                        >
                            {status[order.statusPagamento] || "Em análise"}
                        </Text>

                        <Text style={{ color: "gray", fontSize: 12 }}>
                            Pedido realizado em {date}
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text>Progresso da Entrega</Text>
                        <Text>{Math.round(progress * 100)}%</Text>
                    </View>

                    <ProgressBar
                        style={{ marginTop: 10, backgroundColor: "#F0F2F5", borderRadius: 26 }}
                        color="#1D77ED"
                        progress={progress}
                    />
                </Card.Content>
            </Card>

            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Histórico do Pedido" icon="clock" />
                    <View style={{ marginTop: 10, gap: 15 }}>
                        <Status checked={true} title="Pedido confirmado" subtitle={date} />
                        <Status checked={order.statusPagamento !== "pendente"} title="Pagamento aprovado" />
                        <Status checked={order.statusPagamento === "enviado" || order.statusPagamento === "entregue"} title="Saiu para entrega" />
                        <Status checked={order.statusPagamento === "entregue"} title="Entregue" />
                    </View>
                </Card.Content>
            </Card>

            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Endereço de Entrega" icon="map-pin" />
                    <Text>Endereço ainda não disponível</Text>
                </Card.Content>
            </Card>

            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Itens do Pedido" />
                    <Text style={{ color: "#707070" }}>
                        O backend ainda não envia os itens do pedido.
                    </Text>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopWidth: 1,
                        borderColor: "#E2E4E9",
                        paddingVertical: 10,
                        marginTop: 10
                    }}>
                        <Text style={{ fontWeight: "bold" }}>Total</Text>
                        <Text style={{ fontWeight: "bold" }}>R$ {order.total.toFixed(2)}</Text>
                    </View>
                </Card.Content>
            </Card>

            <Button
                disabled={true}
                elevation={5}
                textColor="#000"
                style={{
                    backgroundColor: "#FCFCFD",
                    borderWidth: 1,
                    borderColor: "#E2E4E9"
                }}
            >
                Abrir ticket de Suporte
            </Button>
        </ScrollView>
    );
};
