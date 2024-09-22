import Image from "next/image";
import { useProvider } from "@/context/provider";
import arrowIcon from "@/images/icon-arrow-down.svg";
import plusIcon from "@/images/icon-plus.svg";

export default function Navigation() {
  const { invoiceDetails } = useProvider();

  return (
    <main className="w-[65rem] my-16 flex items-center justify-between">
      <div>
        <h1 className="font-bold text-4xl text-darkBeige">Invoices</h1>
        <p className="font-medium text-xs text-strongPurple">
          There are {invoiceDetails.length} total invoices
        </p>
      </div>

      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <p>Filter by status</p>
          <Image src={arrowIcon} alt="" />
        </div>
        <div>
          <button className="p-2 bg-purple flex items-center gap-2 font-bold text-sm text-white rounded-full">
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
