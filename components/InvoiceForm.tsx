import { useProvider } from "@/context/provider";
import deleteItem from "@/images/icon-delete.svg";
import Image from "next/image";
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
  } = useProvider();

  return (
    <main>
      <div className="fixed inset-0 bg-black bg-opacity-70 w-full h-screen">
        <div className="bg-white w-[40rem] p-10 absolute left-24 top-0 rounded-tr-3xl rounded-br-3xl">
          <h1 className="font-bold text-2xl text-darkBeige">New invoice</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <h2 className="text-purple text-sm font-bold">Bill From</h2>
              <div className="mt-5">
                <p className="text-purple text-xs font-medium">
                  Street Address
                </p>
                <input
                  type="text"
                  className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                  name="street"
                  value={formData.senderAddress.street}
                  onChange={(e) => handleAddressChange(e, "sender")}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-purple text-xs font-medium">City</p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="city"
                    value={formData.senderAddress.city}
                    onChange={(e) => handleAddressChange(e, "sender")}
                  />
                </div>
                <div>
                  <p className="text-purple text-xs font-medium">Post Code</p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="postCode"
                    value={formData.senderAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "sender")}
                  />
                </div>
                <div>
                  <p className="text-purple text-xs font-medium">Country</p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="country"
                    value={formData.senderAddress.country}
                    onChange={(e) => handleAddressChange(e, "sender")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-purple text-sm font-bold">Bill To</h2>
              <div className="mt-5">
                <p className="text-purple text-xs font-medium">
                  Client&apos;s Name
                </p>
                <input
                  type="text"
                  className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-5">
                <p className="text-purple text-xs font-medium">
                  Client&apos;s Email
                </p>
                <input
                  type="text"
                  className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-5">
                <p className="text-purple text-xs font-medium">
                  Street Address
                </p>
                <input
                  type="text"
                  className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                  name="street"
                  value={formData.clientAddress.street}
                  onChange={(e) => handleAddressChange(e, "client")}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-purple text-xs font-medium">City</p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="city"
                    value={formData.clientAddress.city}
                    onChange={(e) => handleAddressChange(e, "client")}
                  />
                </div>
                <div>
                  <p className="text-purple text-xs font-medium">Post Code</p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="postCode"
                    value={formData.clientAddress.postCode}
                    onChange={(e) => handleAddressChange(e, "client")}
                  />
                </div>
                <div>
                  <p className="text-purple text-xs font-medium">Country</p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="country"
                    value={formData.clientAddress.country}
                    onChange={(e) => handleAddressChange(e, "client")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mt-4 flex">
                <div>
                  <p className="text-purple text-xs font-medium">
                    Invoice Date
                  </p>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd" // Ensure the date format matches the expected format
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                  />
                </div>
                <div>
                  <p className="text-purple text-xs font-medium">
                    Payment Terms
                  </p>
                  <input
                    type="text"
                    className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-5">
                <p className="text-purple text-xs font-medium">
                  Project Description
                </p>
                <input
                  type="text"
                  className="w-[90%] mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-purple text-sm font-bold">Item List</h2>
              {formData.items.map((item, index) => (
                <div key={index} className="mt-4 flex gap-2">
                  <div>
                    <p className="text-purple text-xs font-medium">Item Name</p>
                    <input
                      type="text"
                      className="w-52 mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-11 mr-2">
                    <p className="text-purple text-xs font-medium">Qty.</p>
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
                    />
                  </div>
                  <div className="w-20">
                    <p className="text-purple text-xs font-medium">Price</p>
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
                    />
                  </div>
                  <div>
                    <p className="text-purple text-xs font-medium">Total</p>
                    <p className="text-strongPurple font-bold mt-3">
                      {item.total}
                    </p>
                  </div>
                  <button
                    className="mt-3 ml-5"
                    type="button"
                    onClick={() => removeItem(index)}
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
              <button className="bg-[#f9fafe] text-lighterPurple font-bold text-sm rounded-full px-8 py-3">
                Discard
              </button>
              <div className="space-x-3">
                <button className="bg-[#373B53] text-strongPurple font-bold text-sm rounded-full px-7 py-4">
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
