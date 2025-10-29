import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StyleSheet, StatusBar, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RootStackNavigationProp } from '../../types/Navigation';
import { safeGoBack } from '../../utils/safeGoBack';
import { useNavigation } from '@react-navigation/native';

/**
 * Cabeçalho para a tela de "Meus Pedidos".
 * Inclui um botão de voltar, título e ícone de notificações.
 * 
 * @returns Cabeçalho para a tela de "Meus Pedidos".
 */

export const HeaderMyOrders = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => safeGoBack(navigation)}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Meus Pedidos</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={{ marginRight: 16 }}
                    >
                        <Icon
                            name={"bell"}
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 0, backgroundColor: '#fff' },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingBottom: 0
    },
    actions: { flexDirection: 'row', alignItems: 'center' },
});
