import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { useUser } from "../hook/useUser";
import { register } from "../services/api/auth/register";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";
import { resetToCategories } from "../utils/resetToScreen";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    const navigation = useNavigation<RootStackNavigationProp>();


    const { setUser } = useUser();

    const handleRegister = async () => {
        const nameTrim = name.trim();
        const emailTrim = email.trim();

        try {
            setLoading(true);
            await register(nameTrim, emailTrim, password);
            setUser({
                name: nameTrim,
                email: emailTrim,
                password: password,
                avatar: require('../../assets/Sample_User_Icon.png'),
            });
            setError("");
            resetToCategories(navigation);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                    {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}
                    <TextInput
                        label={"Nome Completo"}
                        placeholder="Digite seu nome completo"
                        disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
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
                        disabled={loading}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        mode="outlined"
                        style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                        secureTextEntry
                        error={confirmPassword !== "" && password !== confirmPassword}
                    />
                    <Button disabled={
                        (name === "" || email === "" || password === "" || confirmPassword === "" || !emailRegex.test(email))
                        || password !== confirmPassword}
                        onPress={handleRegister} mode="contained" loading={loading} style={Styles.btn}>Cadastrar</Button>

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
                    <View style={{ flexDirection: 'column', alignItems: "center" }}>
                        <Text style={{ textAlign: "center", color: "#64748B" }}>Quer ser uma empresa parceira da Selecta?</Text>
                        <Text style={{ textAlign: "center", fontSize: 13, color: "#005FDB" }}>Inscreva-se no nosso programa de parcerias empresariais</Text>
                    </View>
                    <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => { navigation.navigate("Tabs", { screen: "Home" }) }}>
                        <Text style={{ color: "#0074D9", fontWeight: "semibold" }}>Voltar para a tela inicial</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

