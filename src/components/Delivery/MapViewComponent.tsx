import React from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { Order } from "../../types/Delivery";

type Props = {
  userLocation: { latitude: number; longitude: number } | null;
  order: Order | null;
  stage: "waiting" | "pickup" | "delivery" | null;
};

export const MapViewComponent: React.FC<Props> = ({ userLocation, order, stage }) => (
  <MapView
    style={{ flex: 1 }}
    region={{
      latitude: userLocation?.latitude || -23.556,
      longitude: userLocation?.longitude || -46.634,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
  >
    <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} />

    {userLocation && <Marker coordinate={userLocation} title="Você" pinColor="blue" />}

    {stage === "waiting" && order && (
      <>
        <Marker coordinate={order.pickup} title="Coleta" pinColor="green" />
        <Marker coordinate={order.delivery} title="Entrega" pinColor="red" />
      </>
    )}

    {stage === "pickup" && order && (
      <Marker coordinate={order.pickup} title="Coleta" pinColor="green" />
    )}

    {stage === "delivery" && order && (
      <Marker coordinate={order.delivery} title="Entrega" pinColor="red" />
    )}
  </MapView>
);
