"use client";

import Image from "next/image";
import logo from "@/images/logo.svg";
import moonIcon from "@/images/icon-moon.svg";
import avatar from "@/images/image-avatar.jpg";
import { useProvider } from "@/context/provider";
import Navigation from "@/components/Navigation";
import InvoiceComponent from "@/components/InvoiceComponent";
import arrowRight from "@/images/icon-arrow-right.svg";
import InvoiceForm from "@/components/InvoiceForm";

export default function Home() {
  const { invoiceDetails, showForm } = useProvider();

  const invoices = invoiceDetails?.map((invoice) => (
    <InvoiceComponent
      id={invoice.id}
      key={invoice.id}
      createdAt={invoice.createdAt}
      paymentDue={invoice.paymentDue}
      description={invoice.description}
      paymentTerms={invoice.paymentTerms}
      clientName={invoice.clientName}
      clientEmail={invoice.clientEmail}
      status={invoice.status}
      total={invoice.total}
      arrowRight={arrowRight}
    />
  ));

  return (
    <main className="flex flex-col lg:flex-row gap-4 lg:gap-[20rem]">
      <div className="bg-[#373b53] lg:w-24 lg:h-screen lg:rounded-tr-3xl lg:rounded-br-3xl flex flex-row lg:flex-col justify-between lg:pb-8">
        <div className="bg-gradient-to-b from-purple to-lightPurple w-24 h-24 flex items-center justify-center rounded-tr-3xl rounded-br-3xl">
          <Image src={logo} alt="" className="mx-auto" />
        </div>

        <div className="flex lg:flex-col items-center justify-center gap-4 lg:gap-8">
          <Image src={moonIcon} alt="" />
          <div className="bg-[#494e6e] w-full h-[1px]" />
          <Image src={avatar} alt="" className="rounded-full w-10 h-10" />
        </div>
      </div>

      <div className={showForm ? "relative -z-10" : undefined}>
        <Navigation />
        {invoices}
      </div>
      {showForm && <InvoiceForm />}
    </main>
  );
}
