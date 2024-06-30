"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const openSideBar = () => {
    setIsOpen(true);
  };
  const closeSideBar = () => {
    setIsOpen(false);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header openSideBar={openSideBar} />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
          }}
          containerStyle={{
            top: 80,
            left: 40,
          }}
        />
        <Sidebar isOpen={isOpen} closeSideBar={closeSideBar} />
      </body>
    </html>
  );
}
