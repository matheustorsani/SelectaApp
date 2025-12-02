import React, { useEffect, useState } from "react";
import { View, Text, Platform, ActivityIndicator } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from 'react-native-vector-icons/Feather';
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUser } from "../hook/useUser";
import { RootStackNavigationProp, RootStackScreenProps } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { getProductById } from "../services/api/products/getProductById";
import { editProduct } from "../services/api/products/editProduct";

// WIP

export const EditProduct = ({ route }: RootStackScreenProps<"EditProduct">) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const productId = route.params.productId;
    const { user } = useUser();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newStock, setNewStock] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);

    const getProduct = async () => {
        try {
            setLoadingPage(true);
            const product = await getProductById(productId);
            if (product) {
                setName(product.name);
                setDescription(product.description || "Sem Descrição");
                setPrice(product.price.toString());
                setStock(product.amount?.toString() || "1");
            }
        } catch (error) {
            console.error("Erro ao carregar produto:", error);
        } finally {
            setLoadingPage(false);
        }
    }
    const finishProduct = async () => {
        try {
            if (!user || !user.id) return;
            setLoading(true);

            await editProduct({
                idProduto: productId,
                nome: newName || name,
                descricao: newDescription || description,
                preco: parseFloat(newPrice) || parseFloat(price),
                quantidade: parseInt(newStock) || parseInt(stock),
            });
            setLoading(false);
            navigation.reset({
                index: 1,
                routes: [{ name: "Tabs" }, { name: "MyProducts" }]
            });
        } catch (error) {
            setLoading(false);
            console.error("Erro ao editar produto:", error);
            setError("Não foi possível editar o produto. Tente novamente.");
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getProduct();
        }
        fetch();
    }, []);

    if (loadingPage) return <ActivityIndicator size="large" style={{ flex: 1 }} />

    return (
        <KeyboardAwareScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
            extraScrollHeight={Platform.OS == "ios" ? 90 : 60}
            enableOnAndroid
            keyboardOpeningTime={0}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flexDirection: "column", alignItems: "center", borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 10, padding: 15, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", marginBottom: 10, gap: 5 }}>
                    <Icon name="box" size={20} color="#000" />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Informações Básicas</Text>
                </View>
                <TextInput
                    label={"Nome do produto*"}
                    placeholder="Digite o nome do produto"
                    placeholderTextColor="#64748B"
                    defaultValue={name}
                    onChangeText={text => setNewName(text)}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                />
                <TextInput
                    label={"Descrição do produto*"}
                    placeholder="Digite a descrição do produto"
                    placeholderTextColor="#64748B"
                    defaultValue={description}
                    onChangeText={text => setNewDescription(text)}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                />
            </View>
            <View style={{ flexDirection: "column", alignItems: "center", borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 10, padding: 15, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", marginBottom: 10, gap: 5 }}>
                    <Icon name="dollar-sign" size={20} color="#000" />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Preço e Estoque</Text>
                </View>
                <TextInput
                    label={"Preço Atual*"}
                    placeholder="Digite o preço do produto"
                    placeholderTextColor="#64748B"
                    defaultValue={price}
                    onChangeText={text => setNewPrice(text)}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                    keyboardType="numeric"
                />
                <TextInput
                    label={"Quantidade em estoque*"}
                    placeholder="Digite a quantidade em estoque"
                    placeholderTextColor="#64748B"
                    defaultValue={stock}
                    onChangeText={text => setNewStock(text)}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                    keyboardType="numeric"
                />

            </View>
            <View style={{ flexDirection: "column", alignItems: "center", borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 10, padding: 15, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", marginBottom: 10 }}>
                    <Icon name="image" size={20} color="#000" />
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>Imagens do Produto (Indisponível)</Text>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch", justifyContent: "flex-start" }}>
                    <View style={{ width: 80, height: 80, borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 5, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", marginBottom: 10 }}>
                        <Icon name="plus" size={30} color="#9ca3af" onPress={() => {/* xiii */ }} />
                    </View>
                </View>
            </View>

            {error && (
                <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
            )}

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", }}>
                <Button mode="contained" buttonColor="#fff" textColor="#000" style={{ elevation: 5, marginTop: 10, width: "48%", borderRadius: 10 }} onPress={() => { navigation.goBack(); }}>
                    Cancelar
                </Button>
                <Button loading={loading} mode="contained" disabled={loading} buttonColor="#1D77ED" textColor="#fff" style={{ elevation: 5, marginTop: 10, width: "48%", borderRadius: 10 }} onPress={() => { finishProduct(); }}>
                    Cadastrar Produto
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
};
