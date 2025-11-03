import { FareResult } from "../types/Delivery";

export function calculateFare(
    kmPickupToDelivery: number,
    kmToPickup: number,
    pricePerKm = 2,
    fixedFee = 7,
    platformFeePercent = 10
): FareResult {
    const distanceFare = (kmPickupToDelivery + kmToPickup) * pricePerKm;
    const totalFare = distanceFare + fixedFee;

    const driverEarnings = totalFare * (1 - platformFeePercent / 100);

    return {
        totalFare,
        driverEarnings,
    }
}