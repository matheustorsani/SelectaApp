import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const CategoriesItemMain = ({ icon, label, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                paddingVertical: 24,
                paddingHorizontal: 16,
                borderStyle: "dashed",
                borderRadius: 10,
                padding: 24,
                minHeight: 120,
                width: "48%",
                backgroundColor: isSelected ? "#BFDBFE" : "#fff",
                gap: 10,
                borderColor: isSelected ? "#0074D9" : "#BFDBFE"
            }}
            onPress={onPress}
        >
            {icon}
            <Text style={{ textAlign: "center" }}>{label}</Text>
        </TouchableOpacity>
    );
}