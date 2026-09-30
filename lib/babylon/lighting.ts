// lib/babylon/lighting.ts
import { Scene, Vector3, HemisphericLight, DefaultRenderingPipeline, Color3, Color4, Camera } from "@babylonjs/core";

export const setupLighting = (scene: Scene, camera: Camera) => {
  // Cahaya ambient lembut bernuansa putih hangat
  const ambientLight = new HemisphericLight("ambientLight", new Vector3(0, 1, 0), scene);
  ambientLight.intensity = 0.7;
  ambientLight.diffuse = Color3.FromHexString("#fff0e6"); 
  ambientLight.groundColor = Color3.FromHexString("#222222");

  // Post-processing Pipeline untuk efek sinematik
  const pipeline = new DefaultRenderingPipeline("defaultPipeline", true, scene, [camera]);
  pipeline.samples = 4; // Anti-aliasing (MSAA)
  
  // Efek Bloom (pendaran pada warna terang)
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.8;
  pipeline.bloomWeight = 0.3;

  // Image Processing (Contrast & Vignette)
  pipeline.imageProcessingEnabled = true;
  pipeline.imageProcessing.contrast = 1.1;
  pipeline.imageProcessing.exposure = 1.1;
  pipeline.imageProcessing.vignetteEnabled = true;
  pipeline.imageProcessing.vignetteWeight = 1.5;
  pipeline.imageProcessing.vignetteColor = new Color4(0, 0, 0, 1);

  return { ambientLight, pipeline };
};