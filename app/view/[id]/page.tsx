"use client";

import { useProvider } from "@/context/provider";
import { useParams, useRouter } from "next/navigation";
import arrowLeft from "@/images/icon-arrow-left.svg";
import Image from "next/image";
import logo from "@/images/logo.svg";
import moonIcon from "@/images/icon-moon.svg";
import avatar from "@/images/image-avatar.jpg";
import {
  capitalizeFirstLetter,
  formatDate,
  formatMoney,
} from "@/helpers/helper";

export default function ViewInvoice() {
  const { getViewById, invoiceDetails } = useProvider();

  console.log(invoiceDetails);

  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const invoice = getViewById(id);
  console.log(invoice);
  if (!id) return <p>Loading...</p>;

  const handleBack = () => {
    router.back();
  };

  function getStatusStyles(status: string): {
    textColor: string;
    bgColor: string;
  } {
    const styles: Record<string, { textColor: string; bgColor: string }> = {
      paid: { textColor: "text-[#33D69F]", bgColor: "bg-[#33D69F]/50" },
      pending: { textColor: "text-[#FF8F00]", bgColor: "bg-[#FF8F00]/50" },
      draft: { textColor: "text-[#373B53]", bgColor: "bg-[#373B53]/50" },
    };

    return styles[status] || { textColor: "text-black", bgColor: "bg-white" };
  }

  return (
    <main className="flex gap-[30rem]">
      <div className="bg-[#373b53] w-24 h-screen rounded-tr-3xl rounded-br-3xl flex flex-col justify-between pb-8">
        <div className="bg-gradient-to-b from-purple to-lightPurple w-24 h-24 flex items-center justify-center rounded-tr-3xl rounded-br-3xl">
          <Image src={logo} alt="" className="mx-auto" />
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          <Image src={moonIcon} alt="" />
          <div className="bg-[#494e6e] w-full h-[1px]" />
          <Image src={avatar} alt="" className="rounded-full w-10 h-10" />
        </div>
      </div>

      <div className="w-[65rem] my-8">
        <div>
          <button
            className="flex items-center gap-2 bg-transparent"
            onClick={handleBack}
          >
            <Image src={arrowLeft} alt="" />
            <p className="text-darkBeige font-bold text-sm">Go back</p>
          </button>
        </div>

        <div className="flex items-center justify-between bg-white rounded-md p-9 mt-4">
          <div className="flex items-center gap-4">
            <p className="text-lightPurple font-medium text-sm">Status</p>
            <div
              className={`px-8 py-3 rounded flex items-center gap-2 font-bold text-sm ${
                getStatusStyles(invoice!.status).textColor
              } ${getStatusStyles(invoice!.status).bgColor}`}
            >
              <div
                className={`w-2 h-2 rounded ${
                  getStatusStyles(invoice!.status).textColor
                } ${getStatusStyles(invoice!.status).bgColor}`}
              ></div>
              <p>{capitalizeFirstLetter(invoice!.status)}</p>
            </div>
          </div>

          <div className="space-x-5">
            <button className="bg-[#f9fafe] text-lighterPurple font-bold rounded-full px-11 py-8 text-sm">
              Edit
            </button>
            <button className="bg-errorRed text-white font-bold rounded-full px-9 py-6 text-sm">
              Delete
            </button>
            <button className="bg-purple text-white font-bold rounded-full px-9 py-6 text-sm">
              Mark as paid
            </button>
          </div>
        </div>

        <div className="bg-white rounded mt-8 p-12">
          <div className="flex justify-between">
            <div className="space-y-4">
              <div className="">
                <span className="text-lightPurple font-bold">#</span>
                <h3 className="text-darkBeige font-bold inline-block text-lg">
                  {invoice?.id}
                </h3>
              </div>

              <p className="font-medium text-xs text-lighterPurple">
                {invoice?.description}
              </p>
            </div>

            <div className="text-right font-medium text-lighterPurple">
              <p>{invoice?.senderAddress.street}</p>
              <p>{invoice?.senderAddress.country}</p>
              <p>{invoice?.senderAddress.postCode}</p>
              <p>{invoice?.senderAddress.city}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-40">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lighterPurple font-medium text-xs">
                  Invoice Date
                </h3>
                <p className="text-darkBeige font-bold text-sm">
                  {formatDate(invoice!.createdAt)}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lighterPurple font-medium text-xs">
                  Payment Due
                </h3>
                <p className="text-darkBeige font-bold text-sm">
                  {formatDate(invoice!.paymentDue)}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lighterPurple font-medium text-xs">
                Bill to
              </h3>

              <h2 className="mt-2 font-bold text-darkBeige text-sm">
                {invoice?.clientName}
              </h2>

              <div className="mt-5 text-lighterPurple font-medium text-xs">
                <p>{invoice?.clientAddress.street}</p>
                <p>{invoice?.clientAddress.city}</p>
                <p>{invoice?.clientAddress.postCode}</p>
                <p>{invoice?.clientAddress.country}</p>
              </div>
            </div>
            <div className="space-y-5">
              <h3 className="text-lighterPurple font-medium text-xs">
                Sent to
              </h3>
              <p className="text-darkBeige font-bold text-sm">
                {invoice?.clientEmail}
              </p>
            </div>
          </div>

          <div className="mt-8 bg-[#f9fafe] p-10 flex justify-between rounded-tr-lg rounded-tl-lg">
            <div className="space-y-8">
              <h2 className="text-lighterPurple font-medium text-xs">
                Item Name
              </h2>
              {invoice?.items.map((item, index) => (
                <h3 key={index} className="text-darkBeige font-bold text-sm">
                  {item.name}
                </h3>
              ))}
            </div>
            <div className="space-y-8">
              <h2 className="text-lighterPurple font-medium text-xs">QTY.</h2>
              {invoice?.items.map((item, index) => (
                <h3
                  key={index}
                  className="text-lighterPurple font-bold text-sm text-right"
                >
                  {item.quantity}
                </h3>
              ))}
            </div>
            <div className="space-y-8">
              <h2 className="text-lighterPurple font-medium text-xs text-right">
                Price
              </h2>
              {invoice?.items.map((item, index) => (
                <div key={index} className="text-lighterPurple space-x-1">
                  <span>£</span>
                  <h3 className="inline-block font-bold text-sm">
                    {formatMoney(item.price)}
                  </h3>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              <h2 className="text-lighterPurple font-medium text-xs text-right">
                Total
              </h2>
              {invoice?.items.map((item, index) => (
                <div key={index} className="text-darkBeige space-x-1">
                  <span>£</span>
                  <h3 className="inline-block font-bold text-sm">
                    {formatMoney(item.total)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#373b53] rounded-bl-lg rounded-br-lg p-10 flex justify-between text-white">
            <p className="font-medium text-xs">Amount Due</p>
            <div className="space-x-1 font-bold text-2xl">
              <span>£</span>
              <p className="inline-block">{formatMoney(invoice!.total)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
