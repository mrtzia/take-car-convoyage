"use client";

import { motion } from "framer-motion";

const DEST = { x: 95, y: 162 };

const routes = [
  { id: "amsterdam", label: "Amsterdam", sx: 192, sy: 74,  qx: 152, qy: 112, delay: 0,   duration: 3.8 },
  { id: "munich",    label: "Munich",    sx: 275, sy: 112, qx: 205, qy: 130, delay: 1.2, duration: 4.2 },
  { id: "madrid",    label: "Madrid",    sx: 100, sy: 255, qx: 94,  qy: 205, delay: 0.6, duration: 3.6 },
  { id: "rome",      label: "Rome",      sx: 250, sy: 225, qx: 185, qy: 198, delay: 1.8, duration: 4.0 },
  { id: "lisbon",    label: "Lisbonne",  sx: 48,  sy: 248, qx: 60,  qy: 200, delay: 2.4, duration: 3.5 },
];

function bezier(sx: number, sy: number, qx: number, qy: number, t: number) {
  return {
    x: (1 - t) ** 2 * sx + 2 * (1 - t) * t * qx + t ** 2 * DEST.x,
    y: (1 - t) ** 2 * sy + 2 * (1 - t) * t * qy + t ** 2 * DEST.y,
  };
}

export default function MapAnimation() {
  return (
    <div className="relative w-full h-full bg-[#eeede9] flex items-center justify-center overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(#111 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <svg
        viewBox="0 0 380 280"
        className="w-full h-full"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      >
        {routes.map((route) => {
          const pts = [0, 0.2, 0.4, 0.6, 0.8, 1].map((t) =>
            bezier(route.sx, route.sy, route.qx, route.qy, t)
          );
          const cxKf = pts.map((p) => p.x);
          const cyKf = pts.map((p) => p.y);

          return (
            <g key={route.id}>
              {/* Dashed path */}
              <motion.path
                d={`M ${route.sx} ${route.sy} Q ${route.qx} ${route.qy} ${DEST.x} ${DEST.y}`}
                fill="none"
                stroke="#111111"
                strokeWidth="1"
                strokeOpacity="0.18"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: route.delay * 0.4, ease: "easeOut" }}
              />

              {/* City dot */}
              <circle cx={route.sx} cy={route.sy} r="2.5" fill="#111111" opacity="0.35" />

              {/* City label */}
              <text
                x={route.sx + 5}
                y={route.sy + 3.5}
                fontSize="7.5"
                fill="#111111"
                opacity="0.45"
                fontFamily="-apple-system, sans-serif"
              >
                {route.label}
              </text>

              {/* Moving car dot */}
              <motion.circle
                r="4.5"
                fill="#111111"
                opacity="0.85"
                animate={{ cx: cxKf, cy: cyKf }}
                transition={{
                  duration: route.duration,
                  delay: route.delay,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
              />

              {/* Tail / trail */}
              <motion.circle
                r="2.5"
                fill="#111111"
                opacity="0.25"
                animate={{ cx: cxKf, cy: cyKf }}
                transition={{
                  duration: route.duration,
                  delay: route.delay + 0.15,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                }}
              />
            </g>
          );
        })}

        {/* Destination: Bretagne — pulsing ring */}
        <motion.circle
          cx={DEST.x}
          cy={DEST.y}
          r="14"
          fill="#111111"
          opacity="0.07"
          animate={{ r: [14, 20, 14] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx={DEST.x} cy={DEST.y} r="6" fill="#111111" opacity="0.9" />
        <circle cx={DEST.x} cy={DEST.y} r="3" fill="white" opacity="0.9" />

        {/* Bretagne label */}
        <text
          x={DEST.x + 12}
          y={DEST.y - 6}
          fontSize="9"
          fill="#111111"
          opacity="0.85"
          fontWeight="bold"
          fontFamily="-apple-system, sans-serif"
        >
          Bretagne
        </text>
        <text
          x={DEST.x + 12}
          y={DEST.y + 6}
          fontSize="7"
          fill="#111111"
          opacity="0.4"
          fontFamily="-apple-system, sans-serif"
        >
          Destination
        </text>
      </svg>
    </div>
  );
}
