import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adrian Yeoh | Luxury Property Advisor, Kuala Lumpur",
  description:
    "Buying and selling advisory across Kuala Lumpur's prime neighbourhoods. KLCC, Bangsar, Damansara Heights, Mont Kiara, Kenny Hills. Demo site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
