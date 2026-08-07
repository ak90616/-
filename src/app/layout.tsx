import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  title: "極簡商店",
  description: "一個示範用的電商網站",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
