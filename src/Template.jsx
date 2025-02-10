import { Grid, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { XR, XROrigin, createXRStore, useXR } from "@react-three/xr";
import { useEffect, useState } from "react";
import * as THREE from "three";
import FeatheredSphere from "./assets/FadingSphere";
import TextWithBackground from "./assets/TextWithBackground";

const store = createXRStore();

const XRContent = () => {
  const { session } = useXR();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const isPresenting = Boolean(session);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[-5, 5, -4]} intensity={4} castShadow />
      <XROrigin position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />

      <TextWithBackground
        position={[0, 1.5, -2.3]}
        rotation={[0, Math.PI, 0]}
        scale={0.2}
      >
       Scene Explanation
      </TextWithBackground>

      <Grid
        args={[3, 3]}
        cellSize={0.1}
        cellThickness={0.2}
        sectionSize={0.5}
      />
      <primitive object={new THREE.AxesHelper(3)} />

      {/* {isPresenting && <FeatheredSphere radius={7} position={[0, 3.5, 1]} />} */}

      <OrbitControls />
    </>
  );
};

const App = () => {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          <XRContent />
        </XR>
      </Canvas>
    </>
  );
};

export default App;
