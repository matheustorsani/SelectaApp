import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ControlsProps } from "../../types/Delivery";
import { safeGoBack } from "../../utils/safeGoBack";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../types/Navigation";

const statusColor: Record<string, string> = {
  offline: "#999",
  online: "#21C45D",
  hasOrder: "#FFA500",
  delivering: "#1D77ED",
};

const statusText: Record<string, string> = {
  offline: "Offline",
  online: "Disponível",
  hasOrder: "Pedido recebido",
  delivering: "Em entrega",
};

export const Controls: React.FC<ControlsProps> = ({
  status,
  order,
  stage,
  userLocation,
  goOnline,
  goOffline,
  onCompletePickup,
  onCompleteDelivery,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const openInGoogleMaps = () => {
    if (!order || !userLocation) return;

    const destination =
      stage === "pickup" ? order.pickup : order.delivery;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  const handleStatusPress = () => {
    if (status === "offline" && goOnline) goOnline();
    else if (status === "online" && goOffline) goOffline();
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.container}>
        {/* Botão voltar */}
        <TouchableOpacity onPress={() => safeGoBack(navigation)}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        {/* Status central */}
        <View style={styles.centered}>
          <TouchableOpacity
            style={[styles.statusBox, { backgroundColor: statusColor[status] }]}
            disabled={status === "hasOrder" || status === "delivering"}
            onPress={handleStatusPress}
          >
            <Text style={styles.statusText}>{statusText[status]}</Text>
          </TouchableOpacity>
        </View>

        {/* Botões dinâmicos */}
        {stage === "pickup" && (
          <>
            <TouchableOpacity onPress={onCompletePickup}>
              <Text style={styles.actionText}>Confirmar Coleta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openInGoogleMaps}>
              <Text style={styles.mapsText}>Maps</Text>
            </TouchableOpacity>
          </>
        )}

        {stage === "delivery" && (
          <>
            <TouchableOpacity onPress={onCompleteDelivery}>
              <Text style={styles.actionText}>Confirmar Entrega</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openInGoogleMaps}>
              <Text style={styles.mapsText}>Maps</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 10 + StatusBar.currentHeight!,
    left: 16,
    right: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
    zIndex: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statusBox: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
  },
  actionText: {
    color: "#1D77ED",
    fontWeight: "600",
    marginRight: 10,
  },
  mapsText: {
    color: "#1D77ED",
    fontWeight: "600",
  },
});
