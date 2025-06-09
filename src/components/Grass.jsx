import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { FrontSide, MathUtils } from "three";
import useFBM from "../hooks/useFBM";
import useTreeColors from "../hooks/useTreeColors";
import appState from "../state/appState";

const tempV4 = new THREE.Object3D();

export default function Grass({ points }) {
  const group = useRef();
  const colors = appState((s) => s.colors);
  const generation = appState((s) => s.generation);

  const { nodes, materials } = useGLTF(
    "/demo-2022-hex-terrain/models/grass.glb"
  );
  const color = useTreeColors();
  const noise = useFBM(colors.Water.value);
  const noise2 = useFBM(colors.Water.value, {
    seed: generation.Seed * 200,
  });

  const refs = useRef([]);

  const pointsClone = useMemo(() => {
    const pointsClone = [...points];
    pointsClone.forEach((_, i) => {
      if (Math.random() < 0.6) {
        removeItemOnce(pointsClone, i);
      }
    });
    pointsClone.push(...pointsClone, ...pointsClone);
    return pointsClone;
  }, [points]);

  useEffect(() => {
    refs.current.forEach((mesh) => {
      pointsClone.forEach((point, i) => {
        tempV4.position.copy(point.clone().multiplyScalar(100));
        tempV4.updateMatrix();

        const p = point.clone().multiplyScalar(generation.Scale);
        let n = noise(p) * generation.Height;

        tempV4.position.z = n * 400;
        tempV4.position.x += MathUtils.randFloat(-5, 5);
        tempV4.position.y += MathUtils.randFloat(-5, 5);

        tempV4.rotation.x = Math.PI;

        if (
          n > colors.Water.value + colors.Beach.value &&
          n < colors.Water.value + colors.Forest.value
        ) {
          tempV4.scale.setScalar(
            MathUtils.mapLinear(noise2(point), 0, 1, 0.1, 0.1)
          );
        } else {
          tempV4.scale.setScalar(0);
        }

        tempV4.updateMatrix();
        mesh.setMatrixAt(i, tempV4.matrix);

        const c = color(n);
        mesh.setColorAt(i, c);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor.needsUpdate = true;
    });
  }, [refs, pointsClone, noise, noise2, colors, generation]);

  return (
    <group ref={group} dispose={null}>
      <instancedMesh
        ref={(r) => r && refs.current.push(r)}
        castShadow
        receiveShadow
        geometry={nodes.SM_Env_Grass_Patch_03.geometry}
        rotation={[0, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
        position={[0, 0, 0.025]}
        args={[null, null, pointsClone.length]}
      >
        <meshPhongMaterial
          shadowSide={FrontSide} //
          side={FrontSide} //
        />
      </instancedMesh>
    </group>
  );
}

function removeItemOnce(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
