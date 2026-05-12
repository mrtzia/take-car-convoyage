"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    number: "01",
    title: "Demandez un devis",
    description: "Remplissez le formulaire avec les informations de votre véhicule et sa localisation. Réponse garantie sous 24h.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Confirmation & organisation",
    description: "Notre équipe vous contacte, confirme les détails du convoyage et organise la prise en charge à votre convenance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Récupération du véhicule",
    description: "Le convoyeur récupère votre véhicule à l'adresse convenue, n'importe où en France ou en Europe.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

// Car top-view SVG
function CarIcon({ color = "#111111" }: { color?: string }) {
  return (
    <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
      <rect x="1" y="6" width="34" height="10" rx="3" fill={color} />
      <rect x="7" y="2" width="18" height="9" rx="2" fill={color} />
      <circle cx="8" cy="17.5" r="2.5" fill={color === "#111111" ? "#555" : "rgba(17,17,17,0.3)"} />
      <circle cx="28" cy="17.5" r="2.5" fill={color === "#111111" ? "#555" : "rgba(17,17,17,0.3)"} />
      <rect x="8" y="3.5" width="6" height="4" rx="1" fill={color === "#111111" ? "rgba(255,255,255,0.15)" : "rgba(17,17,17,0.1)"} />
      <rect x="16" y="3.5" width="6" height="4" rx="1" fill={color === "#111111" ? "rgba(255,255,255,0.15)" : "rgba(17,17,17,0.1)"} />
    </svg>
  );
}

// Step x positions as % of road width (accounting for car width)
const STEP_X_PCT = [2, 34, 66, 92];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(-1);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Smooth car x position (0–100)
  const carX = useMotionValue(0);
  const carLeft = useTransform(carX, (v) => `calc(${v}% - 18px)`);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion.current) { setActiveStep(steps.length - 1); return; }
    let i = 0;
    const interval = setInterval(() => {
      setActiveStep(i);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 750);
    return () => clearInterval(interval);
  }, [inView]);

  // Animate car smoothly when activeStep changes
  useEffect(() => {
    if (activeStep < 0) return;
    const targetPct = STEP_X_PCT[Math.min(activeStep, steps.length - 1)];
    animate(carX, targetPct, { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] });
  }, [activeStep, carX]);

  const roadProgress = activeStep < 0 ? 0 : (activeStep / (steps.length - 1));

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

        {/* ── Desktop ── */}
        <div className="hidden md:block">

          {/* ── Route animée ── */}
          <div className="relative mb-10" style={{ height: "90px" }}>

            {/* SVG Route */}
            <svg
              viewBox="0 0 1000 90"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Route fond gris clair */}
              <path
                d="M 0,45 L 1000,45"
                stroke="rgba(17,17,17,0.08)"
                strokeWidth="28"
                strokeLinecap="round"
                fill="none"
              />
              {/* Route noire animée */}
              <motion.path
                d="M 0,45 L 1000,45"
                stroke="#111111"
                strokeWidth="28"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: roadProgress }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
              {/* Ligne centrale pointillée */}
              <motion.path
                d="M 0,45 L 1000,45"
                stroke="white"
                strokeWidth="2.5"
                strokeDasharray="28 18"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: roadProgress }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
            </svg>

            {/* Voiture qui glisse */}
            <motion.div
              className="absolute"
              style={{
                left: carLeft,
                top: "50%",
                translateY: "-50%",
                zIndex: 10,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
              }}
            >
              <CarIcon color="white" />
            </motion.div>

            {/* Points étapes */}
            <div className="absolute inset-0 flex justify-between items-center" style={{ paddingLeft: "1%", paddingRight: "1%" }}>
              {steps.map((step, i) => {
                const isActive = i <= activeStep;
                const isCurrent = i === activeStep;
                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center cursor-pointer"
                    aria-label={step.title}
                    style={{ zIndex: 20 }}
                  >
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "#111111" : "#f5f4f0",
                        borderColor: isActive ? "#111111" : "rgba(17,17,17,0.2)",
                        scale: isCurrent ? 1.25 : 1,
                        boxShadow: isCurrent ? "0 0 0 6px rgba(17,17,17,0.12)" : "0 0 0 0px rgba(17,17,17,0)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{ color: isActive ? "white" : "rgba(17,17,17,0.3)" }}
                    >
                      {step.icon}
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Numéros + noms sous la route */}
          <div className="grid grid-cols-4 gap-4" style={{ marginBottom: "32px" }}>
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  onClick={() => setActiveStep(i)}
                  className="cursor-pointer"
                >
                  <p className="text-[10px] font-mono text-[#111111]/30 mb-1">{step.number}</p>
                  <h3 className="text-sm font-semibold text-[#111111] leading-snug mb-2">{step.title}</h3>
                  <p className="text-xs text-[#111111]/45 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile — timeline verticale ── */}
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
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-1">
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
          style={{ marginTop: "48px" }}
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
