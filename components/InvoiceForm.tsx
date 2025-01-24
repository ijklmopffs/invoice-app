import { useProvider } from "@/context/provider";
import deleteItem from "@/images/icon-delete.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function InvoiceForm() {
  const {
    handleAddressChange,
    handleInputChange,
    formData,
    handleItemChange,
    addItem,
    removeItem,
    handleSubmit,
    startDate,
    handleDateChange,
    setShowForm,
    handleDiscard,
    handleSaveAsDraft,
  } = useProvider();

  const formRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <div className="fixed inset-0 bg-black bg-opacity-70 w-full h-screen">
        <div
          ref={formRef}
          className="bg-white w-[40rem] h-screen pt-4 p-10 absolute left-24 top-0 rounded-tr-3xl rounded-br-3xl"
        >
          <h1 className="font-bold text-2xl text-darkBeige">New invoice</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <h2 className="text-purple text-sm font-bold">Bill From</h2>
              <div className="mt-1">
                <label className="text-purple text-xs font-medium">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                  name="street"
                  value={formData.senderAddress.street}
                  onChange={(e) => handleAddressChange(e, "sender")}
                  placeholder=""
                  title="Enter your street address"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <label className="text-purple text-xs font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="city"
                    value={formData.senderAddress.city}
                    onChange={(e) => handleAddressChange(e, "sender")}
                    placeholder=""
                    title="Enter your city"
                  />
                </div>
                <div>
                  <label className="text-purple text-xs font-medium">
                    Post Code
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="postCode"
                    value={formData.senderAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "sender")}
                    placeholder=""
                    title="Enter your post code"
                  />
                </div>
                <div>
                  <label className="text-purple text-xs font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="country"
                    value={formData.senderAddress.country}
                    onChange={(e) => handleAddressChange(e, "sender")}
                    placeholder=""
                    title="Enter your country"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-purple text-sm font-bold">Bill To</h2>
              <div className="mt-1">
                <label className="text-purple text-xs font-medium">
                  Client&apos;s Name
                </label>
                <input
                  type="text"
                  className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  placeholder=""
                  title="Enter your client's name"
                />
              </div>
              <div className="mt-3">
                <label className="text-purple text-xs font-medium">
                  Client&apos;s Email
                </label>
                <input
                  type="text"
                  className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  placeholder=""
                  title="Enter your client's email"
                />
              </div>
              <div className="mt-3">
                <label className="text-purple text-xs font-medium">
                  Street Address
                </label>
                <input
                  type="text"
                  className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                  name="street"
                  value={formData.clientAddress.street}
                  onChange={(e) => handleAddressChange(e, "client")}
                  placeholder=""
                  title="Enter your client's street address"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <label className="text-purple text-xs font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="city"
                    value={formData.clientAddress.city}
                    onChange={(e) => handleAddressChange(e, "client")}
                    placeholder=""
                    title="Enter your client's city"
                  />
                </div>
                <div>
                  <label className="text-purple text-xs font-medium">
                    Post Code
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="postCode"
                    value={formData.clientAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "client")}
                    placeholder=""
                    title="Enter your client's post code"
                  />
                </div>
                <div>
                  <label className="text-purple text-xs font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="country"
                    value={formData.clientAddress.country}
                    onChange={(e) => handleAddressChange(e, "client")}
                    placeholder=""
                    title="Enter your client's country"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="mt-4 flex">
                <div className="flex flex-col mt-2">
                  <label className="text-purple text-xs font-medium">
                    Invoice Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-purple text-xs font-medium">
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    placeholder=""
                    title="Enter your payment terms"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-purple text-xs font-medium">
                  Project Description
                </label>
                <input
                  type="text"
                  className="w-[90%] p-1 rounded border-2 border-gray focus:outline-none"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder=""
                  title="Enter your project description"
                />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-purple text-sm font-bold">Item List</h2>
              {formData.items.map((item, index) => (
                <div key={index} className="mt-1 flex gap-2">
                  <div className="flex flex-col mt-2">
                    <label className="text-purple text-xs font-medium">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="w-52 mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      placeholder=""
                      title="Enter your item name"
                    />
                  </div>
                  <div className="w-11 mr-2">
                    <label className="text-purple text-xs font-medium">
                      Qty.
                    </label>
                    <input
                      type="text"
                      className="w-full mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder=""
                      title="Enter your item quantity"
                    />
                  </div>
                  <div className="w-20">
                    <label className="text-purple text-xs font-medium">
                      Price
                    </label>
                    <input
                      type="text"
                      className="w-full mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                      placeholder=""
                      title="Enter your item price"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-purple text-xs font-medium">Total</p>
                    <p className="text-strongPurple font-bold mt-3">
                      {item.total}
                    </p>
                  </div>
                  <button
                    className="mt-3 ml-5"
                    type="button"
                    onClick={() => removeItem(index)}
                    title="Delete item"
                  >
                    <Image src={deleteItem} alt="delete" />
                  </button>
                </div>
              ))}
              <button
                onClick={addItem}
                type="button"
                className="bg-[#f9fafe] text-purple font-bold text-sm w-full rounded-full px-6 py-2 mt-3"
              >
                +Add new item
              </button>
            </div>
            <div className="mt-5 flex justify-between items-center">
              <button
                onClick={handleDiscard}
                className="bg-[#f9fafe] text-lighterPurple font-bold text-sm rounded-full px-8 py-3"
              >
                Discard
              </button>
              <div className="space-x-3">
                <button
                  onClick={handleSaveAsDraft}
                  className="bg-[#373B53] text-strongPurple font-bold text-sm rounded-full px-7 py-4"
                >
                  Save as Draft
                </button>
                <button className="bg-purple text-white font-bold text-sm rounded-full px-7 py-4">
                  Save & Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
