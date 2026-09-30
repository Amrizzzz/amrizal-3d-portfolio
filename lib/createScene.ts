// lib/babylon/createScene.ts
import { Engine, Scene, Vector3, FreeCamera, HemisphericLight, MeshBuilder, Color4 } from "@babylonjs/core";

export const createScene = (canvas: HTMLCanvasElement) => {
  // Inisialisasi engine
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
  
  // Buat scene
  const scene = new Scene(engine);
  
  // PERBAIKAN DI SINI: Gunakan Color4
  scene.clearColor = Color4.FromHexString("#0a0a0aff"); 

  // Kamera sementara 
  const camera = new FreeCamera("tempCamera", new Vector3(0, 1.6, -5), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);

  // Pencahayaan ambient sementara
  const light = new HemisphericLight("ambientLight", new Vector3(0, 1, 0), scene);
  light.intensity = 0.5;

  // Objek lantai sementara
  const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

  return { engine, scene };
};