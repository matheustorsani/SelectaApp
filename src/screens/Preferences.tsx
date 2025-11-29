import React from "react"
import { ScrollView, View, Text } from "react-native"
import { Styles } from "../styles/Styles"
import { Card } from "react-native-paper"
import Icon from "react-native-vector-icons/FontAwesome"
import { SwitchOptions } from "../components/SwitchOptions"
import { OptionCard } from "../components/OptionCard"
import { clearCache } from "../utils/clearCache"
import { nativeApplicationVersion } from "expo-application"
import { CardHeader } from "../components/Headers/CardHeader"

const ano = new Date().getFullYear();

export const Preferences = () => {
    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Minhas Preferências" icon="bell"/>
                    <SwitchOptions title="Notificações Push" subtitle="Receber no dispositivo" enabled={true} />
                    <SwitchOptions title="Email" subtitle="Receber por email" />
                    <SwitchOptions title="SMS" subtitle="Receber por mensagens" />
                    <SwitchOptions title="Pedidos" subtitle="Atualizações de pedidos" />
                    <SwitchOptions title="Promoções" subtitle="Receber ofertas e promoções" enabled={true} />
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content>
                    <CardHeader name="Privacidade & Segurança" icon="lock"/>
                    <SwitchOptions title="Conta Privada" subtitle="Apenas pessoas aprovadas podem ver meu perfil" />
                    <SwitchOptions title="Atividade de Status" subtitle="Permitir que outros vejam quando estou online" enabled={true} />
                    <SwitchOptions title="Compartilhamento de Dados" subtitle="Permitir compartilhamento de dados com terceiros" enabled={true} />
                    <OptionCard bgColor="#fff" color="#000" text="Alterar Senha" />
                </Card.Content>
            </Card>
            <Card style={Styles.Card}>
                <Card.Content style={{ gap: 15 }}>
                    <OptionCard bgColor="#fff" color="#000" text="Limpar Cache do App" onPress={() => clearCache()} />
                    <OptionCard bgColor="#EF4343" color="#fff" text="Excluir Conta" />
                </Card.Content>
            </Card>

            <Text style={{ textAlign: "center", color: "#6C7493"}}>Versão {nativeApplicationVersion}</Text>
            <Text style={{ textAlign: "center", color: "#6C7493" }}>&copy; {ano} Selecta</Text>
        </ScrollView>
    )
}