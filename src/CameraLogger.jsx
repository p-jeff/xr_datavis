import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function CameraLogger() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        const position = camera.position;
        console.log(`Camera position: x: ${position.x.toFixed(2)}, y: ${position.y.toFixed(2)}, z: ${position.z.toFixed(2)}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [camera]);

  return null;
}