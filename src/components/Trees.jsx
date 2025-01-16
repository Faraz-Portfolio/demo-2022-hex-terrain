import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import useHexagonScatter from "../hooks/useHexagonScatter";
import * as THREE from "three";
import useFBM from "../hooks/useFBM";
import appState from "../state/appState";
import { FrontSide, MathUtils } from "three";
import { Vector3 } from "three";
import useTreeColors from "../hooks/useTreeColors";

const tempV4 = new THREE.Object3D();

export default function Trees({ points }) {
  const group = useRef();
  const colors = appState((s) => s.colors);
  const generation = appState((s) => s.generation);

  const { nodes, materials } = useGLTF("/models/trees.glb");
  const color = useTreeColors();
  const noise = useFBM(colors.Water.value);
  const noise2 = useFBM(colors.Water.value, {
    seed: generation.Seed * 200
  });

  const refs = useRef([]);

  const pointsClone = useMemo(() => {
    const pointsClone = [...points];
    pointsClone.forEach((_, i) => {
      if (Math.random() < 0.6) {
        removeItemOnce(pointsClone, i);
      }
    });
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
        tempV4.position.x += MathUtils.randFloat(-4, 4);
        tempV4.position.y += MathUtils.randFloat(-4, 4);

        tempV4.rotation.x = Math.PI;

        if (
          (n > colors.Water.value + colors.Shrub.value &&
            n < colors.Water.value + colors.Forest.value) ||
          n > colors.Water.value + colors.Stone.value
        ) {
          tempV4.scale.setScalar(
            MathUtils.mapLinear(noise2(point), 0, 1, 0.02, 0.09)
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
        geometry={nodes.SM_Env_Tree_Pine_01.geometry}
        rotation={[0, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
        args={[null, null, pointsClone.length]}
      >
        <meshPhongMaterial
          shadowSide={FrontSide} //
          side={FrontSide} //
        />
      </instancedMesh>
      <instancedMesh
        ref={(r) => r && refs.current.push(r)}
        castShadow
        receiveShadow
        geometry={nodes.SM_Env_Tree_Pine_02002.geometry}
        rotation={[0, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
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

useGLTF.preload("/models/trees.glb");

function removeItemOnce(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
