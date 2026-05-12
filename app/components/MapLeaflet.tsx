"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
mapboxgl.accessToken = TOKEN;

const DEST: [number, number] = [-1.6946, 48.1489]; // Rennes

const DURATION = 9000; // toutes partent et arrivent en même temps

const ROUTES = [
  { id: "strasbourg", label: "Strasbourg", origin: [7.7521, 48.5734] as [number, number], color: "#4A90E2" },
  { id: "lille",      label: "Lille",      origin: [3.0573, 50.6292] as [number, number], color: "#4A90E2" },
  { id: "montpellier",label: "Montpellier",origin: [3.8767, 43.6119] as [number, number], color: "#4A90E2" },
];

export default function MapLeaflet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [2.5, 47.5],
      zoom: 5.0,
      pitch: 45,
      bearing: -10,
      interactive: false,
      attributionControl: false,
    });

    mapRef.current = map;

    // Force la map à se redimensionner quand le conteneur change
    const resizeObserver = new ResizeObserver(() => {
      if (mapRef.current) mapRef.current.resize();
    });
    resizeObserver.observe(containerRef.current);

    map.on("load", async () => {
      if (cancelled) return;

      // Terrain 3D
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.8 });
      map.setFog({
        color: "rgb(15,20,40)",
        "high-color": "rgb(30,40,80)",
        "horizon-blend": 0.04,
      });

      // Fetch toutes les routes en parallèle
      const routeCoordsList = await Promise.all(
        ROUTES.map(async (r) => {
          try {
            const res = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${r.origin[0]},${r.origin[1]};${DEST[0]},${DEST[1]}?geometries=geojson&overview=full&access_token=${TOKEN}`
            );
            const data = await res.json();
            return data.routes[0].geometry.coordinates as [number, number][];
          } catch {
            return [r.origin, DEST] as [number, number][];
          }
        })
      );

      if (cancelled) return;

      // Créer sources et layers pour chaque route
      ROUTES.forEach((r, i) => {
        const coords = routeCoordsList[i];

        // Fond gris
        map.addSource(`route-bg-${r.id}`, {
          type: "geojson",
          data: { type: "Feature", geometry: { type: "LineString", coordinates: coords }, properties: {} },
        });
        map.addLayer({
          id: `route-bg-${r.id}`,
          type: "line",
          source: `route-bg-${r.id}`,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#ddd", "line-width": 4, "line-opacity": 0.5 },
        });

        // Ligne animée
        map.addSource(`route-anim-${r.id}`, {
          type: "geojson",
          data: { type: "Feature", geometry: { type: "LineString", coordinates: [] }, properties: {} },
        });
        map.addLayer({
          id: `route-anim-${r.id}`,
          type: "line",
          source: `route-anim-${r.id}`,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": r.color, "line-width": 5, "line-opacity": 0.9 },
        });

        // Halo
        map.addLayer({
          id: `route-glow-${r.id}`,
          type: "line",
          source: `route-anim-${r.id}`,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": r.color, "line-width": 12, "line-opacity": 0.12, "line-blur": 4 },
        }, `route-anim-${r.id}`);

      });

      // Premier layer de symboles (noms de villes) — on insère les marqueurs AVANT
      const firstSymbolLayer = map.getStyle().layers.find((l) => l.type === "symbol")?.id;

      // Points de départ sous les labels
      map.addSource("origins", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: ROUTES.map((r) => ({
            type: "Feature",
            geometry: { type: "Point", coordinates: r.origin },
            properties: {},
          })),
        },
      });
      map.addLayer({ id: "origins-outer", type: "circle", source: "origins",
        paint: { "circle-radius": 8, "circle-color": "#4A90E2", "circle-opacity": 0.2 },
      }, firstSymbolLayer);
      map.addLayer({ id: "origins-inner", type: "circle", source: "origins",
        paint: { "circle-radius": 5, "circle-color": "#4A90E2", "circle-stroke-width": 2, "circle-stroke-color": "white" },
      }, firstSymbolLayer);

      // Destination Rennes sous les labels
      map.addSource("dest", {
        type: "geojson",
        data: { type: "Feature", geometry: { type: "Point", coordinates: DEST }, properties: {} },
      });
      map.addLayer({ id: "dest-outer", type: "circle", source: "dest",
        paint: { "circle-radius": 10, "circle-color": "#E74C3C", "circle-opacity": 0.2 },
      }, firstSymbolLayer);
      map.addLayer({ id: "dest-inner", type: "circle", source: "dest",
        paint: { "circle-radius": 6, "circle-color": "#E74C3C", "circle-stroke-width": 2, "circle-stroke-color": "white" },
      }, firstSymbolLayer);

      // Caméra 3D — animation séparée, indépendante du tick
      const animateCamera = () => {
        map.easeTo({ bearing: -10, pitch: 45, duration: 500 });
        setTimeout(() => {
          map.easeTo({ bearing: 5, pitch: 58, duration: DURATION - 800, easing: (t) => t });
        }, 800);
      };

      // Masquer ces villes dans les layers existants de la carte
      const cityNames = ["Rennes", "Strasbourg", "Lille", "Montpellier"];
      map.getStyle().layers
        .filter((l) => l.type === "symbol")
        .forEach((l) => {
          try {
            const existing = map.getFilter(l.id);
            map.setFilter(l.id, [
              "all",
              ...(existing ? [existing] : []),
              ["!", ["in", ["get", "name"], ["literal", cityNames]]],
              ["!", ["in", ["get", "name_fr"], ["literal", cityNames]]],
              ["!", ["in", ["get", "name_en"], ["literal", cityNames]]],
            ]);
          } catch {
            // ignorer les layers non filtrables
          }
        });

      // Labels blancs gras pour les villes des trajets
      map.addSource("city-labels", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            ...ROUTES.map((r) => ({
              type: "Feature" as const,
              geometry: { type: "Point" as const, coordinates: r.origin },
              properties: { name: r.label },
            })),
            {
              type: "Feature" as const,
              geometry: { type: "Point" as const, coordinates: DEST },
              properties: { name: "Rennes" },
            },
          ],
        },
      });

      map.addLayer({
        id: "city-labels-layer",
        type: "symbol",
        source: "city-labels",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-size": 15,
          "text-offset": [0, -2.2],
          "text-anchor": "bottom",
          "text-allow-overlap": true,
          "text-ignore-placement": true,
          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "viewport",
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "rgba(0,0,0,0.6)",
          "text-halo-width": 1.5,
        },
      });

      // Animer toutes les routes — throttle à 30fps
      const FRAME_MS = 1000 / 30;
      let lastFrame = 0;

      const runAllAnimations = () => {
        if (cancelled) return;

        ROUTES.forEach((r) => {
          (map.getSource(`route-anim-${r.id}`) as mapboxgl.GeoJSONSource).setData({
            type: "Feature", geometry: { type: "LineString", coordinates: [] }, properties: {},
          });
        });

        animateCamera();
        const start = Date.now();

        const tick = (timestamp: number) => {
          if (cancelled) return;

          // Throttle : sauter les frames trop rapprochées
          if (timestamp - lastFrame < FRAME_MS) {
            requestAnimationFrame(tick);
            return;
          }
          lastFrame = timestamp;

          const t = Math.min((Date.now() - start) / DURATION, 1);

          ROUTES.forEach((r, i) => {
            const coords = routeCoordsList[i];
            const total = coords.length - 1;
            const idx = Math.floor(t * total);
            const next = Math.min(idx + 1, total);
            const frac = t * total - idx;
            const lng = coords[idx][0] + (coords[next][0] - coords[idx][0]) * frac;
            const lat = coords[idx][1] + (coords[next][1] - coords[idx][1]) * frac;
            const drawn = [...coords.slice(0, idx + 1), [lng, lat]];

            (map.getSource(`route-anim-${r.id}`) as mapboxgl.GeoJSONSource).setData({
              type: "Feature", geometry: { type: "LineString", coordinates: drawn }, properties: {},
            });
          });

          if (t < 1) requestAnimationFrame(tick);
          else setTimeout(runAllAnimations, 2500);
        };

        requestAnimationFrame(tick);
      };

      setTimeout(runAllAnimations, 800);
    });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ minHeight: "500px" }} />;
}
