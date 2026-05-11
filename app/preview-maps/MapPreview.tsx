"use client";

import { useEffect, useRef } from "react";

const styles = [
  {
    id: 1,
    name: "Positron",
    desc: "Blanc épuré — minimaliste",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  },
  {
    id: 2,
    name: "Dark Matter",
    desc: "Fond noir — style sombre",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  },
  {
    id: 3,
    name: "Positron (sans labels)",
    desc: "Blanc ultra-épuré — aucun texte",
    url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
  },
  {
    id: 4,
    name: "ESRI Street Map",
    desc: "Professionnel & précis",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: 5,
    name: "ESRI Light Gray",
    desc: "Gris clair ultra-neutre",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: 6,
    name: "OpenStreetMap FR",
    desc: "Noms en français",
    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
  },
];

function SingleMap({ url, id }: { url: string; id: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !ref.current) return;

      if (!document.querySelector("link[href*='leaflet']")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      const map = L.map(ref.current!, {
        center: [46.5, 3.5],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
      });

      mapRef.current = map;

      L.tileLayer(url, { maxZoom: 19 }).addTo(map);

      // Destination dot
      L.circleMarker([48.148858, -1.694597], {
        radius: 7,
        color: "white",
        fillColor: "#111",
        fillOpacity: 1,
        weight: 2,
      }).addTo(map);

      // Route example Munich → Rennes
      L.polyline([[48.1351, 11.5820], [48.148858, -1.694597]], {
        color: "#111",
        weight: 1.2,
        opacity: 0.3,
      }).addTo(map);
    });

    return () => {
      cancelled = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (mapRef.current) (mapRef.current as any).remove();
      mapRef.current = null;
    };
  }, [url]);

  return (
    <div className="flex flex-col gap-0">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111] text-white font-bold text-sm mb-2"
      >
        {id}
      </div>
      <div
        ref={ref}
        className="w-full rounded-xl overflow-hidden border border-black/10"
        style={{ height: "260px" }}
      />
    </div>
  );
}

export default function MapPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {styles.map((s) => (
        <div key={s.id} className="flex flex-col gap-3">
          <SingleMap url={s.url} id={s.id} />
          <div>
            <p className="font-semibold text-[#111] text-sm">{s.name}</p>
            <p className="text-[#111]/45 text-xs">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
