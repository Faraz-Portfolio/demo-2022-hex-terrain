import { EffectComposer, FXAA, N8AO } from "@react-three/postprocessing";
import React from "react";

export default function Effects() {
  return (
    <EffectComposer enableNormalPass>
      <FXAA />
      <N8AO />
    </EffectComposer>
  );
}
