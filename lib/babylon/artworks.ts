// lib/babylon/artworks.ts
import { Scene, Vector3, MeshBuilder, StandardMaterial, Texture, Color3, SpotLight } from "@babylonjs/core";
import { AdvancedDynamicTexture, TextBlock, Control, Rectangle, Button, StackPanel } from "@babylonjs/gui";
import { portfolioData } from "@/data/portfolio";

export const loadArtworks = (scene: Scene) => {

  // Normal dinding ke rotasi Y agar objek menghadap penuh ke dalam ruangan
  const getRotationY = (normal: Vector3) => Math.atan2(normal.x, normal.z) + Math.PI;

  // --- HELPER CAHAYA SPOTLIGHT & FIXTURE HANGAT ---
  const addWallLampEffect = (
    name: string,
    framePos: Vector3,
    frameHeight: number,
    wallNormal: Vector3,
    showFixtureMesh: boolean = true
  ) => {
    const rotationY = getRotationY(wallNormal);
    const lampPos = framePos.add(new Vector3(0, frameHeight / 2 + 0.35, 0)).add(wallNormal.scale(0.08));

    // Render fisik kap lampu jika diset true
    if (showFixtureMesh) {
      const arm = MeshBuilder.CreateBox(`${name}_lampArm`, { width: 0.15, height: 0.08, depth: 0.35 }, scene);
      arm.position = lampPos;
      arm.rotation = new Vector3(0, rotationY, 0);

      const armMat = new StandardMaterial(`${name}_lampArmMat`, scene);
      armMat.diffuseColor = Color3.FromHexString("#222222");
      armMat.specularColor = Color3.FromHexString("#888888");
      armMat.maxSimultaneousLights = 8;
      arm.material = armMat;

      const head = MeshBuilder.CreateCylinder(`${name}_lampHead`, { diameter: 0.22, height: 0.25 }, scene);
      head.parent = arm;
      head.position = new Vector3(0, -0.06, -0.15);
      head.rotation = new Vector3(Math.PI / 4, 0, 0);
      head.material = armMat;

      const bulb = MeshBuilder.CreateSphere(`${name}_lampBulb`, { diameter: 0.12 }, scene);
      bulb.parent = head;
      bulb.position = new Vector3(0, -0.08, 0);

      const bulbMat = new StandardMaterial(`${name}_bulbMat`, scene);
      bulbMat.emissiveColor = Color3.FromHexString("#fff5ea");
      bulbMat.diffuseColor = Color3.FromHexString("#ffffff");
      bulb.material = bulbMat;
    }

    // Effek Cahaya Sorot Lampu (SpotLight Glow)
    const spotLightPos = lampPos.add(wallNormal.scale(0.3));
    const spotDir = framePos.subtract(spotLightPos).normalize();

    const spotLight = new SpotLight(`${name}_spot`, spotLightPos, spotDir, Math.PI / 2.2, 1.8, scene);
    spotLight.intensity = 2.2;
    spotLight.diffuse = Color3.FromHexString("#fff2df"); // Warm museum spot glow
    spotLight.specular = Color3.FromHexString("#ffffff");

    return spotLight;
  };


  // --- HELPER 1: Membuat Pigura Gambar & Spotlight ---
  const createPicture = (
    name: string,
    url: string,
    width: number,
    height: number,
    position: Vector3,
    wallNormal: Vector3,
    lamp?: boolean
  ) => {
    const rotationY = getRotationY(wallNormal);

    // Bingkai 3D
    const frame = MeshBuilder.CreateBox(`${name}_frame`, { width: width + 0.15, height: height + 0.15, depth: 0.08 }, scene);
    frame.position = position;
    frame.rotation = new Vector3(0, rotationY, 0);

    const frameMat = new StandardMaterial(`${name}_frameMat`, scene);
    frameMat.diffuseColor = Color3.FromHexString("#1a1a1a");
    frameMat.specularColor = Color3.FromHexString("#555555");
    frameMat.maxSimultaneousLights = 8;
    frame.material = frameMat;

    // Kanvas Gambar
    const pic = MeshBuilder.CreatePlane(`${name}_pic`, { width, height }, scene);
    pic.parent = frame;
    pic.position = new Vector3(0, 0, -0.042);

    const picMat = new StandardMaterial(`${name}_picMat`, scene);
    picMat.diffuseTexture = new Texture(url, scene);
    picMat.emissiveTexture = picMat.diffuseTexture;
    picMat.emissiveColor = new Color3(0.7, 0.7, 0.7);
    picMat.specularColor = new Color3(0.2, 0.2, 0.2);
    picMat.backFaceCulling = false;
    picMat.maxSimultaneousLights = 8;
    pic.material = picMat;

    // Aktifkan Cahaya Sorot Lampu
    if (lamp) {
      addWallLampEffect(name, position, height, wallNormal, true);
    }

    return frame;
  };

  // --- HELPER 2: Membuat Papan Teks (Plaque) Museum ---
  const createTextPlaque = (
    name: string,
    titleText: string,
    bodyText: string,
    width: number,
    height: number,
    position: Vector3,
    wallNormal: Vector3,
    linkUrl?: string,
    lamp?: boolean,
    titleAlignment?: "left" | "center" | "right",
    bodyAlignment?: "left" | "center" | "right",
    prjectDesc?: boolean
    
  ) => {
    const rotationY = getRotationY(wallNormal);

    // Papan Bingkai 3D
    const plaque = MeshBuilder.CreateBox(`${name}_plaque`, { width: width + 0.1, height: height + 0.1, depth: 0.06 }, scene);
    plaque.position = position;
    plaque.rotation = new Vector3(0, rotationY, 0);

    const plaqueMat = new StandardMaterial(`${name}_plaqueMat`, scene);
    plaqueMat.diffuseColor = Color3.FromHexString("#111111");
    plaqueMat.specularColor = Color3.FromHexString("#444444");
    plaqueMat.maxSimultaneousLights = 8;
    plaque.material = plaqueMat;

    // Surface Plane untuk Teks
    const textPlane = MeshBuilder.CreatePlane(`${name}_textPlane`, { width, height }, scene);
    textPlane.parent = plaque;
    textPlane.position = new Vector3(0, 0, -0.032);

    // Dynamic Texture GUI
    const texW = Math.round(width * 320);
    const texH = Math.round(height * 320);
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(textPlane, texW, texH);

    if (textPlane.material) {
      textPlane.material.backFaceCulling = false;
      (textPlane.material as StandardMaterial).maxSimultaneousLights = 8;
    }

    // Container Bingkai Teks
    const rect = new Rectangle();
    rect.width = 1;
    rect.height = 1;
    rect.color = "#c48c58";
    rect.thickness = 3;
    rect.background = "rgba(15, 15, 15, 0.96)";
    rect.cornerRadius = 12;
    rect.paddingTop = "16px";
    rect.paddingBottom = "16px";
    rect.paddingLeft = "20px";
    rect.paddingRight = "20px";
    advancedTexture.addControl(rect);

    const stack = new StackPanel();
    stack.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    rect.addControl(stack);

    // Judul Plakat
    if (titleText) {
      const titleBlock = new TextBlock();
      titleBlock.text = titleText;
      titleBlock.color = "#c48c58";
      titleBlock.fontSize = Math.round(texH * 0.10);
      titleBlock.fontWeight = "bold";
      titleBlock.height = `${Math.round(texH * 0.25)}px`;
      titleBlock.textWrapping = true;
      titleBlock.textHorizontalAlignment = titleAlignment === "left" ? Control.HORIZONTAL_ALIGNMENT_LEFT : titleAlignment === "right" ? Control.HORIZONTAL_ALIGNMENT_RIGHT : Control.HORIZONTAL_ALIGNMENT_CENTER;
      titleBlock.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      stack.addControl(titleBlock);
    }

    // Isi Teks
    if (bodyText) {
      const bodyBlock = new TextBlock();
      bodyBlock.text = bodyText;
      bodyBlock.color = "#ffffff";
      bodyBlock.fontSize = Math.round(texH * (prjectDesc ? 0.1 : 0.06) );
      bodyBlock.lineSpacing = "6px";
      bodyBlock.height = `${Math.round(texH * (linkUrl ? 0.50 : 0.70))}px`;
      bodyBlock.textWrapping = true;
      bodyBlock.textHorizontalAlignment = bodyAlignment === "left" ? Control.HORIZONTAL_ALIGNMENT_LEFT : bodyAlignment === "right" ? Control.HORIZONTAL_ALIGNMENT_RIGHT : Control.HORIZONTAL_ALIGNMENT_CENTER;
      bodyBlock.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
      stack.addControl(bodyBlock);
    }

    // Tombol Interaktif (See Project)
    if (linkUrl) {
      const btn = Button.CreateSimpleButton(`btn_${name}`, "See Project ↗");
      btn.width = `${Math.round(texW * 0.50)}px`;
      btn.height = `${Math.round(texH * 0.18)}px`;
      btn.color = "#ffffff";
      btn.background = "#c48c58";
      btn.cornerRadius = 18;
      btn.fontSize = Math.round(texH * 0.075);
      btn.fontWeight = "bold";
      btn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
      btn.onPointerUpObservable.add(() => {
        window.open(linkUrl, "_blank");
      });
      stack.addControl(btn);
    }

    // Aktifkan Cahaya Sorot Lampu
    if (lamp) {
      addWallLampEffect(name, position, height, wallNormal, true);
    }

    return plaque;
  };


  // ==========================================
  // DISTRIBUSI ELEMEN GALERI (POSISI PRESISE)
  // ==========================================

  // 1. DINDING BELAKANG (Lobi / Titik Masuk: Z = -19.7, menghadap +Z ke dalam ruangan)
  const backWallNormal = new Vector3(0, 0, 1);

  // Logo Lobi
  createPicture("logo", portfolioData.lobby.images.logo, 2.2, 1.0, new Vector3(-3.5, 3.7, -19.7), backWallNormal, true);

  // Foto Profil Utama
  createPicture("profile", portfolioData.lobby.images.profile, 2.2, 2.6, new Vector3(-3.5, 1.8, -19.7), backWallNormal, false);

  // Papan Sambutan Lobi
  createTextPlaque(
    "welcome",
    portfolioData.lobby.title,
    portfolioData.lobby.subtitle,
    4.5,
    3.0,
    new Vector3(3.0, 2.2, -19.7),
    backWallNormal,
    "",
    true,
    "center",
    "center"
  );

  // 2. PARTISI KIRI (Ruang "About My Self": Z = -10.3, menghadap -Z ke Lobi)
  const aboutNormal = new Vector3(0, 0, -1);
  const aboutDetailsText = Object.entries(portfolioData.about.details)
    .map(([k, v]) => `• ${k}: ${v}`)
    .join("\n");

  createTextPlaque(
    "about",
    portfolioData.about.title,
    aboutDetailsText,
    4.5,
    4.0,
    new Vector3(-7.0, 2.2, -10.3),
    aboutNormal,
    "",
    true,
    "center",
    "left"
  );

  // 3. DINDING LORONG PROJECTS (Kiri: X = -9.7 facing +X, Kanan: X = 9.7 facing -X)
  const leftWallNormal = new Vector3(1, 0, 0);   // Dinding kiri menghadap kanan (+X)
  const rightWallNormal = new Vector3(-1, 0, 0);  // Dinding kanan menghadap kiri (-X)

  const projectZPositions = [-5, -1, 3, 7];

  portfolioData.projects.forEach((proj, index) => {
    const isLeftWall = index % 2 === 0;
    const normal = isLeftWall ? leftWallNormal : rightWallNormal;
    const xPos = isLeftWall ? -9.7 : 9.7;
    const zPos = projectZPositions[index] ?? (-5 + index * 4);

    // Lukisan Proyek
    createPicture(`proj_${proj.id}`, proj.image, 2.6, 1.6, new Vector3(xPos, 2.7, zPos), normal, true);

    // Plakat Museum di bawah lukisan
    const descText = `${proj.description}\nPublished: ${proj.publishDate}`;
    createTextPlaque(
      `label_${proj.id}`,
      proj.title,
      descText,
      2.6,
      1.3,
      new Vector3(xPos, 1.0, zPos),
      normal,
      proj.link,
      false,
      "center",
      "center",
      true
    );
  });

  // 4. SAYAP KANAN - RIWAYAT / RESUME (Dinding Kanan Lorong: X = 9.7, facing -X)
  const expData = portfolioData.history.experience[0];
  const expBody = `${expData.company}\nRole: ${expData.role}\nPeriod: ${expData.date}\n\n• ${expData.points.join("\n• ")}`;
  createTextPlaque(
    "expPlaque",
    "WORK EXPERIENCE",
    expBody,
    3.2,
    2.2,
    new Vector3(9.7, 2.2, 12.0),
    rightWallNormal,
    "",
    true,
    "center",
    "left"
  );

  const eduText = portfolioData.history.education
    .map((e) => `• ${e.year}: ${e.degree}\n  ${e.institution}`)
    .join("\n\n");
  createTextPlaque(
    "eduPlaque",
    "EDUCATION",
    eduText,
    3.2,
    2.2,
    new Vector3(9.7, 2.2, 15.0),
    rightWallNormal,
    "",
    true,
    "center",
    "left"
  );

  const certText = portfolioData.history.certification
    .map((c) => `• ${c.year} - ${c.title}\n  Issuer: ${c.issuer}`)
    .join("\n\n");
  createTextPlaque(
    "certPlaque",
    "CERTIFICATIONS",
    certText,
    3.2,
    2.2,
    new Vector3(9.7, 2.2, 18.0),
    rightWallNormal,
    "",
    true,
    "center",
    "left"
  );

  // 5. DINDING UJUNG / EXIT (Dinding Depan: Z = 19.7, menghadap -Z)
  const frontWallNormal = new Vector3(0, 0, -1);
  const exitText = `${portfolioData.footer.copyright}\nContact: ${portfolioData.footer.contact}\n\nThank you for visiting my 3D Portfolio Gallery!`;
  createTextPlaque(
    "exitSign",
    "AMRIZAL 3D PORTFOLIO",
    exitText,
    4.2,
    2.0,
    new Vector3(0, 2.2, 19.7),
    frontWallNormal,
    "",
    true
  );
};