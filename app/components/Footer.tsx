"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 py-10">
      <div className="max-w-6xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Image
          src="/logo.png"
          alt="Take Car Convoyage"
          width={110}
          height={40}
          className="object-contain opacity-80"
        />

        <p className="text-[#111111]/50 text-xs text-center">
          © {new Date().getFullYear()} Take Car Convoyage — Sébastien Martinez

        </p>

        <div className="flex gap-8">
          <a href="#services" className="text-[#111111]/50 hover:text-[#111111] text-xs transition-colors">Services</a>
          <a href="#devis" className="text-[#111111]/50 hover:text-[#111111] text-xs transition-colors">Devis</a>
          <a href="#contact" className="text-[#111111]/50 hover:text-[#111111] text-xs transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
