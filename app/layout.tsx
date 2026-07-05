import type { Metadata } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Cursor } from "@/components/Cursor";
import { HeroLoader } from "@/components/HeroLoader";
import { Menu } from "@/components/Menu";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Htet Lin Ko — Full-stack engineer",
  description:
    "Portfolio of Htet Lin Ko, full-stack engineer. Shipping HR SaaS at Better HR and building end-to-end systems on the side.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-bg text-bone antialiased">
        <LenisProvider>{children}</LenisProvider>
        <GrainOverlay />
        <Cursor />
        <HeroLoader />
        <Menu />
      </body>
    </html>
  );
}
