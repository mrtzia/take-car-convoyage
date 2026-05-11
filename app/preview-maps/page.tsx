"use client";
import dynamic from "next/dynamic";

const MapPreview = dynamic(() => import("./MapPreview"), { ssr: false });

export default function PreviewMaps() {
  return (
    <div className="bg-[#f5f4f0] min-h-screen p-10">
      <h1 className="text-3xl font-bold text-[#111] mb-2">Choisissez votre style de carte</h1>
      <p className="text-[#111]/50 text-sm mb-10">Dis-moi le numéro que tu préfères</p>
      <MapPreview />
    </div>
  );
}
