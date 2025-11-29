import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Linking,
    Platform
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ControlsProps } from "../../types/Delivery";
import { safeGoBack } from "../../utils/safeGoBack";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../types/Navigation";

const STATUS_COLORS: Record<string, string> = {
    offline: "#6B7280",
    online: "#10B981",
    hasOrder: "#F59E0B",
    delivering: "#1D77ED",
};

const STATUS_TEXT: Record<string, string> = {
    offline: "Offline",
    online: "Disponível",
    hasOrder: "Novo Pedido",
    delivering: "Em Entrega",
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
        
        Linking.openURL(url).catch(err => console.error("Não foi possível abrir Maps:", err));
    };

    const handleStatusPress = () => {
        if (status === "offline" && goOnline) goOnline();
        else if (status === "online" && goOffline) goOffline();
    };

    const isTaskActive = status === "hasOrder" || status === "delivering";

    const rightContent = () => {
        if (stage === "pickup") {
            return (
                <View style={styles.actionGroup}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.mapButton]}
                        onPress={openInGoogleMaps}
                    >
                        <Icon name="map" size={16} color="#1D77ED" />
                        <Text style={styles.mapText}>Rota</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={onCompletePickup}
                    >
                         <Icon name="check" size={16} color="#fff" />
                        <Text style={styles.actionText}>Coletar</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (stage === "delivery") {
            return (
                <View style={styles.actionGroup}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.mapButton]}
                        onPress={openInGoogleMaps}
                    >
                        <Icon name="map" size={16} color="#1D77ED" />
                        <Text style={styles.mapText}>Rota</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={onCompleteDelivery}
                    >
                        <Icon name="check-circle" size={16} color="#fff" />
                        <Text style={styles.actionText}>Finalizar</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return <View style={styles.emptyRight} />;
    };

    return (
        <View style={styles.wrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.container}>
                <TouchableOpacity onPress={() => safeGoBack(navigation)} style={styles.backButton}>
                    <Icon name="arrow-left" size={20} color="#333" />
                </TouchableOpacity>

                <View style={styles.centered}>
                    <TouchableOpacity
                        style={[
                            styles.statusBox, 
                            { backgroundColor: STATUS_COLORS[status] }
                        ]}
                        disabled={isTaskActive}
                        onPress={handleStatusPress}
                    >
                        <Text style={styles.statusLabel}>{STATUS_TEXT[status]}</Text>
                        {
                            !isTaskActive && (
                                <Icon 
                                    name={status === 'online' ? 'chevrons-down' : 'chevrons-up'} 
                                    size={14} 
                                    color="#fff" 
                                    style={{ marginLeft: 4 }}
                                />
                            )
                        }
                    </TouchableOpacity>
                </View>

                {rightContent()}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 50,
        left: 10,
        right: 10,
        
        borderRadius: 15,
        backgroundColor: "#fff",
        
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            }
        }),
        zIndex: 10,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    backButton: {
        padding: 4
    },
    centered: {
        flexGrow: 1,
        alignItems: "center",
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 25,
        minWidth: 90,
        justifyContent: 'center',
    },
    statusLabel: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1D77ED',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
    },
    actionText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
        marginLeft: 4,
    },
    mapButton: {
        backgroundColor: '#EBF5FF',
        borderWidth: 1,
        borderColor: '#1D77ED',
    },
    mapText: {
        color: "#1D77ED",
        fontWeight: "600",
        fontSize: 13,
        marginLeft: 4,
    },
    emptyRight: {
        width: 8
    }
});