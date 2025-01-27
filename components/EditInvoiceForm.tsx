import { useProvider } from "@/context/provider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import deleteItem from "@/images/icon-delete.svg";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import arrowLeft from "@/images/icon-arrow-left.svg";

export default function EditInvoiceForm() {
  const {
    getViewById,
    handleInputChange,
    handleAddressChange,
    handleItemChange,
    addItem,
    removeItem,
    handleSubmit,
    setFormData,
    formData,
    setShowEditForm,
    formatDate,
    calculatePaymentDue,
  } = useProvider();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const invoice = getViewById(id);
    if (invoice) {
      setFormData(invoice);
      setStartDate(new Date(invoice.createdAt));
    }
  }, [id, getViewById, setFormData]);

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

  return (
    <main>
      <div className="fixed inset-0 bg-black bg-opacity-70 w-full h-screen">
        <div className="bg-white overflow-y-scroll overflow-x-hidden w-full md:w-[40rem] h-screen md:pt-4 p-10 absolute left-0 md:left-24 top-0 md:rounded-tr-3xl md:rounded-br-3xl z-10">
          <div className="md:hidden mb-5">
            <button
              className="flex items-center gap-8 bg-transparent"
              onClick={() => setShowEditForm(false)}
            >
              <Image src={arrowLeft} alt="" />
              <p className="hover:text-purple text-darkBeige font-bold text-sm">
                Go back
              </p>
            </button>
          </div>

          <h1 className="font-bold text-2xl text-darkBeige">
            Edit #{formData.id}
          </h1>
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
              <div className="mt-4 flex md:justify-between flex-wrap md:flex-nowrap">
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
                <div className="w-full flex flex-col mt-4 md:w-auto md:block">
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

              <div className="mt-4 flex md:justify-between flex-wrap md:flex-nowrap">
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
                <div className="w-full flex flex-col mt-4 md:w-auto md:block">
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
              <div className="mt-4 md:flex">
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
                <div
                  key={index}
                  className="mt-1 flex gap-2 flex-wrap md:flex-nowrap"
                >
                  <div className="flex flex-col mt-2">
                    <label className="text-purple text-xs font-medium">
                      Item Name
                    </label>
                    <input
                      type="text"
                      className="w-96 md:w-52 mt-2 p-1 rounded border-2 border-gray focus:outline-none"
                      value={item.name}
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
                      value={item.quantity}
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
                      value={item.price}
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
                    <p className="text-strongPurple font-bold mt-3 text-center">
                      {item.total}
                    </p>
                  </div>
                  <button
                    className="mt-5 md:mt-3 ml-5"
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

            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 font-bold rounded-full px-4 py-2"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple text-white font-bold rounded-full px-4 py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
