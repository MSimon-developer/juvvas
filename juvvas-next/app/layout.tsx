import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ThemeProvider } from "@/components/layout/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juvvas.com"),

  title: {
    default: "Juvvas",
    template: "%s | Juvvas",
  },

  description:
    "Find rentals, Airbnbs and properties for sale in Kenya.",

  keywords: [
    "Kenya real estate",
    "Property for sale",
    "Rentals",
    "Airbnb",
    "Homes",
    "Apartments",
    "Land",
    "Real Estate Kenya",
    "Juvvas",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      {
        url: "/FAVICONJUVVAS2.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/FAVICONJUVVAS2.png",
  },

  openGraph: {
    title: "Juvvas",
    description:
      "Find rentals, Airbnbs and properties for sale in Kenya.",
    url: "https://juvvas.com",
    siteName: "Juvvas",
    images: [
      {
        url: "/FAVICONJUVVAS2.png",
        width: 512,
        height: 512,
        alt: "Juvvas",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Juvvas",
    description:
      "Find rentals, Airbnbs and properties for sale in Kenya.",
    images: ["/FAVICONJUVVAS2.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}