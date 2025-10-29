import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

type ProfileOptionProps = {
    icon: string;
    title: string;
    subtitle: string;
    onPress?: () => any;
};
/**
 * Componente que representa uma opção dentro do menu de perfil.
 * 
 * Exibe um ícone, um título e um subtítulo, e pode executar uma ação ao ser pressionado.
 * Geralmente utilizado para navegação entre seções da conta do usuário.
 * 
 * @component
 * @param {ProfileOptionProps} props - Propriedades do componente.
 * @param {string} props.icon - Nome do ícone exibido à esquerda da opção.
 * @param {string} props.title - Título principal da opção.
 * @param {string} props.subtitle - Texto secundário (descrição curta) exibido abaixo do título.
 * @param {() => void} [props.onPress] - Função executada ao pressionar a opção (geralmente usada para navegação).
 * 
 * @returns Um botão estilizado que exibe as informações da opção de perfil.
 * 
 * @example
 * ```tsx
 * <ProfileOption
 *   icon="user"
 *   title="Meus dados"
 *   subtitle="Gerencie suas informações pessoais"
 *   onPress={() => navigation.navigate('ProfileDetails')}
 * />
 * ```
 */
export const ProfileOption = ({ icon, title, subtitle, onPress }: ProfileOptionProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={icon} size={20} style={{ marginRight: 14, color: "#64748B" }} />
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ color: "#020817", fontSize: 16 }}>{title}</Text>
                    <Text style={{ color: "#64748B" }}>{subtitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
