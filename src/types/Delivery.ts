export type Status = "offline" | "online" | "hasOrder" | "delivering";

export type FareResult = {
  totalFare: number;
  driverEarnings: number;
}

export type Order = {
  id: number;
  cliente: string;
  produto: string;
  pickup: { latitude: number; longitude: number };
  delivery: { latitude: number; longitude: number };
  price: number; 
};

export type ControlsProps = {
  status: Status;
  order: Order | null;
  stage: "waiting" | "pickup" | "delivery" | null;
  userLocation: { latitude: number; longitude: number } | null;
  goOnline?: () => void;
  goOffline?: () => void;
  onAcceptOrder?: () => void;
  onRefuseOrder?: () => void;
  onCompletePickup?: () => void;
  onCompleteDelivery?: () => void;
};
