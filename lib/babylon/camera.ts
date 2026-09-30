// lib/babylon/camera.ts
import { Scene, Vector3, UniversalCamera } from "@babylonjs/core";

export const setupCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  // Posisi awal kamera di lobi galeri
  const camera = new UniversalCamera("PlayerCamera", new Vector3(0, 1.6, -16), scene);
  
  // Kamera menghadap ke tengah ruangan galeri
  camera.setTarget(new Vector3(0, 1.6, 0));
  camera.attachControl(canvas, true);

  // Pengaturan kecepatan dan sensitivitas kontrol FPS
  camera.speed = 0.5;
  camera.angularSensibility = 2500;
  
  // Tambahkan tombol WASD untuk pergerakan
  camera.keysUp.push(87);    // W
  camera.keysDown.push(83);  // S
  camera.keysLeft.push(65);  // A
  camera.keysRight.push(68); // D

  // Batasi kemiringan vertikal kamera (pitch) agar tidak terbalik
  camera.inertia = 0.7;

  // Fisika & Collision kamera pemain
  scene.gravity = new Vector3(0, -0.15, 0);
  camera.applyGravity = true;
  camera.ellipsoid = new Vector3(0.6, 0.85, 0.6); // Ukuran tubuh pemain
  camera.checkCollisions = true;

  return camera;
};