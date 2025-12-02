import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Platform, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { login } from "../services/api/auth/login";
import { useUser } from "../hook/useUser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";
import { resetToHome } from "../utils/resetToScreen";
import { User } from "../types/User";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<RootStackNavigationProp>();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Por favor, preencha o email e a senha.");
            return;
        }

        try {
            setLoading(true);
            const emailTrim = email.trim();
            const user = await login(emailTrim, password);

            setError("");

            const logged: User = {
                id: user.idCliente,  
                name: user.nome,
                email: user.email,
                bearer: user.token,
                avatar: require("../../assets/Sample_User_Icon.png"),
            };
            
            setUser(logged);
            resetToHome(navigation);
        } catch (err: any) {
            setError(err.message || "Erro ao conectar. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = email.trim() && password;

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

                <Image
                    source={require('../../assets/logo.png')}
                    style={{ marginBottom: 20 }}
                />
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#1e293b', marginBottom: 15 }}>Acesse sua conta</Text>

                <View style={{
                    marginTop: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                    gap: 15, 
                    width: Dimensions.get('window').width - 32,
                    borderWidth: 1,
                    borderColor: "#e2e8f0",
                    borderRadius: 12,
                    backgroundColor: "#fff",
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 5,
                }}>
                    {error !== "" && (
                        <View style={{ backgroundColor: '#fee2e2', padding: 10, borderRadius: 6, width: '100%' }}>
                            <Text style={{ color: "#dc2626", fontWeight: '600', textAlign: 'center' }}>
                                {error}
                            </Text>
                        </View>
                    )}

                    <TextInput
                        label={"Email"}
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                        placeholder="Digite seu email"
                        placeholderTextColor="#94a3b8"
                        mode="outlined"
                        disabled={loading}
                        style={{ width: '100%', borderRadius: 8, backgroundColor: "#f8fafc" }}
                        keyboardType="email-address"
                        activeOutlineColor="#1D77ED"
                    />

                    <TextInput
                        label={"Senha"}
                        value={password}
                        disabled={loading}
                        onChangeText={setPassword}
                        placeholder="Digite sua senha"
                        placeholderTextColor="#94a3b8"
                        mode="outlined"
                        style={{ width: '100%', borderRadius: 8, backgroundColor: "#f8fafc" }}
                        secureTextEntry
                        activeOutlineColor="#1D77ED"
                    />

                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        disabled={loading || !isFormValid}
                        loading={loading}
                        buttonColor="#1D77ED"
                        labelStyle={{ fontSize: 18, fontWeight: '700', paddingVertical: 4 }}
                        style={{ width: '100%', borderRadius: 10, height: 55, justifyContent: 'center', marginTop: 10 }}
                    >
                        Entrar
                    </Button>

                    {/*
                    <TouchableOpacity style={{ marginTop: 5, alignSelf: 'flex-end' }} >
                        <Text style={{ color: "#0074D9", fontWeight: "600", fontSize: 13 }}>
                            Esqueceu a senha?
                        </Text>
                    </TouchableOpacity> */}

                </View>

                <View style={{ marginTop: 25, alignItems: "center", gap: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ color: "#64748B", fontSize: 14 }}>Não tem uma conta? </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Register") }}>
                            <Text style={{ color: "#0074D9", fontWeight: "700", fontSize: 14 }}>
                                Crie uma conta
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.navigate("Tabs", { screen: "Home" }) }}>
                        <Text style={{ color: "#0074D9", fontWeight: "600" }}>
                            Voltar para a tela inicial
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}