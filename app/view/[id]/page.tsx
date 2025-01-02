"use client";

import InvoiceComponent from "@/components/InvoiceComponent";
import { useProvider } from "@/context/provider";
import { useParams, useRouter } from "next/navigation";
import arrowRight from "@/images/icon-arrow-right.svg";

export default function ViewInvoice() {
  const { getViewById } = useProvider();

  const params = useParams();
  //   const router = useRouter();
  const id = params.id;

  if (!id) return <p>Loading...</p>;

  const invoice = getViewById(id);
  //   const handleBack = () => {
  //     router.back();
  //   };

  let invoiceDetails;

  if (invoice) {
    invoiceDetails = (
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
    );
  }

  return <div>{invoiceDetails}</div>;
}
