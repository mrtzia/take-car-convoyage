"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const MapLeaflet = dynamic(() => import("./MapLeaflet"), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="bg-[#f5f4f0]" style={{ paddingTop: "82px" }}>

      {/* Sub-nav */}
      <div className="border-b border-black/8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 py-2 flex-wrap px-4">
          {[
            { label: "Take Car Convoyage", href: "#hero" },
            { label: "Services", href: "#services" },
            { label: "Processus", href: "#comment" },
            { label: "Devis gratuit", href: "#devis" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a key={item.label} href={item.href}
              className="text-[10px] text-[#111111]/45 hover:text-[#111111] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="section-inner max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">

        {/* ── Left col ── */}
        <div className="flex flex-col justify-between py-10 md:pl-6 md:pr-14 md:py-14" style={{ minHeight: "calc(100vh - 108px)" }}>

          {/* HAUT : badge + titre + phrase + bouton */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#111111">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#111111" }}>Bretagne, FR</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#111111",
                marginBottom: "24px",
              }}
            >
              Rapatriement automobile<br />avec Take Car Convoyage.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
              style={{ color: "rgba(17,17,17,0.5)", fontSize: "16px", lineHeight: 1.6, marginBottom: "32px" }}
            >
              Ajoutez les détails de votre demande, et c&apos;est parti.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            >
              <a href="#devis" style={{
                display: "inline-block",
                backgroundColor: "#111111",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                padding: "14px 32px",
                borderRadius: "12px",
                textDecoration: "none",
              }}>
                Demander un devis
              </a>
            </motion.div>
          </div>

          {/* BAS : stats */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.32 }}
            style={{ borderTop: "1px solid rgba(17,17,17,0.06)", paddingTop: "28px", display: "flex", gap: "40px" }}
          >
            {[
              { value: "100%", label: "Véhicules assurés" },
              { value: "+500", label: "Missions réalisées" },
              { value: "24h",  label: "Réponse devis" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#111111" }}>{s.value}</div>
                <div style={{ fontSize: "10px", color: "rgba(17,17,17,0.35)", marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ── Right col — Map ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:block relative"
        >
          <MapLeaflet />
        </motion.div>
      </div>
    </section>
  );
}
