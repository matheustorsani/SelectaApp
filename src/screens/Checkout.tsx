import React, { useEffect, useState, useContext } from "react";
import { Text, View, Platform, Image } from "react-native";
import { Card, TextInput, RadioButton, Button } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { CardHeader } from "../components/Headers/CardHeader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Product } from "../types/Products";
import { RootStackScreenProps } from "../types/Navigation";
import { useCart } from "../hook/useCart";


export const Checkout = ({ route }: RootStackScreenProps<"Checkout">) => {
    const buyNowProduct = route.params?.buyNowProduct;

    const { cartProducts, reloadCart } = useCart();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (buyNowProduct) {
                setProducts([buyNowProduct]);
                setLoading(false);
                return;
            }

            await reloadCart();
            setProducts(cartProducts);
            setLoading(false);
        };

        load();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#475569" }}>Carregando resumo do pedido...</Text>
            </View>
        );
    }

    const subtotal = products
        .reduce((acc, product) => {
            const discount = product.discount ? product.price * (product.discount / 100) : 0;
            return acc + (product.price - discount) * (buyNowProduct ? route.params?.amount : product.amount ?? 1);
        }, 0)
        .toFixed(2);

    return (
        <KeyboardAwareScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            extraScrollHeight={Platform.OS == "ios" ? 80 : 60}
            enableOnAndroid
        >
            <Card style={{ ...Styles.Card, borderRadius: 12, elevation: 2, borderColor: '#e2e8f0', borderWidth: 1, backgroundColor: '#fff' }}>
                <Card.Content>
                    <CardHeader name="Resumo do Pedido" icon="shopping-bag" />

                    {products.map((item) => {
                        const finalPrice = item.discount
                            ? item.price - item.price * (item.discount / 100)
                            : item.price;

                        return (
                            <View
                                key={item.id}
                                style={{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    marginBottom: 15,
                                    paddingBottom: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#f1f5f9'
                                }}
                            >
                                <Image
                                    source={{ uri: item.mainImage }}
                                    style={{ width: 60, height: 70, marginRight: 15, borderRadius: 6, backgroundColor: '#f8fafc' }}
                                    resizeMode="contain"
                                />

                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b' }}>
                                        {item.name}
                                    </Text>

                                    <Text style={{ color: "#64748B", fontSize: 13, marginVertical: 2 }}>
                                        Quantidade: {buyNowProduct ? route.params?.amount : item.amount ?? 1}
                                    </Text>

                                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#000' }}>
                                        R$ {finalPrice.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                        <Text style={{ color: "#64748B", fontSize: 15 }}>Subtotal</Text>
                        <Text style={{ color: "#64748B", fontWeight: "600", fontSize: 15 }}>R$ {subtotal}</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: "#e0e0e0" }}>
                        <Text style={{ color: "#64748B", fontSize: 15 }}>Frete</Text>
                        <Text style={{ color: "#0063E6", fontWeight: "700", fontSize: 15 }}>Gratuito</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                        <Text style={{ fontWeight: '800', fontSize: 18, color: '#1e293b' }}>Total:</Text>
                        <Text style={{ fontSize: 18, fontWeight: '800', color: '#000' }}>R$ {subtotal}</Text>
                    </View>
                </Card.Content>
            </Card>

            <Card style={{ ...Styles.Card, borderRadius: 12, elevation: 2, borderColor: '#e2e8f0', borderWidth: 1, backgroundColor: '#fff' }}>
                <Card.Content style={{ alignItems: 'center' }}>
                    <CardHeader name="Endereço de Entrega" icon="map-pin" />

                    <View style={{ width: '100%', gap: 8 }}>
                        <TextInput label="Nome*" mode="outlined" style={{ backgroundColor: "#fff" }} />
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TextInput label="Endereço*" mode="outlined" style={{ flex: 1, backgroundColor: "#fff" }} />
                            <TextInput label="Número*" mode="outlined" style={{ width: "30%", backgroundColor: "#fff" }} />
                        </View>
                        <TextInput label="Complemento" mode="outlined" style={{ backgroundColor: "#fff" }} />
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <TextInput label="Estado*" mode="outlined" style={{ flex: 1, backgroundColor: "#fff" }} />
                            <TextInput label="Cidade*" mode="outlined" style={{ flex: 1, backgroundColor: "#fff" }} />
                        </View>
                    </View>
                </Card.Content>
            </Card>

            <Card style={{ ...Styles.Card, borderRadius: 12, elevation: 2, borderColor: '#e2e8f0', borderWidth: 1, backgroundColor: '#fff' }}>
                <Card.Content>
                    <CardHeader name="Pagamento" icon="credit-card" />
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <RadioButton color="#0063E6" value="Pix" status="checked" />
                        <Text style={{ fontSize: 16, color: '#1e293b' }}>Pix</Text>
                    </View>
                </Card.Content>
            </Card>

            <Button
                mode="contained"
                labelStyle={{ fontSize: 18, fontWeight: "700" }}
                style={{ backgroundColor: "#0063E6", borderRadius: 10, marginTop: 10}}
                onPress={() => { }}
            >
                Finalizar Pedido
            </Button>
        </KeyboardAwareScrollView>
    );
};
