import React from "react";
import { Text, View, Platform, Image } from "react-native";
import { Card, TextInput, RadioButton, Button } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { CardHeader } from "../components/Headers/CardHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const Checkout = () => {
    return (
        <KeyboardAwareScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            extraScrollHeight={Platform.OS == "ios" ? 80 : 60}
            enableOnAndroid
            keyboardOpeningTime={0}
        >
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Resumo do pedido" icon="motorcycle" />
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Image source={require("../../assets/smartphone.png")} style={{ width: 60, height: 70 }} />
                        <View>
                            <Text>Produto 1</Text>
                            <Text style={{ color: "#707070ff" }}>Quantidade: 1</Text>
                            <Text>R$ 199,99</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, borderTopWidth: 1, borderTopColor: "#e0e0e0", paddingTop: 10 }}>
                        <Text style={{ color: "#707070ff" }}>Subtotal</Text>
                        <Text style={{ color: "#707070ff", fontWeight: "600" }}>R$ 199,99</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", paddingBottom: 10 }}>
                        <Text style={{ color: "#707070ff" }}>Frete</Text>
                        <Text style={{ color: "#707070ff", fontWeight: "600" }}>Gratuito</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontWeight: 700 }}>Total:</Text>
                        <Text style={{ fontSize: 14, fontWeight: 700 }}>R$ 199,99</Text>
                    </View>
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Endereço de entrega" icon="map-pin" />
                    <TextInput
                        label={"Nome*"}
                        placeholder="Digite o seu nome completo"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        style={{ marginBottom: 8, alignSelf: "center", width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                        activeOutlineColor="#1D77ED"
                    />
                    <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
                        <TextInput
                            label={"Endereço*"}
                            placeholder="Rua das Flores"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: 148, borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                        />
                        <TextInput
                            label={"Número*"}
                            placeholder="123"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: 148, borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                        />
                    </View>
                    <TextInput
                        label={"Complemento"}
                        placeholder="Bloco 4 Apt. 404"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        style={{ marginBottom: 8, width: 300, alignSelf: "center", borderRadius: 5, backgroundColor: "#fff" }}
                        activeOutlineColor="#1D77ED"
                    />
                    <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
                        <TextInput
                            label={"Estado*"}
                            placeholder="São Paulo"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: 148, borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                        />
                        <TextInput
                            label={"Cidade*"}
                            placeholder="São Paulo"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: 148, borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                        />
                    </View>
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Pagamento" icon="credit-card" />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <RadioButton color="blue" value="Pix" status="checked" />
                        <Text>Pix</Text>
                    </View>
                </Card.Content>
            </Card>
            <Button mode="contained" style={{ backgroundColor: "#0063E6" }}>
                Finalizar Pedido
            </Button>
        </KeyboardAwareScrollView>
    );
}