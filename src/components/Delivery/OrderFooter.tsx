import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Order } from "../../types/Delivery";
import { getDistanceKm, reverseGeocode } from "../../utils/location";
import { useUserLocation } from "../../hook/useUserLocation";
import Icon from "react-native-vector-icons/Feather"; 

interface Props {
    order: Order | null;
    onAccept: () => void;
    onRefuse: () => void;
    calculateEarnings: (kmPickupToDelivery: number, kmToPickup: number) => number;
    visible: boolean;
};

export const OrderFooter: React.FC<Props> = ({
    order,
    onAccept,
    onRefuse,
    calculateEarnings,
    visible,
}) => {
    const location = useUserLocation();
    const [pickupAddress, setPickupAddress] = useState("Carregando...");
    const [deliveryAddress, setDeliveryAddress] = useState("Carregando...");
    const [kmToPickup, setKmToPickup] = useState(0);
    const [kmPickupToDelivery, setKmPickupToDelivery] = useState(0);
    const slideAnim = useRef(new Animated.Value(600)).current;

    useEffect(() => {
        if (!order || !location) return;

        const loadAddressesAndDistances = async () => {
            try {
                const pickupAddr = await reverseGeocode(order.pickup.latitude, order.pickup.longitude);
                setPickupAddress(pickupAddr);

                const deliveryAddr = await reverseGeocode(order.delivery.latitude, order.delivery.longitude);
                setDeliveryAddress(deliveryAddr);

                const distToPickup = getDistanceKm(location.latitude, location.longitude, order.pickup.latitude, order.pickup.longitude);
                setKmToPickup(distToPickup);

                const distPickupToDelivery = getDistanceKm(order.pickup.latitude, order.pickup.longitude, order.delivery.latitude, order.delivery.longitude);
                setKmPickupToDelivery(distPickupToDelivery);
            } catch (error) {
                console.error("Erro ao carregar endereços/distâncias:", error);
                setPickupAddress("Erro ao carregar");
                setDeliveryAddress("Erro ao carregar");
            }
        };

        loadAddressesAndDistances();
    }, [order, location]);

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : 600,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    if (!order || !location) return null;

    const earnings = calculateEarnings(kmPickupToDelivery, kmToPickup);

    return (
        <Animated.View
            style={[styles.footer, { transform: [{ translateY: slideAnim }] }]}
        >
            <View style={styles.headerRow}>
                <Text style={styles.title}>NOVO PEDIDO!</Text>
                <Text style={styles.totalDistanceText}>
                    Total: {(kmToPickup + kmPickupToDelivery).toFixed(2)} km
                </Text>
            </View>
            
            <Text style={styles.earningText}>
                R$ {earnings.toFixed(2)}
            </Text>

            <View style={styles.addressRow}>
                <Icon name="arrow-up-circle" size={18} color="#10B981" />
                <View style={styles.addressDetails}>
                    <Text style={styles.addressLabel}>Coleta</Text>
                    <Text style={styles.addressText}>{pickupAddress}</Text>
                </View>
                <Text style={styles.distanceText}>{kmToPickup.toFixed(1)} km</Text>
            </View>

            <View style={styles.separatorContainer}>
                 <Icon name="chevron-down" size={20} color="#CBD5E1" />
                 <Text style={styles.segmentDistanceText}>
                    {kmPickupToDelivery.toFixed(1)} km
                 </Text>
            </View>

            <View style={styles.addressRow}>
                <Icon name="arrow-down-circle" size={18} color="#1D77ED" />
                <View style={styles.addressDetails}>
                    <Text style={styles.addressLabel}>Entrega</Text>
                    <Text style={styles.addressText}>{deliveryAddress}</Text>
                </View>
                <Text style={styles.distanceText}></Text> 
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.refuseBtn} onPress={onRefuse}>
                    <Text style={styles.refuseText}>Recusar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
                    <Text style={styles.acceptText}>Aceitar Pedido</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 15,
        left: 10,
        right: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        
        zIndex: 20,
    },
    headerRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: 'center',
        marginBottom: 8 
    },
    title: { 
        fontWeight: "700", 
        fontSize: 15, 
        color: '#E74C3C'
    },
    totalDistanceText: {
        fontWeight: "600",
        fontSize: 14,
        color: '#6B7280',
    },
    earningText: { 
        fontWeight: "900", 
        fontSize: 32, 
        color: '#1e293b', 
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    addressRow: { 
        flexDirection: "row", 
        alignItems: 'center',
        marginBottom: 10,
    },
    addressDetails: {
        flex: 1, 
        marginLeft: 10,
        marginRight: 10,
    },
    addressLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#6B7280',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 14,
        color: '#1e293b',
        fontWeight: '500',
    },
    distanceText: {
        fontWeight: "700",
        fontSize: 15,
        color: '#374151',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        gap: 5,
    },
    segmentDistanceText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
    },
    actionRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: 20,
        gap: 10,
    },
    acceptBtn: {
        backgroundColor: "#10B981",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        flex: 2,
        alignItems: "center",
    },
    refuseBtn: {
        backgroundColor: "#E74C3C",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        flex: 1, 
        alignItems: "center",
    },
    acceptText: { 
        color: "#fff", 
        fontWeight: "800",
        fontSize: 16,
    },
    refuseText: { 
        color: "#fff", 
        fontWeight: "700",
        fontSize: 16,
    },
});