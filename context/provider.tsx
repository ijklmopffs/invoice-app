"use client";

import { createContext, useState, useContext, useEffect } from "react";
// import data from "@/data/data.json";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/helpers/firebase";

type AppContextType = {
  invoiceDetails: InvoiceArray[] | undefined;
  getViewById: (id: string) => InvoiceArray | undefined;
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
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceArray[]>();

  const getViewById = (id: string): InvoiceArray | undefined => {
    return invoiceDetails?.find((invoice) => invoice.id === id);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const invoiceData: InvoiceArray[] = querySnapshot.docs.map((doc) => ({
        // id: doc.id,
        ...(doc.data() as InvoiceArray),
      }));
      setInvoiceDetails(invoiceData);
    };

    fetchInvoices();
  }, []);

  return (
    <AppContext.Provider value={{ invoiceDetails, getViewById }}>
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
