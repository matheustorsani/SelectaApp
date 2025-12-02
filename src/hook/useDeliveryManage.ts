import { useState, useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import { Order, Status } from "../types/Delivery";
import { calculateFare } from "../utils/calculateFare";

/**
 * Hook que gerencia o estado de um entregador (simulação).
 *
 * Comportamento principal:
 * - Mantém o estado do entregador (status), pedido atual (order) e estágio do processo (stage).
 * - Quando o entregador fica "online" e a localização do usuário é fornecida, simula a chegada de um pedido
 *   após 10 segundos: inicia um áudio de notificação em loop e popula o objeto de pedido com dados
 *   de exemplo (pickup/delivery calculados a partir de userLocation), definindo o stage como "waiting".
 * - Oferece ações para aceitar/recusar pedidos, marcar início/fim da coleta/entrega e alternar status online/offline.
 * - Ao aceitar ou recusar um pedido, o áudio em loop é pausado e o loop é desabilitado.
 * - Ao ir offline, limpa o pedido e o estágio.
 * - Possui uma função utilitária `calculate` que delega o cálculo da tarifa a `calculateFare` e retorna
 *   os ganhos do motorista.
 *
 * Observações sobre efeitos colaterais e limpeza:
 * - O efeito que simula a chegada do pedido é dependente de `status` e `userLocation` e registra um timer
 *   que é limpo no retorno do useEffect.
 * - O áudio de notificação é controlado pelo hook `useAudioPlayer` (play/loop/pause).
 *
 * Parâmetros:
 * @param userLocation - Objeto com latitude e longitude do entregador/usuário. Se `null`, a simulação
 *                        de novo pedido não é iniciada.
 *
 * Retorno: objeto contendo estados e ações expostas pelo hook:
 * @returns {{
 *   status: Status,                         // "offline" | "online" | "hasOrder" | "delivering" 
 *   order: Order | null,                    // Pedido atual ou null
 *   stage: "waiting" | "pickup" | "delivery" | null, // Estágio atual do pedido
 *   goOnline: () => void,                   // Coloca o entregador como online (inicia escuta de pedidos)
 *   goOffline: () => void,                  // Coloca o entregador como offline e limpa pedido/estágio
 *   acceptOrder: () => void,                // Aceita o pedido: muda stage para "pickup", status para "hasOrder" e pausa áudio
 *   refuseOrder: () => void,                // Recusa o pedido: limpa pedido/estágio, volta para "online" e pausa áudio
 *   completePickup: () => void,             // Marca coleta como completa, muda stage para "delivery"
 *   completeDelivery: () => void,           // Conclui entrega: limpa pedido/estágio e volta para "online"
 *   calculate: (kmPickupToDelivery: number, kmToPickup: number) => number // Retorna ganhos do motorista
 * }}
 *
 * Erros/validações:
 * - O hook assume que `userLocation` possui `latitude` e `longitude` válidos quando não é `null`.
 * - A simulação de pedido depende do áudio estar disponível e do hook `useAudioPlayer` funcionar corretamente.
 *
 * @example Exemplo de uso (resumo):
 * - Chamar `goOnline()` para começar a escutar pedidos.
 * - Ao receber um pedido (após ~10s), usar `acceptOrder()` ou `refuseOrder()`.
 * - Usar `calculate(kmPickupToDelivery, kmToPickup)` para obter os ganhos do motorista para a corrida.
 */
export const useDeliveryManager = (userLocation: { latitude: number; longitude: number } | null) => {
    const [status, setStatus] = useState<Status>("offline");
    const [order, setOrder] = useState<Order | null>(null);
    const [stage, setStage] = useState<"waiting" | "pickup" | "delivery" | null>(null);

    const audio = require("../../assets/notificationgamer.mp3");
    const player = useAudioPlayer(audio);

    useEffect(() => {
        if (status !== "online" || !userLocation) return;

        const timer = setTimeout(async () => {
            player.loop = true;
            player.play();

            setOrder({
                id: 1,
                cliente: "João",
                produto: "Caixa de flores",
                pickup: { latitude: userLocation.latitude + 0.001, longitude: userLocation.longitude + 0.001 },
                delivery: { latitude: userLocation.latitude + 0.005, longitude: userLocation.longitude + 0.005 },
                price: 25,
            });
            setStage("waiting");
        }, 10000);

        return () => clearTimeout(timer);
    }, [status, userLocation]);

    const goOnline = () => setStatus("online");
    const goOffline = () => {
        setStatus("offline");
        setOrder(null);
        setStage(null);
    };

    const acceptOrder = () => {
        setStage("pickup");
        setStatus("hasOrder");
        player.loop = false;
        player.pause();
    };

    const refuseOrder = () => {
        setOrder(null);
        setStage(null);
        setStatus("online");
        player.loop = false;
        player.pause();
    };

    const completePickup = () => setStage("delivery");

    const completeDelivery = () => {
        setStage(null);
        setOrder(null);
        setStatus("online");
    };

    const calculate = (kmPickupToDelivery: number, kmToPickup: number) => {
        return calculateFare(kmPickupToDelivery, kmToPickup).driverEarnings;
    }

    return {
        status,
        order,
        stage,
        goOnline,
        goOffline,
        acceptOrder,
        refuseOrder,
        completePickup,
        completeDelivery,
        calculate,
    };
};
