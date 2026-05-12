"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="bg-[#111111]" style={{ paddingTop: "60px", paddingBottom: "60px" }} ref={ref}>
      <div className="max-w-6xl mx-auto" style={{ paddingLeft: "clamp(24px, 5vw, 80px)", paddingRight: "clamp(24px, 5vw, 80px)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
          style={{ marginBottom: "32px" }}
        >
          <div>
            <p className="text-white/30 text-xs uppercase tracking-[0.2em]" style={{ marginBottom: "8px" }}>Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Parlons de votre projet.
            </h2>
          </div>
          <p className="text-white/35 text-sm">Réponse garantie sous 24h. Devis gratuit et sans engagement.</p>
        </motion.div>

        {/* Grille 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* Sébastien */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/5 border border-white/8 rounded-2xl flex flex-col justify-between"
            style={{ padding: "28px" }}
          >
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest" style={{ marginBottom: "20px" }}>Votre interlocuteur</p>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" style={{ marginBottom: "14px" }}>
                <span className="text-white/50 text-xs font-mono">SM</span>
              </div>
              <p className="text-white font-semibold text-base" style={{ marginBottom: "6px" }}>Sébastien Martinez</p>
              <p className="text-white/40 text-xs leading-relaxed">Fondateur de Take Car Convoyage.</p>
            </div>
            <a
              href="#devis"
              className="inline-block text-center bg-white text-[#111111] text-xs font-semibold rounded-xl hover:bg-white/90 transition-colors"
              style={{ marginTop: "24px", padding: "10px 16px" }}
            >
              Demander un devis
            </a>
          </motion.div>

          {/* Téléphone */}
          <motion.a
            href="tel:0678150839"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/5 border border-white/8 rounded-2xl flex flex-col justify-between group hover:bg-white/8 transition-colors"
            style={{ padding: "28px" }}
          >
            <p className="text-white/30 text-xs uppercase tracking-widest" style={{ marginBottom: "20px" }}>Téléphone</p>
            <div className="flex items-end justify-between">
              <p className="text-white font-semibold text-base">06 78 15 08 39</p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white/50 transition-colors mb-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:smartinezz@orange.fr"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/5 border border-white/8 rounded-2xl flex flex-col justify-between group hover:bg-white/8 transition-colors"
            style={{ padding: "28px" }}
          >
            <p className="text-white/30 text-xs uppercase tracking-widest" style={{ marginBottom: "20px" }}>Email</p>
            <div className="flex items-end justify-between gap-2">
              <p className="text-white font-semibold text-sm break-all">smartinezz@orange.fr</p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white/50 transition-colors shrink-0 mb-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </motion.a>

          {/* Zone */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white/5 border border-white/8 rounded-2xl flex flex-col justify-between"
            style={{ padding: "28px" }}
          >
            <p className="text-white/30 text-xs uppercase tracking-widest" style={{ marginBottom: "20px" }}>Zone d&apos;intervention</p>
            <div>
              <p className="text-white font-semibold text-base">France & Europe</p>
              <p className="text-white/35 text-xs" style={{ marginTop: "4px" }}>Livraison en Bretagne</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
