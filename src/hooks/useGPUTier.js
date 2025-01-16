import { getGPUTier } from "detect-gpu";
import { useEffect, useState } from "react";

export default function useGPUTier() {
  const [gpuTier, setGpuTier] = useState(null);

  useEffect(() => {
    (async () => {
      setGpuTier((await getGPUTier()).tier);
    })();
  }, []);

  return gpuTier;
}
