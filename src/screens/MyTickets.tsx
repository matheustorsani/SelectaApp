import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';
import { Cards } from '../components/Cards';
import { OptionCard } from '../components/OptionCard';


export const MyTickets = () => {
    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Cards color="#F97A1F" text="Abertos" number={1} />
            <Cards color="#1D77ED" text="Total" number={3} />
            <OptionCard color="#fff" bgColor="#1D77ED" icon="plus" text="Abrir novo ticket" />
            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>Meus Tickets</Text>
        </ScrollView>
    );
}