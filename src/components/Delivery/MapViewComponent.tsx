import React from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { Order } from "../../types/Delivery";

interface Props {
  userLocation: { latitude: number; longitude: number } | null;
  order: Order | null;
  stage: "waiting" | "pickup" | "delivery" | null;
};

const PIN_COLORS = {
  USER: '#1D77ED',
  PICKUP: '#10B981',
  DELIVERY: '#E74C3C',
  DEFAULT: 'gray',
};


export const MapViewComponent: React.FC<Props> = ({ userLocation, order, stage }) => (
  <MapView
    style={{ flex: 1, backgroundColor: '#f0f0f0' }}
    region={{
      latitude: userLocation?.latitude || -23.556,
      longitude: userLocation?.longitude || -46.634,
      longitudeDelta: 0.05,
      latitudeDelta: 0.05,
    }}
    showsUserLocation={true}
    showsMyLocationButton={false}
  >
    <UrlTile
      urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      maximumZ={19}
    />

    {stage === "waiting" && order && (
      <>
        <Marker
          coordinate={order.pickup}
          title="Coleta"
          pinColor={PIN_COLORS.PICKUP}
        />
        <Marker
          coordinate={order.delivery}
          title="Entrega"
          pinColor={PIN_COLORS.DELIVERY}
        />
      </>
    )}

    {stage === "pickup" && order && (
      <Marker
        coordinate={order.pickup}
        title="Coleta"
        pinColor={PIN_COLORS.PICKUP}
      />
    )}

    {stage === "delivery" && order && (
      <Marker
        coordinate={order.delivery}
        title="Entrega"
        pinColor={PIN_COLORS.DELIVERY}
      />
    )}
  </MapView>
);