import React, { useState } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { Styles } from "../styles/Styles";
import Icon from 'react-native-vector-icons/Feather';
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// adicionar isso aqui na tela, pro usuario selecionar a categoria do produto
// não aplicável no momento, pois não sei as categorias existentes da API e não sei se é assim que deve ser feito.

export const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    //const [images, setImages] = useState<string[]>([]);
    const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([]);
    const [spec, setSpec] = useState('');
    const [valueSpec, setValueSpec] = useState('');
    const [error, setError] = useState('');

    const addNewSpecification = () => {
        const specs = specifications.map(item => item.name);
        if (!spec || !valueSpec) return setError('Por favor, preencha todos os campos de especificação.');
        if (specs.includes(spec)) return setError('Essa especificação já foi adicionada.');

        setSpecifications([...specifications, { name: spec, value: valueSpec }]);
        setSpec('');
        setValueSpec('');
        setError('');
    };

    const deleteSpec = (index: number) => {
        const newSpecs = specifications.filter((_, i) => i !== index);
        setSpecifications(newSpecs);
    }

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
                    value={name}
                    onChangeText={text => setName(text)}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                />
                <TextInput
                    label={"Descrição do produto*"}
                    placeholder="Digite a descrição do produto"
                    placeholderTextColor="#64748B"
                    value={description}
                    onChangeText={text => setDescription(text)}
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
                    value={price}
                    onChangeText={text => setPrice(text)}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    activeOutlineColor="#1D77ED"
                    keyboardType="numeric"
                />
                <TextInput
                    label={"Quantidade em estoque*"}
                    placeholder="Digite a quantidade em estoque"
                    placeholderTextColor="#64748B"
                    value={stock}
                    onChangeText={text => setStock(text)}
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

                <View style={{ gap: 5, alignItems: "center" }}>
                    {error ? <Text style={{ color: "#ef4444" }}>{error}</Text> : null}
                    <View style={{ flexDirection: "row", paddingHorizontal: 10, justifyContent: "space-between", gap: 5, alignItems: "center" }}>
                        <TextInput
                            label={"Nome da especificação*"}
                            placeholder="Digite o nome da especificação"
                            value={spec}
                            onChangeText={text => setSpec(text)}
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            style={{ marginBottom: 8, width: '48%', borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="default"
                        />
                        <TextInput
                            label={"Valor*"}
                            value={valueSpec}
                            onChangeText={text => setValueSpec(text)}
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
                            }} onPress={() => addNewSpecification()}>
                            <Icon name="plus" size={30} color="#1D77ED" />
                        </TouchableOpacity>
                    </View>
                    {specifications.length > 0 &&
                        <View style={{ backgroundColor: '#F0F2F5', borderRadius: 5, padding: 10, width: 330 }}>
                            {specifications.map((item, index) => (
                                <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                    <Text>{item.name}: {item.value}</Text>
                                    <TouchableOpacity onPress={() => deleteSpec(index)}>
                                        <Icon name="trash-2" size={20} color="#ef4444" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    }
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", }}>
                <Button mode="contained" buttonColor="#fff" textColor="#000" style={{ elevation: 5, marginTop: 10, width: "48%", borderRadius: 10 }} onPress={() => {/* xiii */ }}>
                    Cancelar
                </Button>
                <Button mode="contained" disabled={!name || !description || !price || !stock || specifications.length < 1} buttonColor="#1D77ED" textColor="#fff" style={{ elevation: 5, marginTop: 10, width: "48%", borderRadius: 10 }} onPress={() => {/* xiii */ }}>
                    Cadastrar Produto
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );

};
