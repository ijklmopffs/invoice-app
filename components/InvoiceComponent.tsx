import {
  formatDate,
  capitalizeFirstLetter,
  formatMoney,
} from "@/helpers/helper";
import Image from "next/image";
import Link from "next/link";

interface InvoiceArray {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  total: number;
  arrowRight: string;
}

export default function InvoiceComponent({
  id,
  paymentDue,
  clientName,
  status,
  total,
  arrowRight,
}: InvoiceArray) {
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
    <>
      <Link href={`/view/${id}`} className="hidden md:block px-4 lg:px-0">
        <div className="hover:border-purple hover:border-2 cursor-pointer flex justify-between items-center bg-white rounded-md my-4 p-7">
          <div>
            <span className="text-lightPurple font-bold">#</span>
            <p className="text-darkBeige font-bold inline-block">{id}</p>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-lighterPurple font-medium text-sm">Due</span>
            <p className="text-strongPurple font-medium text-sm">
              {formatDate(paymentDue)}
            </p>
          </div>
          <h1 className="text-strongPurple font-medium text-sm">
            {clientName}
          </h1>
          <p className="font-bold text-sm">£ {formatMoney(total)}</p>
          <div
            className={`px-6 py-2 rounded flex items-center gap-2 font-bold text-sm ${
              getStatusStyles(status).textColor
            } ${getStatusStyles(status).bgColor}`}
          >
            <div
              className={`w-2 h-2 rounded ${
                getStatusStyles(status).textColor
              } ${getStatusStyles(status).bgColor}`}
            ></div>
            <p>{capitalizeFirstLetter(status)}</p>
          </div>

          <Image src={arrowRight} alt="icon" />
        </div>
      </Link>

      <div className="px-4 md:hidden">
        <Link href={`/view/${id}`} className="md:hidden">
          <div className="hover:border-purple space-y-3 hover:border-2 cursor-pointer flex justify-between items-center bg-white rounded-md my-4 p-7">
            <div>
              <div>
                <span className="text-lightPurple font-bold">#</span>
                <p className="text-darkBeige font-bold inline-block">{id}</p>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-lighterPurple font-medium text-sm">
                  Due
                </span>
                <p className="text-strongPurple font-medium text-sm">
                  {formatDate(paymentDue)}
                </p>
              </div>
              <p className="font-bold text-sm">£ {formatMoney(total)}</p>
            </div>
            <div className="space-y-3">
              <h1 className="text-strongPurple font-medium text-sm">
                {clientName}
              </h1>
              <div
                className={`px-6 py-2 rounded flex items-center gap-2 font-bold text-sm ${
                  getStatusStyles(status).textColor
                } ${getStatusStyles(status).bgColor}`}
              >
                <div
                  className={`w-2 h-2 rounded ${
                    getStatusStyles(status).textColor
                  } ${getStatusStyles(status).bgColor}`}
                ></div>
                <p>{capitalizeFirstLetter(status)}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
