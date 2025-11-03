import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Order } from "../../types/Delivery";
import { getDistanceKm, reverseGeocode } from "../../utils/location";
import { useUserLocation } from "../../hook/useUserLocation";

type Props = {
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
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!order || !location) return;

    reverseGeocode(order.pickup.latitude, order.pickup.longitude).then(setPickupAddress);
    reverseGeocode(order.delivery.latitude, order.delivery.longitude).then(setDeliveryAddress);

    setKmToPickup(getDistanceKm(location.latitude, location.longitude, order.pickup.latitude, order.pickup.longitude));
    setKmPickupToDelivery(getDistanceKm(order.pickup.latitude, order.pickup.longitude, order.delivery.latitude, order.delivery.longitude));
  }, [order, location]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 600, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!order || !location) return null;

  return (
    <Animated.View
      style={[styles.footer, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.title}>Novo Pedido!</Text>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>R$ {calculateEarnings(kmPickupToDelivery, kmToPickup).toFixed(2)}</Text>
      <Text style={{ paddingBottom: 3 }}>Coleta: {pickupAddress} ({kmToPickup.toFixed(2)} km)</Text>
      <Text style={{ paddingBottom: 3 }}>Entrega: {deliveryAddress}</Text>
      <Text>Distância coleta → entrega: {kmPickupToDelivery.toFixed(2)} km</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
          <Text style={styles.acceptText}>Aceitar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refuseBtn} onPress={onRefuse}>
          <Text style={styles.refuseText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    zIndex: 20,
    borderWidth: 1,
  },
  title: { fontWeight: "700", fontSize: 16, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  acceptBtn: {
    backgroundColor: "#21C45D",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  refuseBtn: {
    backgroundColor: "#E74C3C",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  acceptText: { color: "#fff", fontWeight: "700" },
  refuseText: { color: "#fff", fontWeight: "700" },
});
