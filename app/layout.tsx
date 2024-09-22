import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { AppProvider } from "@/context/provider";
import "./globals.css";

const spartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoice App",
  description: "Create and share your invoice to get paid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body className={`${spartan.className} antialiased bg-lightBg`}>
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
