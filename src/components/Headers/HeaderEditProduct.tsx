import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StatusBar, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { safeGoBack } from '../../utils/safeGoBack';
import { RootStackNavigationProp } from '../../types/Navigation';
import { Styles } from '../../styles/Styles';
import { deleteProduct } from '../../services/api/products/deleteProduct';

interface Props {
    productId: number;
}

/** 
 * Componente de cabeçalho para a tela de edição de produto.
 * Inclui um botão de voltar, título e ícone de exclusão.
 * 
 * @returns Componente de cabeçalho para edição de produto.
 */

export const HeaderEditProduct = ({ productId }: Props) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const delProduct = async (productId: number) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir este produto?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await deleteProduct(productId);
                        navigation.reset({
                            index: 1,
                            routes: [{ name: "Tabs" }, { name: "MyProducts" }]
                        });
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={Styles.safeArea} >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => safeGoBack(navigation)}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Editar produto</Text>
                <View style={Styles.actions}>
                    <TouchableOpacity>
                        <Icon
                            onPress={() => delProduct(productId)}
                            name={"trash"}
                            size={22}
                            color="#fff"
                            style={{ backgroundColor: "#FF0000", padding: 6, borderRadius: 4 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};
