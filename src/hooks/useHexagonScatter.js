import { useMemo } from "react";
import * as THREE from "three";

export default function useHexagonScatter(
  radius = 5, //
  gap = 1
) {
  const points = useMemo(() => {
    let pts = [];
    pts.push(new THREE.Vector3());
    let unit = gap * 0.176;

    let angle = Math.PI / 3;
    let axis = new THREE.Vector3(0, 0, 1);

    let axisVector = new THREE.Vector3(0, -unit, 0);
    let sideVector = new THREE.Vector3(0, unit, 0).applyAxisAngle(axis, -angle);
    let tempV3 = new THREE.Vector3();
    for (let seg = 0; seg < 6; seg++) {
      for (let ax = 1; ax <= radius; ax++) {
        for (let sd = 0; sd < ax; sd++) {
          tempV3
            .copy(axisVector)
            .multiplyScalar(ax)
            .addScaledVector(sideVector, sd)
            .applyAxisAngle(axis, angle * seg);

          pts.push(new THREE.Vector3().copy(tempV3));
        }
      }
    }
    return pts;
  }, [radius, gap]);

  return points;
}
