import { useMemo } from "react";
import * as THREE from "three";

export default function BeveledHexagonGeometry({ size = 10, ...rest }) {
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6,
      Xcenter = 0,
      Ycenter = 0;

    shape.moveTo(Xcenter + size * Math.cos(0), Ycenter + size * Math.sin(0));

    for (let i = 1; i <= sides; i += 1) {
      shape.lineTo(
        Xcenter + size * Math.cos((i * 2 * Math.PI) / sides),
        Ycenter + size * Math.sin((i * 2 * Math.PI) / sides)
      );
    }
    return shape;
  }, [size]);

  const settings = useMemo(
    () => ({
      steps: 2,
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    []
  );

  return <extrudeGeometry args={[shape, settings]} {...rest} />;
}
