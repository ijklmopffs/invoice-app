import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { AppProvider } from "@/context/provider";
import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

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
        <body className={`${jost.className} antialiased bg-lightBg`}>
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
