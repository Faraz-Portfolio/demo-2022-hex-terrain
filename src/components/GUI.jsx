import { button, Leva, useControls } from "leva";
import { useEffect } from "react";
import useGPUTier from "../hooks/useGPUTier";
import appState from "../state/appState";

export default function GUI() {
  const colors = appState((s) => s.colors);
  const generation = appState((s) => s.generation);
  const general = appState((s) => s.general);
  const setColorValue = appState((s) => s.setColorValue);
  const setGeneral = appState((s) => s.setGeneral);
  const setColor = appState((s) => s.setColor);
  const setGeneration = appState((s) => s.setGeneration);

  const tier = useGPUTier();

  const [, set2] = useControls(
    "General",
    () => {
      const res = {};
      Object.keys(general).forEach((param) => {
        res[param] = {
          value: general[param],

          onChange: (v) => setGeneral(param, v),
        };
      });

      return res;
    },
    [general, setGeneral]
  );

  useControls(
    "Color",
    () => {
      const res = {};
      Object.keys(colors).forEach((color) => {
        res[color] = {
          value: colors[color].value,
          min: 0,
          max: 1,
          onChange: (v) => setColorValue(color, v),
        };

        res[color + " Color"] = {
          value: colors[color].color,
          onChange: (v) => setColor(color, v),
        };
      });

      return res;
    },
    [colors, setColorValue, setColor]
  );

  const [_, set] = useControls(
    "Generation",
    () => {
      const res = {};
      Object.keys(generation).forEach((param) => {
        res[param] = {
          value: generation[param],
          min: 0,
          max: 1,
          onChange: (v) => setGeneration(param, v),
        };
      });

      return res;
    },
    [generation, setGeneration]
  );

  useControls(
    {
      Regenerate: button(() => set({ Seed: Math.random() })),
    },
    [set]
  );

  useEffect(() => {
    if (tier) {
      if (tier > 1) {
        set2({ Trees: true });
      }
      if (tier > 2) {
        set2({ Grass: true });
      }
      if (tier < 1) {
        set2({ Trees: false, Grass: false });
      }
    }
  }, [tier]);

  return <Leva collapsed />;
}
