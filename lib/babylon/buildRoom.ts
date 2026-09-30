// lib/babylon/buildRoom.ts
import { Scene, Vector3, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

export const buildRoom = (scene: Scene) => {
  // Wajib aktifkan deteksi tabrakan di level scene
  scene.collisionsEnabled = true;

  // --- MATERIAL ---
  // Lantai: Coklat Muda Warm Wood / Tan
  const floorMat = new StandardMaterial("floorMat", scene);
  floorMat.diffuseColor = Color3.FromHexString("#d2a679");
  floorMat.specularColor = Color3.FromHexString("#2d1f10");
  floorMat.maxSimultaneousLights = 10; // Aman dari GL_MAX_VERTEX_UNIFORM_BUFFERS limit (12)

  // Dinding: Cream Muda Elegans
  const wallMat = new StandardMaterial("wallMat", scene);
  wallMat.diffuseColor = Color3.FromHexString("#fbf6ee");
  wallMat.specularColor = Color3.FromHexString("#111111");
  wallMat.maxSimultaneousLights = 10; // Batas aman UBO WebGL2

  // Atap / Langit-langit: Putih Bersih
  const ceilingMat = new StandardMaterial("ceilingMat", scene);
  ceilingMat.diffuseColor = Color3.FromHexString("#ffffff");
  ceilingMat.emissiveColor = Color3.FromHexString("#222222");
  ceilingMat.maxSimultaneousLights = 10;

  // --- LANTAI & ATAP ---
  const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 40 }, scene);
  ground.material = floorMat;
  ground.checkCollisions = true;

  const ceiling = MeshBuilder.CreatePlane("ceiling", { width: 20, height: 40 }, scene);
  ceiling.position.y = 4.5;
  ceiling.rotation.x = Math.PI / 2;
  ceiling.material = ceilingMat;

  // --- FUNGSI HELPER UNTUK DINDING ---
  const createWall = (name: string, width: number, depth: number, x: number, z: number) => {
    const height = 4.5; // Tinggi ruangan
    const wall = MeshBuilder.CreateBox(name, { width, height, depth }, scene);
    wall.position = new Vector3(x, height / 2, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
    return wall;
  };

  // --- DINDING UTAMA (Keliling Ruangan 20x40) ---
  createWall("wallFront", 20, 0.5, 0, 20);     // Ujung depan (Exit)
  createWall("wallBack", 20, 0.5, 0, -20);     // Ujung belakang (Lobi)
  createWall("wallLeft", 0.5, 40, -10, 0);     // Sisi Kiri
  createWall("wallRight", 0.5, 40, 10, 0);     // Sisi Kanan

  // --- PARTISI (Membentuk Alur Galeri) ---
  createWall("partitionLobbyLeft", 6, 0.5, -7, -10);
  createWall("partitionLobbyRight", 6, 0.5, 7, -10);

  // Pilar di tengah lorong Projects & Experience
  createWall("centerPillar1", 1, 1, 0, 0);
  createWall("centerPillar2", 1, 1, 0, 10);

  return { ground };
};