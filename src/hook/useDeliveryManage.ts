import { useState, useEffect } from "react";
import { useAudioPlayer } from "expo-audio";
import { Order, Status } from "../types/Delivery";
import { calculateFare } from "../utils/calculateFare";

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
