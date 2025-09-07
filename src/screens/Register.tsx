import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { saveUser } from "../services/UserService";
import { User } from "../data/User";
import { Styles } from "../styles/Styles";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    const handleRegister = async () => {
        const newUser: User = {
            id: 1,
            name,
            email,
            password,
            avatar: require("../../assets/Sample_User_Icon.png"),
            pedidos: [],
            favoritos: [],
            cart: [],
        };

        await saveUser(newUser);
        console.log(newUser)
        // navigation.replace("Welcome");
    };

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
                    label={"Nome Completo"}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor="#64748B"
                    value={name}
                    onChangeText={setName}
                    mode="outlined"
                    style={{ marginBottom: 8, width: 300, borderRadius: 5, backgroundColor: "#fff" }}
                />
                <TextInput
                    label={"Email"}
                    placeholder="Digite seu email"
                    placeholderTextColor="#64748B"
                    value={email}
                    onChangeText={setEmail}
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
                    error={password !== "" && !passwordRegex.test(password)}
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
                        <Button disabled onPress={handleRegister} mode="contained" style={Styles.btn}>Cadastrar</Button>
                    </>
                ) : password !== confirmPassword ? (
                    <>
                        <Text style={{ color: "red", marginBottom: 8 }}>As senhas devem ser iguais.</Text>
                        <Button disabled onPress={handleRegister} mode="contained" style={Styles.btn}>Cadastrar</Button>
                    </>
                ) : (
                    <Button onPress={handleRegister} mode="contained" style={Styles.btn}>Cadastrar</Button>
                )}
            </View>
        </View>
    );
}

