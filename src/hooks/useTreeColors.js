import { useMemo } from "react";
import { Color } from "three";
import appState from "../state/appState";

export default function useTreeColors() {
  const colors = appState((s) => s.colors);

  const treeColors = useMemo(
    () => ({
      regular: [
        "#557C55", //
        "#32502E", //
        "#8A8635", //
      ],
      snow: [
        "#FEF5ED", //
      ],
    }),
    []
  );

  return (height) => {
    if (height >= colors.Water.value + colors.Stone.value) {
      const r =
        treeColors.snow[Math.floor(Math.random() * treeColors.snow.length)];
      return new Color(r);
    }
    const r =
      treeColors.regular[Math.floor(Math.random() * treeColors.regular.length)];
    return new Color(r);
  };
}
