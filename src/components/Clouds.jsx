import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { FrontSide, MathUtils, Vector3 } from "three";

const tempV4 = new THREE.Object3D();

function Clouds() {
  const { nodes } = useGLTF("/demo-2022-hex-terrain/models/cloud.glb");

  const refs = useRef([]);

  const points = useMemo(() => {
    return new Array(30).fill(0).map(() => ({
      pos: new Vector3(
        MathUtils.randFloat(-8, 8),
        MathUtils.randFloat(-8, 8),
        MathUtils.randFloat(-1, 1)
      ).multiplyScalar(50),
      scale: MathUtils.randFloat(0.1, 0.2),
      rate: MathUtils.randFloat(5, 10),
    }));
  }, []);

  useFrame((_, dt) => {
    refs.current.forEach((mesh) => {
      points.forEach((point, i) => {
        tempV4.position.copy(point.pos.clone());

        point.pos.x += dt * point.rate;
        if (point.pos.x > 400) {
          point.pos.x = -400;
          point.pos.y = MathUtils.randFloat(-400, 400);
        }

        const scale = Math.pow(1 - Math.abs(point.pos.x / 400), 0.5);
        tempV4.scale.setScalar(point.scale).multiplyScalar(scale);

        tempV4.rotation.x = Math.PI;

        tempV4.updateMatrix();
        mesh.setMatrixAt(i, tempV4.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <group dispose={null} position={[0, 0, 2.5]}>
      <instancedMesh
        ref={(r) => r && refs.current.push(r)}
        castShadow
        receiveShadow
        geometry={nodes.SM_Generic_Cloud_01.geometry}
        rotation={[0, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
        args={[null, null, points.length]}
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
        geometry={nodes.SM_Generic_Cloud_02.geometry}
        rotation={[0, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
        args={[null, null, points.length]}
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
        geometry={nodes.SM_Generic_Cloud_03.geometry}
        rotation={[0, 0, 0]}
        scale={[0.01, 0.01, 0.01]}
        args={[null, null, points.length]}
      >
        <meshPhongMaterial
          shadowSide={FrontSide} //
          side={FrontSide} //
        />
      </instancedMesh>
    </group>
  );
}

export default React.memo(Clouds);
