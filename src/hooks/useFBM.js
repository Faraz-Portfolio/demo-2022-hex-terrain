import { useMemo } from "react";
import { MathUtils, Vector2 } from "three";
import { FBM } from "three-noise";
import appState from "../state/appState";

export default function useFBM(seaLevel, settings) {
  const generation = appState((s) => s.generation);

  const fbm = useMemo(
    () =>
      new FBM({
        seed: generation.Seed,
        lacunarity: generation.Detail * 4,
        persistance: generation.Fuzzyness * 2,
        // redistribution: generation.Contrast * 2,
        ...settings,
      }),
    [settings, generation]
  );

  return (vec3) =>
    Math.pow(
      MathUtils.mapLinear(
        fbm.get2(new Vector2(vec3.x, vec3.y)),
        -1, //
        1,
        0,
        1
      ),
      2
    );
}
