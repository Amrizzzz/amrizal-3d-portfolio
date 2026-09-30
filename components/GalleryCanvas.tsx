// src/components/GalleryCanvas.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createScene } from "@/lib/babylon/createScene";
import { Vector3, Scene, UniversalCamera } from "@babylonjs/core";
import { portfolioData } from "@/data/portfolio";
import { Maximize, MousePointer, Info, Move, ShieldAlert, Sparkles, X } from "lucide-react";

export default function GalleryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);

  // States
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showEscHint, setShowEscHint] = useState(true);

  // Touch Virtual Joystick States
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [joystickDelta, setJoystickDelta] = useState({ x: 0, y: 0 });
  const touchLookRef = useRef<{ lastX: number; lastY: number; active: boolean }>({
    lastX: 0,
    lastY: 0,
    active: false,
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || "ontouchstart" in window;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Inisialisasi Babylon.js Scene
    const { engine, scene } = createScene(canvasRef.current);
    sceneRef.current = scene;

    // 2. Render Loop
    engine.runRenderLoop(() => {
      scene.render();

      // Periksa raycast dari tengah layar secara kontinyu untuk efek indikator cursor
      if (canvasRef.current) {
        const pickResult = scene.pick(
          window.innerWidth / 2,
          window.innerHeight / 2
        );

        if (pickResult?.hit && pickResult.pickedMesh) {
          const meshName = pickResult.pickedMesh.name;
          const isClickable =
            meshName.includes("btn") ||
            meshName.includes("project") ||
            meshName.includes("label") ||
            meshName.includes("textPlane");
          setIsHoveringClickable(isClickable);
        } else {
          setIsHoveringClickable(false);
        }
      }
    });

    // 3. Pointer Lock Change Listener
    const onPointerLockChange = () => {
      const locked = document.pointerLockElement === canvasRef.current;
      setIsPointerLocked(locked);
      if (locked) {
        setShowEscHint(true);
      }
    };
    document.addEventListener("pointerlockchange", onPointerLockChange);

    // 4. Handle Canvas Resize
    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  // Handle Klik Canvas untuk Lock Pointer / Click Raycast
  const handleCanvasClick = () => {
    if (isMobile) return;

    if (!isPointerLocked) {
      canvasRef.current?.requestPointerLock();
    } else if (sceneRef.current) {
      // Jika pointer sudah ter-lock dan user mengklik, lakukan Raycast di tengah layar
      const pickResult = sceneRef.current.pick(
        window.innerWidth / 2,
        window.innerHeight / 2
      );

      if (pickResult?.hit && pickResult.pickedMesh) {
        const meshName = pickResult.pickedMesh.name;

        // Cari tautan proyek yang cocok berdasarkan ID mesh
        portfolioData.projects.forEach((proj) => {
          if (meshName.includes(proj.id) && proj.link) {
            window.open(proj.link, "_blank");
          }
        });
      }
    }
  };

  // Fullscreen Handler untuk Mobile
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // ================= MOBILE TOUCH CONTROL HANDLERS =================
  const handleTouchStartLeft = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setJoystickActive(true);
    setJoystickPos({ x: touch.clientX, y: touch.clientY });
    setJoystickDelta({ x: 0, y: 0 });
  };

  const handleTouchMoveLeft = (e: React.TouchEvent) => {
    if (!joystickActive || !sceneRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickPos.x;
    const dy = touch.clientY - joystickPos.y;

    const maxDist = 50;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const clampedDist = Math.min(dist, maxDist);
    const angle = Math.atan2(dy, dx);

    const nx = (Math.cos(angle) * clampedDist) / maxDist;
    const ny = (Math.sin(angle) * clampedDist) / maxDist;

    setJoystickDelta({ x: nx * 35, y: ny * 35 });

    // Gerakkan Kamera berdasarkan Analog Vector
    const camera = sceneRef.current.activeCamera;
    if (camera) {
      const speed = 0.15;
      const forward = camera.getDirection(new Vector3(0, 0, 1));
      const right = camera.getDirection(new Vector3(1, 0, 0));

      forward.y = 0;
      forward.normalize();
      right.y = 0;
      right.normalize();

      camera.position.addInPlace(forward.scale(-ny * speed));
      camera.position.addInPlace(right.scale(nx * speed));
    }
  };

  const handleTouchEndLeft = () => {
    setJoystickActive(false);
    setJoystickDelta({ x: 0, y: 0 });
  };

  // Touch Drag Kanan (Look Around)
  const handleTouchStartRight = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchLookRef.current = {
      lastX: touch.clientX,
      lastY: touch.clientY,
      active: true,
    };
  };

  const handleTouchMoveRight = (e: React.TouchEvent) => {
    if (!touchLookRef.current.active || !sceneRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchLookRef.current.lastX;
    const dy = touch.clientY - touchLookRef.current.lastY;

    touchLookRef.current.lastX = touch.clientX;
    touchLookRef.current.lastY = touch.clientY;

    // PERBAIKAN DI SINI: Lakukan casting ke UniversalCamera
    const camera = sceneRef.current.activeCamera as UniversalCamera;
    
    if (camera) {
      const sensitivity = 0.004;
      camera.rotation.y += dx * sensitivity;
      camera.rotation.x += dy * sensitivity;

      // Batasi rotasi vertikal (pitch)
      camera.rotation.x = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, camera.rotation.x)
      );
    }
  };

  const handleTouchEndRight = () => {
    touchLookRef.current.active = false;
  };

  return (
    <div className="relative h-full w-full overflow-hidden select-none bg-black">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="h-full w-full touch-none outline-none cursor-pointer"
        id="renderCanvas"
      />

      {/* ================= CROSSHAIR / POINTER DI TENGAH LAYAR ================= */}
      <div className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
        <div
          className={`rounded-full transition-all duration-200 flex items-center justify-center ${
            isHoveringClickable
              ? "h-10 w-10 border-2 border-amber-400 bg-amber-400/20 scale-125 shadow-lg shadow-amber-500/50"
              : "h-6 w-6 border border-white/50 bg-white/10"
          }`}
        >
          <div
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              isHoveringClickable ? "bg-amber-300 animate-ping" : "bg-white"
            }`}
          />
        </div>
      </div>

      {/* ================= OVERLAY DESKTOP: POINTER LOCK & ESC INFORMATIONAL BANNER ================= */}
      {!isMobile && (
        <>
          {/* Petunjuk Awal (Belum Lock) */}
          {!isPointerLocked && (
            <div className="pointer-events-none absolute inset-x-0 bottom-12 z-30 flex justify-center px-4">
              <div className="flex items-center gap-3 rounded-full bg-zinc-900/90 border border-amber-500/40 px-6 py-3.5 text-sm text-white backdrop-blur-md shadow-2xl animate-bounce">
                <MousePointer size={18} className="text-amber-400" />
                <span>
                  Klik di mana saja pada galeri untuk menggerakkan kamera 3D
                </span>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300 font-mono">
                  WASD / Panah
                </span>
              </div>
            </div>
          )}

          {/* Notifikasi ESC (Sudah Lock) */}
          {isPointerLocked && showEscHint && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full bg-black/80 border border-zinc-700 px-5 py-2.5 text-xs text-zinc-200 backdrop-blur-md shadow-xl transition-all">
              <Info size={16} className="text-amber-400 shrink-0" />
              <span>Tekan <strong className="text-amber-400 font-mono">ESC</strong> untuk menampilkan cursor kembali</span>
              <button
                onClick={() => setShowEscHint(false)}
                className="ml-2 hover:text-white transition-colors"
                aria-label="Tutup petunjuk"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </>
      )}

      {/* ================= CONTROLLER KONTROL MOBILE / TOUCH OVERLAY ================= */}
      {isMobile && (
        <>
          {/* Tombol Fullscreen / Layar Lebar Auto Mode */}
          <div className="absolute top-4 right-4 z-40 flex gap-2">
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 rounded-full bg-black/80 border border-amber-500/40 px-3.5 py-2 text-xs font-semibold text-amber-300 backdrop-blur-md active:scale-95 shadow-lg"
            >
              <Maximize size={14} />
              Layar Lebar
            </button>
          </div>

          {/* ZONA SENTUH KIRI: Virtual Analog Joystick (Jalan) */}
          <div
            onTouchStart={handleTouchStartLeft}
            onTouchMove={handleTouchMoveLeft}
            onTouchEnd={handleTouchEndLeft}
            className="absolute bottom-0 left-0 w-1/2 h-1/2 z-30 touch-none flex items-center justify-center p-8"
          >
            {/* Indikator Virtual Joystick Ring */}
            <div className="relative h-28 w-28 rounded-full border-2 border-amber-400/40 bg-black/30 backdrop-blur-xs flex items-center justify-center shadow-inner">
              <div
                className="absolute h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-80 shadow-lg transition-transform duration-75"
                style={{
                  transform: `translate(${joystickDelta.x}px, ${joystickDelta.y}px)`,
                }}
              />
              <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest pointer-events-none">
                Jalan
              </span>
            </div>
          </div>

          {/* ZONA SENTUH KANAN: Drag Rotasi Kamera (Look Around) */}
          <div
            onTouchStart={handleTouchStartRight}
            onTouchMove={handleTouchMoveRight}
            onTouchEnd={handleTouchEndRight}
            className="absolute bottom-0 right-0 w-1/2 h-1/2 z-30 touch-none flex flex-col items-center justify-center p-8"
          >
            <div className="pointer-events-none rounded-full bg-black/40 border border-white/20 px-4 py-2 text-[11px] text-zinc-300 backdrop-blur-xs flex items-center gap-1.5">
              <Move size={14} className="text-amber-400 animate-pulse" />
              Geser untuk Putar Kamera
            </div>
          </div>
        </>
      )}
    </div>
  );
}