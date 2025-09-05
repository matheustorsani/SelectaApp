import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    TextTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        marginBottom: 0,
        textAlignVertical: 'center',
    },
    TextSubtitle: {
        fontSize: 12,
        marginHorizontal: 16,
        marginBottom: 8,
        color: 'gray'
    },
    ProfileBoxActivity: { 
        alignItems: "center", 
        flex: 1, 
        backgroundColor: "#F1F5F9", 
        padding: 16, 
        borderRadius: 8, 
        elevation: 2, 
        marginRight: 8
    }
})