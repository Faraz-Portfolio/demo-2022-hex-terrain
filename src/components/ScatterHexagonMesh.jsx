import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { FrontSide } from "three";
import useColor from "../hooks/useColor";
import useFBM from "../hooks/useFBM";
import appState from "../state/appState";
import BeveledHexagonGeometry from "./BeveledHexagonGeometry";

import { useSpring } from "@react-spring/three";

const tempV4 = new THREE.Object3D();

export default function Terrain({ points }) {
  const colors = appState((s) => s.colors);
  const generation = appState((s) => s.generation);

  const noise = useFBM(colors.Water.value);
  const ref = useRef();
  const color = useColor(colors.Water.value);

  const generate = useCallback(
    (scale) => {
      if (ref.current) {
        const mesh = ref.current;

        points.forEach((point, i) => {
          tempV4.position.copy(point);
          tempV4.scale.setScalar(0.01);

          if (scale) {
            tempV4.scale.multiplyScalar(scale);
          }

          tempV4.updateMatrix();

          const p = tempV4.position.clone().multiplyScalar(generation.Scale);
          let n = noise(p) * generation.Height;
          const c = color(n);

          if (n <= colors.Water.value) n = colors.Water.value;

          tempV4.scale.z *= 40 * n;

          tempV4.updateMatrix();
          mesh.setMatrixAt(i, tempV4.matrix);

          mesh.setColorAt(i, c);
        });
        mesh.instanceMatrix.needsUpdate = true;
        mesh.instanceColor.needsUpdate = true;
      }
    },
    [points, noise, color, colors, generation]
  );

  const { scale } = useSpring({
    scale: 1,
    onChange: ({ value: { scale } }) => {
      generate(scale);
    },
  });

  useEffect(() => {
    scale.start({ from: 0, to: 1 });
  }, []);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <group>
      <instancedMesh
        castShadow
        receiveShadow
        ref={ref}
        args={[null, null, points.length]}
      >
        <BeveledHexagonGeometry />
        <meshPhongMaterial
          shadowSide={FrontSide} //
          side={FrontSide} //
        />
      </instancedMesh>
    </group>
  );
}
