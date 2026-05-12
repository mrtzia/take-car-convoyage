"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Comment ça marche", href: "#comment" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#111111] overflow-visible" style={{ zIndex: 9999 }}>
      <div className="flex items-center justify-between py-0" style={{ paddingLeft: "0px", paddingRight: "10px" }}>

        {/* Logo + Nom */}
        <a href="#hero" className="flex items-center gap-3 py-2">
          <Image
            src="/logo.png"
            alt="Take Car Convoyage"
            width={44}
            height={44}
            className="object-contain flex-shrink-0"
          />
          <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap">
            Take Car Convoyage
          </span>
        </a>

        {/* Desktop links + bouton */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm whitespace-nowrap transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#devis"
            className="bg-white text-[#111111] text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-150 hover:bg-white/90"
            style={{ padding: "10px 28px" }}
          >
            Demander un devis
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-3 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          type="button"
          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span className={`h-px bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`h-px bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="section-inner md:hidden bg-[#111111] border-t border-white/10 py-5 flex flex-col gap-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white text-base"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#devis"
              onClick={() => setMenuOpen(false)}
              className="bg-white text-[#111111] text-sm font-semibold rounded-full text-center block"
              style={{ padding: "12px 16px", marginLeft: "4px", marginRight: "4px" }}
            >
              Demander un devis
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
