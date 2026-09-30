// src/app/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ClassicView from "@/components/ClassicView";
import { Monitor, Box } from "lucide-react"; // dari lucide-react

// Dynamic import Babylon.js canvas agar tidak error "window is not defined" di server Next.js
const GalleryCanvas = dynamic(() => import("@/components/GalleryCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-[#1a1a1a] text-white">
      <p className="font-playfair text-xl tracking-widest animate-pulse">Loading 3D Experience...</p>
    </div>
  ),
});

export default function Home() {
  const [isClassicView, setIsClassicView] = useState(true);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* View Switcher Overlay */}
      <button
        onClick={() => setIsClassicView(!isClassicView)}
        className="absolute bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white backdrop-blur-md transition-transform hover:scale-105"
        aria-label="Toggle 3D or Classic View"
      >
        {isClassicView ? <Box size={16} /> : <Monitor size={16} />}
        {isClassicView ? "Switch to 3D Gallery" : "Switch to Classic View"}
      </button>

      {/* Render sesuai state */}
      {isClassicView ? <ClassicView /> : <GalleryCanvas />}
    </main>
  );
}