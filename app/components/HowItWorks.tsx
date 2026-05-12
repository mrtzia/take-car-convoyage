"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Demandez un devis",
    description: "Remplissez le formulaire avec les informations de votre véhicule et sa localisation. Réponse garantie sous 24h.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Confirmation & organisation",
    description: "Notre équipe vous contacte, confirme les détails du convoyage et organise la prise en charge à votre convenance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Récupération du véhicule",
    description: "Le convoyeur récupère votre véhicule à l'adresse convenue, n'importe où en France ou en Europe.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v3h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Livraison en Bretagne",
    description: "Votre véhicule vous est remis en main propre en Bretagne, dans les 5 jours, à l'adresse et l'heure convenues.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(-1);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion.current) { setActiveStep(steps.length - 1); return; }
    let i = 0;
    const interval = setInterval(() => {
      setActiveStep(i);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 700);
    return () => clearInterval(interval);
  }, [inView]);

  const progressPct = activeStep < 0 ? 0 : ((activeStep) / (steps.length - 1)) * 100;

  return (
    <section id="comment" className="bg-[#f5f4f0]" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
      <div className="section-inner max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p className="text-[#111111]/35 text-xs uppercase tracking-[0.2em]" style={{ marginBottom: "12px" }}>
            Processus
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#111111]">
              Comment ça<br />fonctionne.
            </h2>
            <p className="text-[#111111]/45 text-sm leading-relaxed max-w-xs">
              Votre véhicule récupéré et livré en Bretagne. Vous ne bougez pas, on s&apos;occupe de tout.
            </p>
          </div>
        </motion.div>

        {/* ── Timeline Desktop (horizontal) ── */}
        <div className="hidden md:block">

          {/* Barre de progression */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#111111]/10 -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-px bg-[#111111] -translate-y-1/2 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progressPct / 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ right: 0 }}
            />

            {/* Points */}
            <div className="relative flex justify-between">
              {steps.map((step, i) => {
                const isActive = i <= activeStep;
                const isCurrent = i === activeStep;
                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    aria-label={step.title}
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#111111" : "#f5f4f0",
                        borderColor: isActive ? "#111111" : "rgba(17,17,17,0.2)",
                        scale: isCurrent ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{ color: isActive ? "white" : "rgba(17,17,17,0.3)" }}
                    >
                      {step.icon}
                    </motion.div>
                    <span className="text-[10px] font-mono text-[#111111]/30">{step.number}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cartes */}
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => setActiveStep(i)}
                  className="cursor-pointer rounded-2xl p-6 transition-shadow duration-200"
                  style={{
                    backgroundColor: isActive ? "white" : "transparent",
                    border: isActive ? "1px solid rgba(17,17,17,0.06)" : "1px solid transparent",
                    boxShadow: i === activeStep ? "0 4px 24px rgba(17,17,17,0.07)" : "none",
                  }}
                >
                  <h3 className="text-sm font-semibold text-[#111111] mb-3 leading-snug">{step.title}</h3>
                  <p className="text-xs text-[#111111]/45 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Timeline Mobile (vertical) ── */}
        <div className="md:hidden relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#111111]/10" />
          <motion.div
            className="absolute left-4 top-0 w-px bg-[#111111] origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: activeStep < 0 ? 0 : (activeStep / (steps.length - 1)) }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ height: "100%" }}
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveStep(i)}
                  className="flex gap-6 cursor-pointer"
                >
                  {/* Point */}
                  <motion.div
                    animate={{
                      backgroundColor: isActive ? "#111111" : "#f5f4f0",
                      borderColor: isActive ? "#111111" : "rgba(17,17,17,0.2)",
                      scale: isCurrent ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 relative z-10"
                    style={{ color: isActive ? "white" : "rgba(17,17,17,0.3)", marginTop: "2px" }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Contenu */}
                  <div
                    className="rounded-2xl p-5 flex-1 transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? "white" : "transparent",
                      border: isActive ? "1px solid rgba(17,17,17,0.06)" : "1px solid transparent",
                      boxShadow: isCurrent ? "0 4px 24px rgba(17,17,17,0.07)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-[#111111]/25">{step.number}</span>
                      <h3 className="text-sm font-semibold text-[#111111]">{step.title}</h3>
                    </div>
                    <p className="text-xs text-[#111111]/45 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={activeStep >= steps.length - 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-6"
          style={{ marginTop: "56px" }}
        >
          <a
            href="#devis"
            className="bg-[#111111] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors duration-200 cursor-pointer"
            style={{ padding: "14px 32px" }}
          >
            Démarrer maintenant
          </a>
          <a
            href="#contact"
            className="text-sm text-[#111111]/45 hover:text-[#111111] underline underline-offset-4 transition-colors duration-200 cursor-pointer"
          >
            Poser une question
          </a>
        </motion.div>

      </div>
    </section>
  );
}
