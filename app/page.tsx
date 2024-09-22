"use client";

import Image from "next/image";
import logo from "@/images/logo.svg";
import moonIcon from "@/images/icon-moon.svg";
import avatar from "@/images/image-avatar.jpg";
import { useProvider } from "@/context/provider";
import Navigation from "@/components/Navigation";

export default function Home() {
  const { invoiceDetails } = useProvider();
  console.log(invoiceDetails);

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

      <div>
        <Navigation />
      </div>
    </main>
  );
}
