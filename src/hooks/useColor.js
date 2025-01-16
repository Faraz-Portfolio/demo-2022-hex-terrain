import { useControls } from "leva";
import { Color, MathUtils } from "three";
import appState from "../state/appState";

export default function useColor() {
  const colors = appState((s) => s.colors);

  return (height) => {
    const color = (() => {
      if (height <= colors.Water.value) {
        return new Color(colors.Water.color);
      } else if (height <= colors.Water.value + colors.Shore.value) {
        return new Color(colors.Shore.color);
      } else if (height <= colors.Water.value + colors.Beach.value) {
        return new Color(colors.Beach.color);
      } else if (height <= colors.Water.value + colors.Shrub.value) {
        return new Color(colors.Shrub.color);
      } else if (height <= colors.Water.value + colors.Forest.value) {
        return new Color(colors.Forest.color);
      } else if (height <= colors.Water.value + colors.Stone.value) {
        return new Color(colors.Stone.color);
      } else {
        return new Color(colors.Snow.color);
      }
    })();

    let a = {
      h: 0,
      s: 1,
      l: 1,
    };
    const hsl = color.getHSL(a);
    color.setHSL(
      hsl.h,
      hsl.s * 1.7,
      hsl.l *
        (height <= colors.Water.value
          ? MathUtils.mapLinear(
              Math.pow(1 - (colors.Water.value - height) * 1.3, 6),
              0,
              1,
              0,
              1.4
            )
          : 1)
    );

    return color;
  };
}
