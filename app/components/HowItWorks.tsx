"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Demandez un devis",
    description: "Remplissez le formulaire avec les informations de votre véhicule et sa localisation. Vous recevez une réponse sous 24h.",
    icon: "📋",
  },
  {
    number: "02",
    title: "Confirmation et organisation",
    description: "Notre équipe vous contacte, confirme les détails du convoyage et organise la prise en charge.",
    icon: "📞",
  },
  {
    number: "03",
    title: "Récupération du véhicule",
    description: "Le convoyeur prend en charge votre véhicule à l'adresse convenue, n'importe où en Europe.",
    icon: "🚗",
  },
  {
    number: "04",
    title: "Livraison en Bretagne",
    description: "Votre véhicule vous est remis en main propre en Bretagne dans un délai de 5 jours maximum.",
    icon: "📍",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const interval = setInterval(() => {
      setActiveStep(current);
      current++;
      if (current >= steps.length) clearInterval(interval);
    }, 800);
    return () => clearInterval(interval);
  }, [inView]);

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
            Comment ça<br />fonctionne.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[#111111]/50 text-base leading-relaxed max-w-xl"
          style={{ marginBottom: "64px" }}
        >
          Gagnez du temps et de l&apos;argent. Votre véhicule est inspecté, récupéré et livré en Bretagne. Vous ne bougez pas, on s&apos;occupe de tout.
        </motion.p>

        {/* Roadmap */}
        <div className="relative">

          {/* Ligne verticale de fond */}
          <div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-[#111111]/10"
            style={{ transform: "translateX(-50%)" }}
          />

          {/* Ligne de progression animée */}
          <motion.div
            className="absolute left-[19px] md:left-1/2 top-0 w-px bg-[#111111]"
            style={{ transform: "translateX(-50%)" }}
            initial={{ height: "0%" }}
            animate={{ height: activeStep >= steps.length - 1 ? "100%" : `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveStep(i)}
                >
                  {/* Contenu */}
                  <div className={`md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <motion.div
                      animate={isCurrent ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-block rounded-2xl p-6 transition-all duration-300 ${isActive ? "bg-white shadow-sm" : "bg-transparent"}`}
                    >
                      <div className="flex items-center gap-3 mb-3" style={{ justifyContent: i % 2 === 0 ? "flex-end" : "flex-start" }}>
                        <span className="text-2xl">{step.icon}</span>
                        <span className="text-xs font-mono text-[#111111]/25">{step.number}</span>
                      </div>
                      <h3 className="text-base font-semibold text-[#111111] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#111111]/50 leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Point central */}
                  <div className="absolute left-[11px] md:left-1/2 top-6 md:top-8 md:-translate-x-1/2 z-10">
                    <motion.div
                      animate={isCurrent ? { scale: 1.4 } : isActive ? { scale: 1 } : { scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${isActive ? "bg-[#111111] border-[#111111]" : "bg-white border-[#111111]/20"}`}
                    />
                  </div>

                  {/* Espace vide côté opposé sur desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={activeStep >= steps.length - 1 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6"
          style={{ marginTop: "56px" }}
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
