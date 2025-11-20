import React from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Styles } from "../styles/Styles";

interface SearchBarProps {
    onChangeText?: (text: string) => void;
    value?: string;
    placeholder?: string;
}
/**
 * 
 * @component
 * @returns Uma barra de busca reutilizável.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
    onChangeText,
    value,
    placeholder = "Pesquisar..."
}) => {
    return (
        <View style={Styles.SearchBar}>
            <Icon name="search" size={20} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
                style={Styles.SearchBarInput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#64748B"
            />
        </View>
    );
};
