import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StatusBar, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RootStackNavigationProp } from '../../types/Navigation';
import { safeGoBack } from '../../utils/safeGoBack';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../../styles/Styles';

type Props = {
    name: string;
}
export const GenericHeader = ({ name }: Props) => {
    const navigation = useNavigation<RootStackNavigationProp>();
    return (
        <SafeAreaView style={Styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => safeGoBack(navigation)}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
                <View style={Styles.actions}>
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
