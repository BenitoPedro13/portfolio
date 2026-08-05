import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Press_Start_2P, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/components/ui/alignui/notification-provider";
import { Toaster } from "@/components/ui/alignui/toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { GrainOverlay } from "@/components/motion/Backdrop";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site-url";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-press-start-2p",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.shortName}`,
  },
  description:
    "Full Stack Developer and Frontend Specialist building immersive web apps from concept to cloud. React, Next.js, NestJS, and cloud infrastructure.",
  keywords: [
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Rio de Janeiro",
    "Benito Pedro Xavier",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
  },
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
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressCountry: "BR",
    },
    sameAs: [profile.github, profile.linkedin],
    knowsLanguage: profile.languages.map((language) => language.name),
    description: profile.intro,
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${pressStart.variable} ${jetbrains.variable} scroll-smooth antialiased`}
    >
      <body
        className={`${plusJakarta.className} relative min-h-screen bg-[#050505] text-white selection:bg-[#F97316] selection:text-[#0a0503]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <GrainOverlay />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
        <NotificationProvider />
        <Toaster />
      </body>
    </html>
  );
}
