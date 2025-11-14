import React, { useState } from "react";
import { Text, Image, View, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card, TextInput } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { useUser } from "../hook/useUser";
import { RootStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { CardHeader } from "../components/Headers/CardHeader";
import Icon from "react-native-vector-icons/AntDesign";

export const MyData = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const { user } = useUser();
    const [editable, setEditable] = useState(false);

    if (!user) return;

    return (
        <KeyboardAwareScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
            extraScrollHeight={Platform.OS == "ios" ? 80 : 60}
            enableOnAndroid
            keyboardOpeningTime={0}
            showsVerticalScrollIndicator={false}
        >
            <Card style={Styles.Card}>
                <Card.Content style={{ justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                    <Image
                        source={typeof user.avatar === "string" ? { uri: user.avatar } : user.avatar}
                        style={{
                            width: 80,
                            height: 80,
                            borderWidth: 0.5,
                            borderRadius: 40,
                            borderColor: "#000",
                            marginBottom: 16,
                            resizeMode: "cover"
                        }}
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{user.name}</Text>
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <CardHeader name="Informações Pessoais" icon="user" />
                        <Icon name="edit" size={14} onPress={() => setEditable(true)} />
                    </View>
                    <TextInput
                        label={"Nome Completo"}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        defaultValue={user.name}
                        disabled={!editable}
                        style={{ marginBottom: 8, width: "100%", borderRadius: 5, backgroundColor: "#fff" }}
                        activeOutlineColor="#1D77ED"
                        keyboardType="default"
                    />
                    <TextInput
                        label={"Email"}
                        placeholder="Digite seu email"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        defaultValue={user.email}
                        disabled={!editable}
                        style={{ marginBottom: 8, width: "100%", borderRadius: 5, backgroundColor: "#fff" }}
                        activeOutlineColor="#1D77ED"
                        keyboardType="default"
                    />
                    <TextInput
                        label={"Telefone"}
                        placeholder="Digite seu telefone"
                        placeholderTextColor="#64748B"
                        disabled={!editable}
                        mode="outlined"
                        defaultValue={user.phone || ""}
                        style={{ marginBottom: 8, width: "100%", borderRadius: 5, backgroundColor: "#fff" }}
                        keyboardType="numeric"
                    />
                </Card.Content>
                {editable && (
                    <Card.Actions style={{ justifyContent: "flex-end", gap: 10, marginBottom: 10, paddingRight: 40 }}>
                        <Text style={{ color: "#1D77ED", fontWeight: "bold" }} onPress={() => setEditable(false)}>Cancelar</Text>
                        <Text style={{ color: "#1D77ED", fontWeight: "bold" }} onPress={() => setEditable(false)}>Salvar</Text>
                    </Card.Actions>
                )}
            </Card>
            <Card style={Styles.Card}>
                <Card.Content style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <CardHeader name="Endereço" icon="home" />
                        <Icon name="edit" size={14} onPress={() => setEditable(true)} />
                    </View>
                    <TextInput
                        label={"Endereço"}
                        placeholder="Digite seu Endereço"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        defaultValue={""}
                        disabled={!editable}
                        style={{ marginBottom: 8, width: "100%", borderRadius: 5, backgroundColor: "#fff" }}
                        activeOutlineColor="#1D77ED"
                        keyboardType="default"
                    />
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextInput
                            label={"Bairro"}
                            placeholder="Digite seu bairro"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            defaultValue={""}
                            disabled={!editable}
                            style={{ marginBottom: 8, width: "50%", borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="default"
                        />
                        <TextInput
                            label={"CEP"}
                            placeholder="Digite seu CEP"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            defaultValue={""}
                            disabled={!editable}
                            style={{ marginBottom: 8, width: "47%", borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TextInput
                            label={"Cidade"}
                            placeholder="Digite sua Cidade"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            defaultValue={""}
                            disabled={!editable}
                            style={{ marginBottom: 8, width: "50%", borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="default"
                        />
                        <TextInput
                            label={"Estado"}
                            placeholder="Digite seu Estado"
                            placeholderTextColor="#64748B"
                            mode="outlined"
                            defaultValue={""}
                            disabled={!editable}
                            style={{ marginBottom: 8, width: "47%", borderRadius: 5, backgroundColor: "#fff" }}
                            activeOutlineColor="#1D77ED"
                            keyboardType="default"
                        />
                    </View>

                </Card.Content>
                {editable && (
                    <Card.Actions style={{ justifyContent: "flex-end", gap: 10, marginBottom: 10, paddingRight: 40 }}>
                        <Text style={{ color: "#1D77ED", fontWeight: "bold" }} onPress={() => setEditable(false)}>Cancelar</Text>
                        <Text style={{ color: "#1D77ED", fontWeight: "bold" }} onPress={() => setEditable(false)}>Salvar</Text>
                    </Card.Actions>
                )}
            </Card>
        </KeyboardAwareScrollView>
    );
}
