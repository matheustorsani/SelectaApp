import React, { createContext, useContext, useState } from "react";
import { Order, Status } from "../types/Delivery";

type DeliveryContextType = {
  status: Status;
  setStatus: (status: Status) => void;
  order: Order | null;
  setOrder: (order: Order | null) => void;
};

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<Status>("offline");
  const [order, setOrder] = useState<Order | null>(null);

  return (
    <DeliveryContext.Provider value={{ status, setStatus, order, setOrder }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) throw new Error("useDelivery deve ser usado dentro de DeliveryProvider");
  return context;
};