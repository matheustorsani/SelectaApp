import React, { useState } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Styles } from "../styles/Styles";

interface SearchBarProps {
    onChangeText?: (text: string) => void;
    value?: string;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onChangeText,
    value,
    placeholder = "API OFF",
}) => {
    const [text, setText] = useState(value || "");

    const handleChange = (input: string) => {
        setText(input);
        if (onChangeText) onChangeText(input);
    };

    return (
        <View style={Styles.SearchBar}>
            <Icon name="search" size={20} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
                style={Styles.SearchBarInput}
                placeholder={placeholder}
                value={text}
                onChangeText={handleChange}
                placeholderTextColor="#64748B"
                // tirar dps
                editable={false}
            />
        </View>
    );
};
