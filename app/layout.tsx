import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Take Car Convoyage – Convoyage & Rapatriement Automobile | Devis Gratuit",
  description: "Service de convoyage et rapatriement automobile en France et depuis l'Europe. Pour particuliers et professionnels. Réponse sous 24h, devis gratuit et sans engagement.",
  keywords: [
    "convoyage voiture",
    "convoyage automobile",
    "rapatriement véhicule",
    "convoyeur auto",
    "transport véhicule",
    "convoyage particulier",
    "convoyage professionnel",
    "take car convoyage",
    "convoyage France",
    "convoyage Europe",
    "rapatriement automobile France",
    "convoyage Ille-et-Vilaine",
    "convoyage Rennes",
  ],
  openGraph: {
    title: "Take Car Convoyage – Convoyage & Rapatriement Automobile",
    description: "Service de convoyage et rapatriement automobile en France et depuis l'Europe. Devis gratuit sous 24h.",
    url: "https://www.takecarconvoyage.fr",
    siteName: "Take Car Convoyage",
    locale: "fr_FR",
    type: "website",
  },
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
