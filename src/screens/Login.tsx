import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Styles } from "../styles/Styles";

export default function Login({ navigation }: NativeStackScreenProps<any>) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
            <Image source={require('../../assets/logo.png')} />
            <View style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                gap: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff"
            }}>
                <TextInput
                    label={"Email"}
                    placeholder="Digite seu email"
                    placeholderTextColor="#64748B"
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    keyboardType="email-address"
                />
                <TextInput
                    label={"Senha"}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#64748B"
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    // error={password !== "" && !passwordRegex.test(password)}
                    secureTextEntry
                />
                <Button mode="contained" style={Styles.btn}>Entrar</Button>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: "center" }}>
                <Text style={{ color: "#64748B" }}>Não tem uma conta? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                    <Text style={{ color: "#0074D9", fontWeight: "semibold" }}>Crie uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

