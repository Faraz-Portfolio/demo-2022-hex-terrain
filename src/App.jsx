import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Effects from "./Effects";
import Clouds from "./components/Clouds";
import GUI from "./components/GUI";
import Grass from "./components/Grass";
import Lights from "./components/Lights";
import Terrain from "./components/ScatterHexagonMesh";
import Trees from "./components/Trees";
import useHexagonScatter from "./hooks/useHexagonScatter";
import appState from "./state/appState";

export default function App() {
  const points = useHexagonScatter(25);
  const general = appState((s) => s.general);

  return (
    <>
      <GUI />
      <Canvas
        shadows="percentage"
        camera={{
          position: [5, 6, 5],
        }}
      >
        <Suspense fallback={null}>
          <group rotation-x={-Math.PI / 2}>
            {general.Trees && <Trees points={points} />}
            {general.Grass && <Grass points={points} />}
            {general.Clouds && <Clouds />}
            <Terrain points={points} />
          </group>
          <Environment preset="sunset" />
          <OrbitControls autoRotate autoRotateSpeed={0.6} enablePan={false} />
          {/* <Helpers /> */}
          <Effects />
          {/* <Stats /> */}
        </Suspense>
        <Lights />
      </Canvas>
    </>
  );
}
