import { useRef } from "react";

export default function Lights() {
  const ref = useRef();

  // useHelper(ref, DirectionalLightHelper);

  return (
    <group>
      <hemisphereLight
        args={[
          "white", //
          "darkslategrey",
          2,
        ]}
      />
      <directionalLight
        ref={ref}
        castShadow //
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        position={[-5, 3, -5]}
        intensity={10}
        shadowBias={-0.0002}
        color="orange"
      />
      <directionalLight
        position={[1, 1, 1]} //
        intensity={1}
      />
    </group>
  );
}
