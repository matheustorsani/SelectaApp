import React, { useState } from "react";
import { View, Text, Platform, Image, TouchableOpacity } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';
import { TextInput, Switch } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// adicionar isso aqui na tela, pro usuario selecionar a categoria do produto
// não aplicavel no momento, pois nao sei as categorias existentes da API e nao sei se é assim que deve ser feito.

const categories = ['Eletrônicos', 'Moda', 'Casa e Banho', 'Esportes', 'Livros', 'Beleza'];

export const EditProduct = () => {
    const [isSwitchOn, setSwitch] = useState(false);
    return (
        <KeyboardAwareScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
            extraScrollHeight={Platform.OS == "ios" ? 80 : 60}
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
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                />
                <TextInput
                    label={"Descrição do produto*"}
                    placeholder="Digite a descrição do produto"
                    placeholderTextColor="#64748B"
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
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                    keyboardType="numeric"
                />
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, alignSelf: "flex-start", marginLeft: 10 }}>
                    <Switch value={isSwitchOn} onValueChange={setSwitch} color="#1D77ED" />
                    <Text>Produto em promoção</Text>
                </View>
                <TextInput
                    label={"Preço Original"}
                    placeholder="Digite o preço do produto"
                    placeholderTextColor="#64748B"
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                    keyboardType="numeric"
                    disabled={!isSwitchOn}
                />
                <TextInput
                    label={"Quantidade em estoque*"}
                    placeholder="Digite a quantidade em estoque"
                    placeholderTextColor="#64748B"
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                    keyboardType="numeric"
                />

            </View>
            <View style={{ flexDirection: "column", alignItems: "center", borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 10, padding: 15, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", marginBottom: 10 }}>
                    <Icon name="image" size={20} color="#000" />
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 5 }}>Imagens do Produto</Text>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", alignSelf: "stretch", justifyContent: "flex-start" }}>
                    <Image source={require("../../assets/smartphone.png")} style={{ height: 80, width: 80, marginRight: 10, marginBottom: 10, borderRadius: 5 }} />
                    <Image source={require("../../assets/smartphone.png")} style={{ height: 80, width: 80, marginRight: 10, marginBottom: 10, borderRadius: 5 }} />
                    <Image source={require("../../assets/smartphone.png")} style={{ height: 80, width: 80, marginRight: 10, marginBottom: 10, borderRadius: 5 }} />
                    <Image source={require("../../assets/smartphone.png")} style={{ height: 80, width: 80, marginRight: 10, marginBottom: 10, borderRadius: 5 }} />
                    <View style={{ width: 80, height: 80, borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 5, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6", marginBottom: 10 }}>
                        <Icon name="plus" size={30} color="#9ca3af" onPress={() => {/* xiii */ }} />
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: "column", alignItems: "center", borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 10, padding: 15, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", marginBottom: 10, gap: 5 }}>
                    <Icon name="settings" size={20} color="#000" />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Especificações</Text>
                </View>

                <View style={{ justifyContent: "space-between", gap: 5, alignItems: "center" }}>
                    <View style={{ flexDirection: "row", paddingHorizontal: 10, justifyContent: "space-between", gap: 5, alignItems: "center" }}>
                        <TextInput
                            label={"Nome da especificação*"}
                            placeholder="Digite o nome da especificação"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: '48%', borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="default"
                        />
                        <TextInput
                            label={"Valor*"}
                            placeholder="Digite o valor"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: '48%', borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="default"
                        />
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f3f4f6",
                                borderRadius: 5
                            }}>
                            <Icon name="plus" size={30} color="#1D77ED" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text>Tela: 6.7" AMOLED</Text>
                        <IconA name="close" size={15} color="#000" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text>Processador: Snapdragon 8 Gen 2 </Text>
                        <IconA name="close" size={15} color="#000" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text>RAM: 8GB</Text>
                        <IconA name="close" size={15} color="#000" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text>Armazenamento: 256GB</Text>
                        <IconA name="close" size={15} color="#000" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text>Câmera: 108MP + 12MP + 5MP</Text>
                        <IconA name="close" size={15} color="#000" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%', marginTop: 20, paddingHorizontal: 5 }}>
                        <Text>Bateria: 5000mAh</Text>
                        <IconA name="close" size={15} color="#000" />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}