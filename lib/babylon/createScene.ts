// lib/babylon/createScene.ts
import { Engine, Scene, Color4 } from "@babylonjs/core";
import { setupCamera } from "./camera";
import { setupLighting } from "./lighting";
import { buildRoom } from "./buildRoom";
import { loadArtworks } from "./artworks"; // <--- TAMBAHKAN IMPORT INI

export const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
  const scene = new Scene(engine);
  
  scene.clearColor = Color4.FromHexString("#0a0a0aff");

  // 1. Bangun Ruangan
  buildRoom(scene);

  // 2. Setup Kamera
  const camera = setupCamera(scene, canvas);

  // 3. Pencahayaan & Efek Post-Processing
  setupLighting(scene, camera);

  // 4. Pasang Lukisan & Karya Seni (TAHAP 3)
  loadArtworks(scene); // <--- PANGGIL FUNGSI DI SINI

  return { engine, scene };
};