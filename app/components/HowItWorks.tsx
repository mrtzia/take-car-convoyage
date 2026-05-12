"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Demandez un devis",
    description:
      "Remplissez le formulaire avec les informations de votre véhicule et sa localisation. Vous recevez une réponse sous 24h.",
  },
  {
    number: "02",
    title: "Confirmation et organisation",
    description:
      "Notre équipe vous contacte, confirme les détails du convoyage et organise la prise en charge.",
  },
  {
    number: "03",
    title: "Récupération du véhicule",
    description:
      "Le convoyeur prend en charge votre véhicule à l'adresse convenue, n'importe où en Europe.",
  },
  {
    number: "04",
    title: "Livraison en Bretagne",
    description:
      "Votre véhicule vous est remis en main propre en Bretagne dans un délai de 5 jours maximum, à l'adresse et à l'heure convenues.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="comment" className="bg-[#f5f4f0]" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
      <div className="section-inner max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "16px" }}
        >
          <p className="text-[#111111]/35 text-xs uppercase tracking-[0.2em]" style={{ marginBottom: "16px" }}>
            Processus
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#111111]">
            Comment ça
            <br />
            fonctionne.
          </h2>
        </motion.div>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#111111]/50 text-base leading-relaxed max-w-xl"
          style={{ marginBottom: "56px" }}
        >
          Gagnez du temps et de l&apos;argent. Votre véhicule est inspecté, récupéré et livré en Bretagne. Vous ne bougez pas, on s&apos;occupe de tout.
        </motion.p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#dddcd8] border border-[#dddcd8] rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#f5f4f0] hover:bg-white transition-colors duration-200"
              style={{ padding: "36px 32px" }}
            >
              {/* Numéro + Titre alignés */}
              <div className="flex items-baseline gap-3" style={{ marginBottom: "16px" }}>
                <span className="text-xs font-mono text-[#111111]/25 shrink-0">{step.number}</span>
                <h3 className="text-sm font-semibold text-[#111111] leading-snug">
                  {step.title}
                </h3>
              </div>
              <p className="text-[#111111]/45 text-xs leading-relaxed" style={{ paddingLeft: "24px" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-6"
          style={{ marginTop: "48px" }}
        >
          <a
            href="#devis"
            className="bg-[#111111] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors duration-150"
            style={{ padding: "14px 32px" }}
          >
            Démarrer maintenant
          </a>
          <a
            href="#contact"
            className="text-sm text-[#111111]/45 hover:text-[#111111] underline underline-offset-4 transition-colors"
          >
            Poser une question
          </a>
        </motion.div>

      </div>
    </section>
  );
}
