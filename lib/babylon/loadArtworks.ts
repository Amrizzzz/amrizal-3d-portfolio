// lib/babylon/loadArtworks.ts
import { Scene, Vector3, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { portfolioData } from "@/data/portfolio";

export const loadArtworks = (scene: Scene) => {
  // 1. Lobby Banner Panel (Dinding Belakang Lobi)
  createPanel(
    scene,
    "lobbyPanel",
    new Vector3(0, 2.5, -19.6),
    new Vector3(0, 0, 0),
    7,
    3.5,
    (texture) => {
      const container = new GUI.StackPanel();
      container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
      texture.addControl(container);

      const title = new GUI.TextBlock();
      title.text = portfolioData.lobby.title;
      title.color = "#ffffff";
      title.fontSize = 34;
      title.fontWeight = "bold";
      title.height = "60px";
      title.textWrapping = true;
      container.addControl(title);

      const subtitle = new GUI.TextBlock();
      subtitle.text = portfolioData.lobby.subtitle;
      subtitle.color = "#d1d5db";
      subtitle.fontSize = 20;
      subtitle.height = "100px";
      subtitle.textWrapping = true;
      container.addControl(subtitle);
    }
  );

  // 2. About Self Panel (Dinding Kiri Lobi)
  createPanel(
    scene,
    "aboutPanel",
    new Vector3(-9.6, 2.3, -15),
    new Vector3(0, Math.PI / 2, 0),
    6,
    3.8,
    (texture) => {
      const container = new GUI.StackPanel();
      container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
      texture.addControl(container);

      const title = new GUI.TextBlock();
      title.text = portfolioData.about.title;
      title.color = "#c48c58";
      title.fontSize = 30;
      title.fontWeight = "bold";
      title.height = "50px";
      container.addControl(title);

      Object.entries(portfolioData.about.details).forEach(([key, val]) => {
        const line = new GUI.TextBlock();
        line.text = `${key}: ${val}`;
        line.color = "#f3f4f6";
        line.fontSize = 18;
        line.height = "32px";
        line.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        container.addControl(line);
      });
    }
  );

  // 3. Projects Panels (Dinding Lorong Utama)
  portfolioData.projects.forEach((proj, idx) => {
    const isLeft = idx % 2 === 0;
    const xPos = isLeft ? -9.6 : 9.6;
    const zPos = -4 + Math.floor(idx / 2) * 8;
    const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;

    createPanel(
      scene,
      `projectPanel_${proj.id}`,
      new Vector3(xPos, 2.3, zPos),
      new Vector3(0, rotY, 0),
      5.5,
      3.2,
      (texture) => {
        const container = new GUI.StackPanel();
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        texture.addControl(container);

        const title = new GUI.TextBlock();
        title.text = proj.title;
        title.color = "#ffffff";
        title.fontSize = 28;
        title.fontWeight = "bold";
        title.height = "45px";
        container.addControl(title);

        const date = new GUI.TextBlock();
        date.text = `Published: ${proj.publishDate}`;
        date.color = "#c48c58";
        date.fontSize = 16;
        date.height = "25px";
        container.addControl(date);

        const desc = new GUI.TextBlock();
        desc.text = proj.description;
        desc.color = "#9ca3af";
        desc.fontSize = 18;
        desc.height = "50px";
        desc.textWrapping = true;
        container.addControl(desc);

        const btn = GUI.Button.CreateSimpleButton(`btn_${proj.id}`, "Visit Project ↗");
        btn.width = "180px";
        btn.height = "42px";
        btn.color = "white";
        btn.cornerRadius = 21;
        btn.background = "#c48c58";
        btn.fontSize = 16;
        btn.fontWeight = "bold";
        btn.onPointerUpObservable.add(() => {
          if (proj.link) window.open(proj.link, "_blank");
        });
        container.addControl(btn);
      }
    );
  });
};

function createPanel(
  scene: Scene,
  name: string,
  position: Vector3,
  rotation: Vector3,
  width: number,
  height: number,
  setupUI: (texture: GUI.AdvancedDynamicTexture) => void
) {
  // Bingkai 3D
  const frame = MeshBuilder.CreateBox(`${name}_frame`, { width: width + 0.2, height: height + 0.2, depth: 0.08 }, scene);
  frame.position = position;
  frame.rotation = rotation;

  const frameMat = new StandardMaterial(`${name}_frameMat`, scene);
  frameMat.diffuseColor = Color3.FromHexString("#2a2a2a");
  frameMat.specularColor = Color3.FromHexString("#555555");
  frame.material = frameMat;

  // Canvas 2D di Permukaan Mesh
  const plane = MeshBuilder.CreatePlane(name, { width, height }, scene);
  plane.position = position.add(
    new Vector3(
      Math.sin(rotation.y) * 0.05,
      0,
      Math.cos(rotation.y) * 0.05
    )
  );
  plane.rotation = rotation;

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane, width * 180, height * 180);
  
  const rect = new GUI.Rectangle();
  rect.width = 1;
  rect.height = 1;
  rect.cornerRadius = 12;
  rect.color = "#c48c58";
  rect.thickness = 2;
  rect.background = "rgba(18, 18, 18, 0.95)";
  rect.paddingTop = "12px";
  rect.paddingBottom = "12px";
  rect.paddingLeft = "16px";
  rect.paddingRight = "16px";
  advancedTexture.addControl(rect);

  setupUI(advancedTexture);
}
