import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/components/ui/alignui/notification-provider";
import { Toaster } from "@/components/ui/alignui/toast";
import Header from "@/components/Header";


const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "Portfolite – Framer Portfolio Template",
  description:
    "Crafting bold brand identities and packaging systems that help founders launch unforgettable experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.className} antialiased`}>
      <body className="relative min-h-screen bg-[#050505] text-white">
        <Header/>
        {children}
        <NotificationProvider />
        <Toaster />
      </body>
    </html>
  );
}
