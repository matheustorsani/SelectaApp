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

/**
 * Propriedades de controle para componentes de entrega.
 *
 * Fornece o estado atual e callbacks necessários para gerenciar o fluxo de um entregador
 * (aceitar/recusar pedidos, mudar disponibilidade, completar coleta/entrega).
 *
 * @property status - Estado atual do fluxo/entregador (do tipo `Status`).
 * @property order - Pedido associado ao entregador; pode ser `undefined` ou `null` quando não houver pedido.
 * @property stage - Estágio atual do processo de entrega: `"waiting" | "pickup" | "delivery"`; pode ser `null` ou `undefined`.
 * @property userLocation - Localização atual do usuário/entregador com `latitude` e `longitude`; pode ser `null` ou `undefined`.
 * @property goOnline - Função opcional chamada para colocar o entregador online.
 * @property goOffline - Função opcional chamada para colocar o entregador offline.
 * @property onAcceptOrder - Função opcional chamada quando o entregador aceita um pedido.
 * @property onRefuseOrder - Função opcional chamada quando o entregador recusa um pedido.
 * @property onCompletePickup - Função opcional chamada ao confirmar a coleta (pickup) do pedido.
 * @property onCompleteDelivery - Função opcional chamada ao confirmar a entrega (delivery) do pedido.
 */
export type ControlsProps = {
  status: Status;
  order?: Order | null;
  stage?: "waiting" | "pickup" | "delivery" | null;
  userLocation?: { latitude: number; longitude: number } | null;
  goOnline?: () => void;
  goOffline?: () => void;
  onAcceptOrder?: () => void;
  onRefuseOrder?: () => void;
  onCompletePickup?: () => void;
  onCompleteDelivery?: () => void;
};
