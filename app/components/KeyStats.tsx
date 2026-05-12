"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: boolean;
  delay: number;
}

function AnimatedCounter({ target, prefix = "", suffix = "", label, delay }: StatProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, target, delay, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center md:items-start"
    >
      <motion.span
        className="font-bold text-white leading-none"
        style={{ fontSize: "clamp(3rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
      >
        {rounded}
      </motion.span>
      <span
        className="text-white/40 uppercase tracking-widest mt-3"
        style={{ fontSize: "11px" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function KeyStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { target: 500, prefix: "+", suffix: "", label: "Missions réalisées", delay: 0 },
    { target: 100, prefix: "", suffix: "%", label: "Véhicules assurés", delay: 0.15 },
    { target: 5, prefix: "", suffix: "j", label: "Délai livraison max", delay: 0.3 },
    { target: 24, prefix: "", suffix: "h", label: "Réponse devis garantie", delay: 0.45 },
  ];

  return (
    <section className="bg-[#111111]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="section-inner max-w-6xl mx-auto" ref={ref}>

        {/* Ligne décorative animée */}
        <div className="overflow-hidden mb-14">
          <motion.div
            className="h-px bg-white/10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ originX: 0 }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>

        {/* Ligne décorative animée bas */}
        <div className="overflow-hidden mt-14">
          <motion.div
            className="h-px bg-white/10"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            style={{ originX: 1 }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white/25 text-xs uppercase tracking-[0.2em] text-center mt-8"
        >
          Take Car Convoyage — Bretagne, France &amp; Europe
        </motion.p>

      </div>
    </section>
  );
}
