import Image from "next/image";
import { useProvider } from "@/context/provider";
import arrowIcon from "@/images/icon-arrow-down.svg";
import plusIcon from "@/images/icon-plus.svg";

export default function Navigation() {
  const { invoiceDetails, handleShowForm } = useProvider();

  return (
    <main className="lg:w-[65rem] my-8 flex items-center justify-between p-4 lg:p-0">
      <div>
        <h1 className="font-bold text-2xl md:text-4xl text-darkBeige">
          Invoices
        </h1>
        <p className="hidden md:block font-medium text-xs text-strongPurple">
          There are {invoiceDetails?.length} total invoices
        </p>
        <p className="md:hidden font-medium text-xs text-strongPurple">
          {invoiceDetails?.length} invoices
        </p>
      </div>

      <div className="flex items-center gap-6 md:gap-12">
        <div className="flex items-center gap-2">
          <p className="hidden md:block">Filter by status</p>
          <p className="md:hidden">Filter</p>
          <Image src={arrowIcon} alt="" />
        </div>
        <div>
          <button
            onClick={handleShowForm}
            className="hover:opacity-80 p-2 bg-purple flex items-center gap-2 font-bold text-sm text-white rounded-full"
          >
            <div className="bg-white rounded-full p-2">
              <Image src={plusIcon} alt="" />
            </div>
            New Invoice
          </button>
        </div>
      </div>
    </main>
  );
}
