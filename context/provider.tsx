"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/helpers/firebase";
import { useRouter } from "next/navigation";

type AppContextType = {
  invoiceDetails: InvoiceArray[] | undefined;
  getViewById: (id: string) => InvoiceArray | undefined;
  handleShowForm: () => void;
  handleShowEditForm: () => void;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  showEditForm: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleSaveAsDraft: (e: React.FormEvent) => void;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  handleDateChange: (date: Date | null) => void;
  handleDelete: (id: string) => void;
  handleDiscard: () => void;
  handleMarkAsPaid: (id: string) => void;
  setFormData: React.Dispatch<React.SetStateAction<InvoiceArray>>;
  formatDate: (date: Date) => string;
  calculatePaymentDue: (createdAt: string, paymentTerms: number) => string;
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

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [invoiceDetails, setInvoiceDetails] = useState<InvoiceArray[]>();
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
  const router = useRouter();

  const refreshInvoices = () => {
    setRefresh((prev) => !prev);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = formatDate(date);
      setStartDate(date);
      setFormData((prev) => ({
        ...prev,
        createdAt: formattedDate,
        paymentDue: calculatePaymentDue(formattedDate, prev.paymentTerms),
      }));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "invoices", id));
      refreshInvoices();
      router.push("/");
    } catch (error) {
      console.error("Error deleting invoice: ", error);
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      await updateDoc(doc(db, "invoices", id), {
        status: "paid",
      });
      router.push("/");
      refreshInvoices();
    } catch (error) {
      console.error("Error marking invoice as paid: ", error);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const invoiceId = formData.id;
      await setDoc(doc(db, "invoices", invoiceId), formData);
      setFormData({
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
      setShowForm(false);
      refreshInvoices();
    } catch (error) {
      console.error("Error saving invoice: ", error);
    }
  };

  const handleDiscard = () => {
    setFormData({
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
    setShowForm(false);
  };

  const handleSaveAsDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const draftFormData = { ...formData, status: "draft" };
      const invoiceId = draftFormData.id;
      await setDoc(doc(db, "invoices", invoiceId), draftFormData);
      setFormData({
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
      setShowForm(false);
      refreshInvoices();
    } catch (error) {
      console.error("Error saving invoice as draft: ", error);
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
    setFormData({
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
    setShowForm(true);
  };

  const handleShowEditForm = () => {
    setShowEditForm(true);
  };

  return (
    <AppContext.Provider
      value={{
        invoiceDetails,
        getViewById,
        showForm,
        setShowForm,
        handleShowForm,
        showEditForm,
        setShowEditForm,
        handleShowEditForm,
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
        handleDelete,
        handleDiscard,
        handleSaveAsDraft,
        handleMarkAsPaid,
        setFormData,
        formatDate,
        calculatePaymentDue,
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
