import React from "react";
import { View } from "react-native";
import { useUserLocation } from "../hook/useUserLocation";
import { Controls } from "../components/Delivery/Controls";
import { MapViewComponent } from "../components/Delivery/MapViewComponent";
import { OrderFooter } from "../components/Delivery/OrderFooter";
import { useDeliveryManager } from "../hook/useDeliveryManage";

export const Delivery = () => {
    const userLocation = useUserLocation();
    const delivery = useDeliveryManager(userLocation);

    return (
        <View style={{ flex: 1 }}>
            <MapViewComponent
                order={delivery.order}
                userLocation={userLocation}
                stage={delivery.stage}
            />

            <Controls
                status={delivery.status}
                stage={delivery.stage}
                order={delivery.order}
                userLocation={userLocation}
                goOnline={delivery.goOnline}
                goOffline={delivery.goOffline}
                onCompletePickup={delivery.completePickup}
                onCompleteDelivery={delivery.completeDelivery}
            />

            <OrderFooter
                visible={delivery.stage === "waiting"}
                order={delivery.order}
                onAccept={delivery.acceptOrder}
                onRefuse={delivery.refuseOrder}
                calculateEarnings={(kmPickupToDelivery: number, kmToPickup: number) => 
                    delivery.calculate(kmPickupToDelivery, kmToPickup)
                }
            />
        </View>
    );
};
