import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from '@/contexts/AuthContext';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyGas App",
  description: "Aplicativo web para distribuidoras de gás",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
        <CartProvider>
          <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ flex: "0 0 0%" }}>
              <Header />
            </div>
            <div style={{ flex: "1 0 80%", overflow: "auto" }}>
              {children}
              <ToastContainer />
            </div>
          </div>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
