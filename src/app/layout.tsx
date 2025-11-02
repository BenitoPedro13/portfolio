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
  title: "Benito – Full-Stack Developer",
  description:
    "Building immersive web apps from concept to cloud. Full-Stack Developer specializing in React, Next.js, Node.js, and cloud solutions.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.className} ${pressStart.variable} antialiased`}>
      <body className="relative min-h-screen bg-[#050505] text-white">
        <Header/>
        {children}
        <NotificationProvider />
        <Toaster />
      </body>
    </html>
  );
}
