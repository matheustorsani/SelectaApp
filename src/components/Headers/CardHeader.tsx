import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather"; 

interface Props {
    icon?: string; 
    name: string;
}

export const CardHeader = ({ icon, name }: Props) => {
    return (
        <View style={{ 
            flexDirection: "row", 
            alignSelf: "flex-start", 
            alignItems: "center", 
            marginBottom: 15, 
            gap: 10
        }}>
            {icon && (
                <Icon 
                    name={icon} 
                    size={20}
                    color="#0063E6"
                />
            )}

            <Text style={{ 
                fontSize: 18,
                fontWeight: "700",
                color: '#1e293b'
            }}>
                {name}
            </Text>
        </View>
    );
}