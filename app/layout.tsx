import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Take Car Convoyage – Rapatriement automobile en Ille-et-Vilaine",
  description: "Service de convoyage et rapatriement automobile en Ille-et-Vilaine depuis l'Europe. Professionnel et particulier. Demandez votre devis gratuit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#f5f4f0] text-[#111111]">{children}</body>
    </html>
  );
}
