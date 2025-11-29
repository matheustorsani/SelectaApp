import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Platform, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Styles } from "../styles/Styles";
import { register } from "../services/api/auth/register";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../types/Navigation";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigation = useNavigation<RootStackNavigationProp>();

    const isFormValid = (
        name.trim() !== "" &&
        email.trim() !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        emailRegex.test(email) &&
        password === confirmPassword
    );

    const handleRegister = async () => {
        const nameTrim = name.trim();
        const emailTrim = email.trim();

        if (!isFormValid) return setError("Por favor, preencha todos os campos corretamente e garanta que as senhas coincidam.");

        try {
            setLoading(true);
            await register(nameTrim, emailTrim, password);

            navigation.navigate("Login");
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
                <Image 
                    source={require('../../assets/logo.png')} 
                    style={{ marginBottom: 20 }}
                />
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#1e293b', marginBottom: 15 }}>Crie sua conta</Text>

                <View style={{
                    marginTop: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20, 
                    gap: 12,
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
                        label={"Nome Completo"}
                        placeholder="Digite seu nome completo"
                        disabled={loading}
                        placeholderTextColor="#94a3b8"
                        value={name}
                        onChangeText={(text) => setName(text.replace(/\s+/g, " ").trimStart())}
                        mode="outlined"
                        style={{ width: '100%', borderRadius: 8, backgroundColor: "#f8fafc" }}
                        activeOutlineColor="#1D77ED"
                    />
                    
                    <TextInput
                        label={"Email"}
                        placeholder="Digite seu email"
                        placeholderTextColor="#94a3b8"
                        disabled={loading}
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                        mode="outlined"
                        style={{ width: '100%', borderRadius: 8, backgroundColor: "#f8fafc" }}
                        keyboardType="email-address"
                        activeOutlineColor="#1D77ED"
                        error={email !== "" && !emailRegex.test(email)}
                    />
                    
                    <TextInput
                        label={"Senha"}
                        placeholder="Mín. 6 caracteres, 1 letra maiúscula, 1 número"
                        placeholderTextColor="#94a3b8"
                        value={password}
                        disabled={loading}
                        onChangeText={setPassword}
                        mode="outlined"
                        style={{ width: '100%', borderRadius: 8, backgroundColor: "#f8fafc" }}
                        activeOutlineColor="#1D77ED"
                        secureTextEntry
                    />
                    
                    <TextInput
                        label={"Confirmar senha"}
                        placeholder="Confirme sua senha"
                        placeholderTextColor="#94a3b8"
                        disabled={loading}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        mode="outlined"
                        style={{ width: '100%', borderRadius: 8, backgroundColor: "#f8fafc" }}
                        activeOutlineColor="#1D77ED"
                        secureTextEntry
                        error={confirmPassword !== "" && password !== confirmPassword}
                    />
                    
                    <Button 
                        disabled={!isFormValid}
                        onPress={handleRegister} 
                        mode="contained" 
                        loading={loading} 
                        buttonColor="#1D77ED"
                        labelStyle={{ fontSize: 18, fontWeight: '700', paddingVertical: 4 }}
                        style={{ width: '100%', borderRadius: 10, marginTop: 10, height: 55, justifyContent: 'center' }}
                    >
                        Cadastrar
                    </Button>

                </View>
                
                <View style={{
                    marginTop: 25,
                    alignItems: "center",
                    gap: 12
                }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ color: "#64748B", fontSize: 14 }}>Já possui uma conta? </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                            <Text style={{ color: "#0074D9", fontWeight: "700", fontSize: 14 }}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: "center" }}>
                        <Text style={{ textAlign: "center", color: "#64748B", fontSize: 14 }}>
                            Quer ser uma empresa parceira da Selecta?
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ textAlign: "center", fontSize: 14, fontWeight: '700', color: "#1D77ED" }}>
                                Inscreva-se no nosso programa de parcerias empresariais
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={{ paddingTop: 5 }} onPress={() => { navigation.navigate("Tabs", { screen: "Home" }) }}>
                        <Text style={{ color: "#0074D9", fontWeight: "600" }}>
                            Voltar para a tela inicial
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}