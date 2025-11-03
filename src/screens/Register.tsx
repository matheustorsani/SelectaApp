import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { saveUser } from "../services/UserService";
import { User } from "../types/User";
import { Styles } from "../styles/Styles";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useUser } from "../hook/useUser";
import { register } from "../services/ApiService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register({ navigation }: NativeStackScreenProps<any>) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    const { setUser } = useUser();

    const handleRegister = async () => {
        const nameTrim = name.trim();
        const emailTrim = email.trim();

        //  NÃO LOGA NINGUEM PQ VAI DAR PAU
        // DAQUI A POUCO ARRUMO ISSO
        // #VAICAUA

        await register(nameTrim, emailTrim, password);
        //navigation.navigate("Categories");
    };

    return (
        <KeyboardAwareScrollView
                            style={Styles.Main}
                            contentContainerStyle={{ flexGrow: 1 }}
                            extraScrollHeight={Platform.OS == "ios" ? 80 : 60}
                            enableOnAndroid
                            keyboardOpeningTime={0}
                            showsVerticalScrollIndicator={false}
                        >
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
                    label={"Nome Completo"}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor="#64748B"
                    value={name}
                    onChangeText={(text) => setName(text.replace(/\s+/g, " ").trimStart())}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                />
                <TextInput
                    label={"Email"}
                    placeholder="Digite seu email"
                    placeholderTextColor="#64748B"
                    value={email}
                    onChangeText={(text) => setEmail(text.trim())}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    keyboardType="email-address"
                    error={email !== "" && !emailRegex.test(email)}
                />
                <TextInput
                    label={"Senha"}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#64748B"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    // error={password !== "" && !passwordRegex.test(password)}
                    secureTextEntry
                />
                <TextInput
                    label={"Confirmar senha"}
                    placeholder="Confirme sua senha"
                    placeholderTextColor="#64748B"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                    secureTextEntry
                    error={confirmPassword !== "" && password !== confirmPassword}
                />

                {(name === "" || email === "" || password === "" || confirmPassword === "" || !emailRegex.test(email)) ? (
                    <>
                        <Button disabled mode="contained" style={Styles.btn}>NÃO CADASTRE, TA QUEBRADO</Button>
                    </>
                ) : password !== confirmPassword ? (
                    <>
                        <Text style={{ color: "red", marginBottom: 8 }}>As senhas devem ser iguais.</Text>
                        <Button disabled mode="contained" style={Styles.btn}>NÃO CADASTRE, TA QUEBRADO</Button>
                    </>
                ) : (
                    <Button disabled onPress={handleRegister} mode="contained" style={Styles.btn}>NÃO CADASTRE, TA QUEBRADO</Button>
                )}
            </View>
            <View style={{
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                alignContent: "center",
                gap: 2
            }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Text style={{ color: "#64748B" }}>Já possui uma conta? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Text style={{ color: "#0074D9", fontWeight: "semibold" }}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#64748B" }}>Quer ser uma empresa parceira da Selecta?</Text>
                <Text style={{ fontSize: 13, color: "#005FDB" }}>Inscreva-se no nosso programa de parcerias empresariais</Text>
            </View>
        </View>
        </KeyboardAwareScrollView>
    );
}

