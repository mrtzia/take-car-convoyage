"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <motion.span
        className="font-bold text-white leading-none"
        style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.03em" }}
      >
        {rounded}
      </motion.span>
      <span
        className="text-white/40 uppercase tracking-widest mt-2"
        style={{ fontSize: "10px" }}
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
    { target: 100, prefix: "", suffix: "%", label: "Véhicules assurés", delay: 0.12 },
    { target: 5, prefix: "", suffix: "j", label: "Délai livraison max", delay: 0.24 },
    { target: 24, prefix: "", suffix: "h", label: "Réponse devis garantie", delay: 0.36 },
  ];

  return (
    <section className="bg-[#111111]" style={{ paddingTop: "44px", paddingBottom: "44px" }}>
      <div
        className="section-inner max-w-6xl mx-auto flex flex-col"
        ref={ref}
        style={{ gap: "24px" }}
      >

        {/* Bloc chiffres : flex row avec space-around */}
        <div className="flex flex-row flex-wrap items-start" style={{ justifyContent: "space-around", gap: "20px" }}>
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/25 uppercase tracking-[0.2em] text-center"
          style={{ fontSize: "9px" }}
        >
          Take Car Convoyage — Bretagne, France &amp; Europe
        </motion.p>

      </div>
    </section>
  );
}
