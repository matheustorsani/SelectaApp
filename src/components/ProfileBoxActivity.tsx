import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Styles } from "../styles/Styles";

type ProfileBoxActivityProps = {
    title: number;
    subtitle: string;
    onPress?: () => any;
};

/**
 * Componente de caixa de atividade do perfil.
 * Exibe um título numérico e um subtítulo descritivo.
 * 
 * @param {ProfileBoxActivityProps} props - Propriedades do componente, incluindo título, subtítulo e ação ao pressionar.
 * @returns Componente de caixa de atividade do perfil.
 */
export const ProfileBoxActivity = ({ title, subtitle, onPress  }: ProfileBoxActivityProps) => {
    return (
        <TouchableOpacity style={Styles.ProfileBoxActivity} onPress={onPress}>
            <Text style={{ fontSize: 28, fontWeight: "900", color: "#0063E6" }}>{title}</Text>
            <Text style={{ color: "#64748B" }}>{subtitle}</Text>
        </TouchableOpacity>
    )
}