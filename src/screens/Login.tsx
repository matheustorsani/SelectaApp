import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { login } from "../services/api/auth/login";
import { useUser } from "../hook/useUser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";
import { resetToHome } from "../utils/resetToScreen";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<RootStackNavigationProp>();

    const handleLogin = async () => {
        try {
            setLoading(true);
            const emailTrim = email.trim();
            const user = await login(emailTrim, password);

            setError("");

            const logged = {
                id: user.idCliente,
                name: user.nomeCliente,
                email: user.nomeCliente,
                password: password,
                avatar: require("../../assets/Sample_User_Icon.png"),
            };

            setUser(logged);
            resetToHome(navigation);
        } catch (err: any) {
            setError(err.message);
            console.log("Erro de login:", err.message);
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
                        label={"Email"}
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                        placeholder="Digite seu email"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        disabled={loading}
                        style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                        keyboardType="email-address"
                    />
                    <TextInput
                        label={"Senha"}
                        value={password}
                        disabled={loading}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#64748B"
                        mode="outlined"
                        style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                        // error={password !== "" && !passwordRegex.test(password)}
                        secureTextEntry
                    />
                    <Button mode="contained" style={Styles.btn} onPress={handleLogin} disabled={loading || (!email || !password)} loading={loading}>Entrar</Button>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: "center" }}>
                    <Text style={{ color: "#64748B" }}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                        <Text style={{ color: "#0074D9", fontWeight: "semibold" }}>Crie uma conta</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => { navigation.navigate("Tabs", { screen: "Home" }) }}>
                    <Text style={{ color: "#0074D9", fontWeight: "semibold" }}>Voltar para a tela inicial</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

