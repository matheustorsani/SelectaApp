import React from 'react';
import { View, Text } from "react-native";
import IconF from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialIcons'

interface Props {
    checked: boolean,
    title?: string,
    subtitle?: string
}

export const Status = ({ checked, title, subtitle }: Props) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {checked
                ? <IconF name="check-circle" size={20} color="#fff" style={{ backgroundColor: 'rgba(10, 222, 10, 1)', borderRadius: 20, padding: 3 }} />
                : <IconM name="radio-button-unchecked" size={20} color="#6C7493" style={{ backgroundColor: '#F0F2F5', borderRadius: 20, padding: 3 }} />
            }

            <View style={{ flexDirection: "column", marginLeft: 10, alignSelf: "center" }}>
                <Text>{title}</Text>
                {subtitle && <Text>{subtitle}</Text>}
            </View>
        </View>
    );
};