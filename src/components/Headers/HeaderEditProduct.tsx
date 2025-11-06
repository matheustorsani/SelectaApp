import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StyleSheet, StatusBar, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { safeGoBack } from '../../utils/safeGoBack';
import { RootStackNavigationProp } from '../../types/Navigation';
import { Styles } from '../../styles/Styles';

/** 
 * Componente de cabeçalho para a tela de edição de produto.
 * Inclui um botão de voltar, título e ícone de exclusão.
 * 
 * @returns Componente de cabeçalho para edição de produto.
 */

export const HeaderEditProduct = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <SafeAreaView style={Styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => safeGoBack(navigation)}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Meus Produtos</Text>
                <View style={Styles.actions}>
                    <TouchableOpacity>
                        <Icon
                            name={"trash"}
                            size={22}
                            color="#fff"
                            style={{ backgroundColor: "#FF0000", padding: 6, borderRadius: 4 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
