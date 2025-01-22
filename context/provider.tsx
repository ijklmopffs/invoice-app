"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/helpers/firebase";

type AppContextType = {
  invoiceDetails: InvoiceArray[] | undefined;
  getViewById: (id: string) => InvoiceArray | undefined;
  handleShowForm: () => void;
  showForm: boolean;
  formData: InvoiceArray;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addItem: () => void;
  removeItem: (index: number) => void;
  handleAddressChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "sender" | "client"
  ) => void;
  handleItemChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  handleDateChange: (date: Date) => void;
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

const generateRandomId = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const randomLetters = Array.from(
    { length: 2 },
    () => letters[Math.floor(Math.random() * letters.length)]
  ).join("");
  const randomNumber = Array.from(
    { length: 4 },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join("");
  return `${randomLetters}${randomNumber}`;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculatePaymentDue = (
  createdAt: string,
  paymentTerms: number
): string => {
  const createdDate = new Date(createdAt);
  createdDate.setDate(createdDate.getDate() + paymentTerms);
  return formatDate(createdDate);
};

export const AppProvider = ({ children }: any) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceArray[]>();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: generateRandomId(),
    createdAt: formatDate(new Date()),
    paymentDue: calculatePaymentDue(formatDate(new Date()), 0),
    description: "",
    paymentTerms: 0,
    clientName: "",
    clientEmail: "",
    status: "pending",
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    clientAddress: { street: "", city: "", postCode: "", country: "" },
    items: [{ name: "", quantity: 0, price: 0, total: 0 }],
    total: 0,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [refresh, setRefresh] = useState(false);

  const handleDateChange = (date: Date) => {
    const formattedDate = formatDate(date);

    setStartDate(date);
    setFormData((prev) => ({
      ...prev,
      createdAt: formattedDate,
      paymentDue: calculatePaymentDue(formattedDate, prev.paymentTerms),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      if (name === "paymentTerms") {
        updatedFormData.paymentDue = calculatePaymentDue(
          prev.createdAt,
          Number(value)
        );
      }
      return updatedFormData;
    });
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "sender" | "client"
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const addressKey = `${type}Address` as keyof FormData;
      return {
        ...prev,
        [addressKey]: {
          ...prev[addressKey as "senderAddress" | "clientAddress"],
          [name]: value,
        },
      };
    });
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = formData.items.map((item, i) => {
      if (i === index) {
        const updatedItem = {
          ...item,
          [field]: value,
        };
        updatedItem.total =
          field === "quantity" || field === "price"
            ? (field === "quantity" ? Number(value) : updatedItem.quantity) *
              (field === "price" ? Number(value) : updatedItem.price)
            : item.total;
        return updatedItem;
      }
      return item;
    });

    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedTotal,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 0, price: 0, total: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      total: updatedTotal,
    }));
  };

  const refreshInvoices = () => {
    setRefresh((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "invoices"), formData);
      console.log("invoice saved successfully");
      console.log(formData);
      setFormData({
        id: generateRandomId(),
        createdAt: "",
        paymentDue: "",
        description: "",
        paymentTerms: 0,
        clientName: "",
        clientEmail: "",
        status: "pending",
        senderAddress: { street: "", city: "", postCode: "", country: "" },
        clientAddress: { street: "", city: "", postCode: "", country: "" },
        items: [{ name: "", quantity: 0, price: 0, total: 0 }],
        total: 0,
      });
      setShowForm(false);
      refreshInvoices();
    } catch (error) {
      console.error("Error saving invoice: ", error);
    }
  };

  const getViewById = (id: string): InvoiceArray | undefined => {
    return invoiceDetails?.find((invoice) => invoice.id === id);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const querySnapshot = await getDocs(collection(db, "invoices"));
      const invoiceData: InvoiceArray[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as InvoiceArray),
      }));
      setInvoiceDetails(invoiceData);
    };

    fetchInvoices();
  }, [refresh]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <AppContext.Provider
      value={{
        invoiceDetails,
        getViewById,
        showForm,
        handleShowForm,
        formData,
        handleInputChange,
        addItem,
        removeItem,
        handleAddressChange,
        handleItemChange,
        handleSubmit,
        startDate,
        setStartDate,
        handleDateChange,
      }}
    >
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
