"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Livraison express partout en France / Europe",
    description:
      "Votre véhicule récupéré et livré en Bretagne en moins de 5 jours. Nous intervenons partout en France et au-delà des frontières sur demande.",
  },
  {
    number: "02",
    title: "Service aux particuliers / professionnels",
    description:
      "Vous avez acheté un véhicule en France ou à l'étranger. Nous le récupérons sur place et vous le livrons directement, sans que vous ayez à vous déplacer.",
  },
  {
    number: "03",
    title: "Expertise & présence sur place",
    description:
      "Avant toute récupération, notre équipe inspecte le véhicule, vérifie son état réel et défend vos intérêts sur le prix. Vous économisez le déplacement et les mauvaises surprises.",
  },
  {
    number: "04",
    title: "Véhicule assuré",
    description:
      "Chaque convoyage est couvert. Votre véhicule est pris en charge en toute sécurité, de la récupération à la livraison.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="bg-white" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
      <div className="section-inner max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          style={{ marginBottom: "64px" }}
        >
          <div>
            <p className="text-[#111111]/35 text-xs uppercase tracking-[0.2em]" style={{ marginBottom: "16px" }}>
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#111111]">
              Ce que nous
              <br />
              proposons.
            </h2>
          </div>
          <p className="text-[#111111]/45 max-w-xs leading-relaxed text-sm">
            Un service complet de convoyage automobile, pensé pour simplifier votre expérience.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e5e4e0] border border-[#e5e4e0] rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white hover:bg-[#f9f8f6] transition-colors duration-300"
              style={{ padding: "40px" }}
            >
              {/* Numéro + Titre alignés */}
              <div className="flex items-baseline gap-4" style={{ marginBottom: "20px" }}>
                <span className="text-xs font-mono text-[#111111]/25 shrink-0">{s.number}</span>
                <h3 className="text-lg font-semibold text-[#111111] leading-snug">
                  {s.title}
                </h3>
              </div>
              <p className="text-[#111111]/50 leading-relaxed text-sm" style={{ paddingLeft: "28px" }}>
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
