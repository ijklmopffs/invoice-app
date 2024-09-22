"use client";

import {
  createContext,
  useState,
  useContext,
  // useEffect,
  ReactNode,
} from "react";
import data from "@/data/data.json";

type AppContextType = {
  invoiceDetails: InvoiceArray[];
};

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceArray {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: any) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceArray[]>(data);

  return (
    <AppContext.Provider value={{ invoiceDetails }}>
      {children}
    </AppContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCounter must be used within an AppProvider");
  }
  return context;
};
