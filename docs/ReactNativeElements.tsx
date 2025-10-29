/**
 * @module ReactNativeElements
 * 
 * Este arquivo serve como referência para o app, explicando os principais
 * elementos que usamos em React Native e algumas bibliotecas auxiliares.
 * 
 * - Elementos nativos: View, ScrollView, Text, Image, TouchableOpacity
 * - React Native Paper: TextInput e Button (mais fáceis de estilizar)
 * - Ícones: react-native-vector-icons (https://oblador.github.io/react-native-vector-icons/)
 * 
 * Observação: Prefiro que o CSS seja feito inline (`style={{ ... }}`) em vez
 * de criar `const styles = {...}`.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

/**
* No site dos ícones, você pode escolher a biblioteca e o ícone desejado
* Aqui usamos MaterialIcons como exemplo
* Mas caso voce ache um ícone que esta no FontAwesome, Feather, Ionicons, etc,
* É só trocar o import abaixo pela biblioteca correta
* Ex: import Icon from 'react-native-vector-icons/FontAwesome';
*import Icon from 'react-native-vector-icons/MaterialIcons';
*/
import Icon from 'react-native-vector-icons/MaterialIcons';
/**
 * Componente de exemplo mostrando o uso de elementos básicos do React Native
 * e componentes do React Native Paper.
 * 
 * @remarks
 * Esse componente não é usado diretamente no app, serve apenas como referência
 * para desenvolvimento.
 */
export default function ReactNativeElementsExample() {
    const [text, setText] = useState('');

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
            {/** View: contêiner de layout */}
            <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Olá!</Text>
                <Text>View é como uma caixa que contém outros elementos.</Text>
            </View>

            {/** Image */}
            <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 64, height: 64, marginBottom: 20 }}
            />

            {/** TextInput do React Native Paper */}
            <TextInput
                label="Digite algo"
                value={text}
                onChangeText={setText}
                style={{ marginBottom: 10, backgroundColor: 'white' }}
            />
            <Text>Você digitou: {text}</Text>

            {/** Button do React Native Paper */}
            <Button
                mode="contained"
                onPress={() => alert('Botão Paper clicado!')}
                icon="send"
                style={{ marginVertical: 10 }}
            >
                Enviar
            </Button>

            {/** TouchableOpacity com ícone */}
            <TouchableOpacity
                style={{ flexDirection: 'row', padding: 15, backgroundColor: '#4CAF50', borderRadius: 8, alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onPress={() => alert('Clicou no botão custom!')}
            >
                <Icon name="favorite" size={24} color="#fff" />
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Curtir</Text>
            </TouchableOpacity>

            <Text style={{ marginTop: 20, fontSize: 12, color: '#555' }}>
                Observação:
                - Use CSS inline sempre que possível.
                - Ícones podem ser encontrados em https://oblador.github.io/react-native-vector-icons/
                - TextInput e Button são do React Native Paper, mais fáceis de usar que os nativos.
            </Text>
        </ScrollView>
    );
}
