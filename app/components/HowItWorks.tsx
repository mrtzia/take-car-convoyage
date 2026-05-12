"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Demandez un devis",
    description:
      "Remplissez le formulaire avec les informations de votre véhicule et sa localisation. Réponse garantie sous 24h.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Confirmation\n& organisation",
    description:
      "Notre équipe vous contacte, confirme les détails du convoyage et organise la prise en charge à votre convenance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Récupération\ndu véhicule",
    description:
      "Le convoyeur récupère votre véhicule à l'adresse convenue, n'importe où en France ou en Europe.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Livraison\nen Bretagne",
    description:
      "Votre véhicule vous est remis en main propre en Bretagne, dans les 5 jours, à l'adresse et l'heure convenues.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const contentVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 48 : -48,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -48 : 48,
    opacity: 0,
    filter: "blur(6px)",
  }),
};

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // map [0,1] → [0, steps.length-1], quantize
    const raw = v * steps.length;
    const next = Math.min(Math.floor(raw), steps.length - 1);
    if (next !== current) {
      setDir(next > current ? 1 : -1);
      setCurrent(next);
    }
  });

  return (
    /* Outer: tall enough to drive 4 scroll steps */
    <div ref={containerRef} id="comment" style={{ height: `${steps.length * 90}vh` }}>

      {/* Sticky viewport */}
      <div
        className="sticky top-0 overflow-hidden bg-[#f5f4f0]"
        style={{ height: "100vh" }}
      >
        {/* ─── Big watermark numbers (all rendered, crossfade) ─── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {steps.map((step, i) => (
            <motion.span
              key={step.number}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute right-0 bottom-0 font-bold text-[#111111] leading-none"
              style={{
                fontSize: "clamp(10rem, 28vw, 22rem)",
                opacity: 0,
                letterSpacing: "-0.05em",
                lineHeight: 0.85,
                color: "rgba(17,17,17,0.045)",
              }}
            >
              {step.number}
            </motion.span>
          ))}
        </div>

        {/* ─── Inner layout ─── */}
        <div
          className="section-inner max-w-6xl mx-auto h-full flex flex-col"
          style={{ paddingTop: "100px", paddingBottom: "48px" }}
        >
          {/* Top label */}
          <div style={{ marginBottom: "auto" }}>
            <p className="text-[#111]/30 text-xs uppercase tracking-[0.2em]">
              Processus
            </p>
          </div>

          {/* ─── Step content ─── */}
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current}
                custom={dir}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Icon pill */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl bg-[#111111] flex items-center justify-center text-white"
                  >
                    {steps[current].icon}
                  </div>
                  <span className="font-mono text-[#111]/20 text-xs tracking-widest">
                    {steps[current].number} / 0{steps.length}
                  </span>
                </div>

                {/* Title — big & tight */}
                <h2
                  className="font-bold text-[#111111] leading-tight mb-6"
                  style={{
                    fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                    letterSpacing: "-0.03em",
                    whiteSpace: "pre-line",
                    maxWidth: "700px",
                  }}
                >
                  {steps[current].title}
                </h2>

                {/* Description */}
                <p
                  className="text-[#111]/45 leading-relaxed"
                  style={{
                    fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                    maxWidth: "460px",
                  }}
                >
                  {steps[current].description}
                </p>

                {/* CTA on last step */}
                {current === steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="flex items-center gap-6 mt-10"
                  >
                    <a
                      href="#devis"
                      className="bg-[#111111] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors duration-200"
                      style={{ padding: "14px 32px" }}
                    >
                      Démarrer maintenant
                    </a>
                    <a
                      href="#contact"
                      className="text-sm text-[#111111]/40 hover:text-[#111111] underline underline-offset-4 transition-colors duration-200"
                    >
                      Poser une question
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Progress bar bottom ─── */}
          <div className="flex items-center gap-3 relative z-10" style={{ paddingTop: "32px" }}>
            {steps.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === current ? 40 : 14,
                  backgroundColor:
                    i < current
                      ? "#111111"
                      : i === current
                      ? "#111111"
                      : "rgba(17,17,17,0.12)",
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="h-[2px] rounded-full"
              />
            ))}
            <span className="text-[#111]/20 text-[11px] font-mono ml-1">
              {current + 1}&thinsp;/&thinsp;{steps.length}
            </span>

            {/* Scroll hint */}
            {current < steps.length - 1 && (
              <motion.div
                className="ml-auto flex items-center gap-2 text-[#111]/25"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
