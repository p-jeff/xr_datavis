import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useXR, XROrigin, createXRStore, XR } from "@react-three/xr";
import * as THREE from "three";
import FeatheredSphere from "./assets/FadingSphere";
import TextWithBackground from "./assets/TextWithBackground";

const store = createXRStore();

// BIG MACS PER MINIMUM WAGE DAY IN 1980 vs 2022

const Burger = ({ position }) => {
  useGLTF.preload("/burger.glb");
  const { scene } = useGLTF("/burger.glb");

  // Traverse the scene to find the specific object with the name 'Sketchfab_model'
  let burgerMesh;
  scene.traverse((child) => {
    if (child.name === "Burger") {
      burgerMesh = child.clone(); // Clone the mesh to avoid reference issues
    }
  });

  console.log(burgerMesh);
  return <primitive object={burgerMesh} scale={0.0005} position={position} />;
};

const BurgerStack = ({ count, position }) => {
  const burgers = [];
  for (let i = 0; i < count; i++) {
    const burgerPosition = [position[0], position[1] + i * 0.065, position[2]];
    burgers.push(<Burger key={i} position={burgerPosition} />);
    console.log(burgers);
  }
  return <>{burgers}</>;
};

const XRContent = () => {
  const { session } = useXR();
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
        Burger Consumption Visualization
      </TextWithBackground>

      <Grid
        args={[3, 3]}
        cellSize={0.1}
        cellThickness={0.2}
        sectionSize={0.5}
      />
      <primitive object={new THREE.AxesHelper(3)} />

      {isPresenting && <FeatheredSphere radius={7} position={[0, 3.5, 1]} />}

      <group position={[1, 0, 0]}>
        <BurgerStack count={3} position={[-0.03, 0, -0.08]} />
        <BurgerStack count={4} position={[-0.08, 0, -0]} />
        <BurgerStack count={5} position={[-0, 0, -0]} />
      </group>

      <group position={[-0.8, 0, 0]}>
        <BurgerStack count={5} position={[0, 0, 0]} />
        <BurgerStack count={5} position={[-0.08, 0, 0]} />
        <BurgerStack count={4} position={[-0.16, 0, 0]} />
        <BurgerStack count={4} position={[-0.24, 0, 0]} />
        <BurgerStack count={2} position={[-0.03, 0, -0.08]} />
        <BurgerStack count={2} position={[-0.11, 0, -0.08]} />
        <BurgerStack count={1} position={[-0.19, 0, -0.08]} />
      </group>
      <OrbitControls />
    </>
  );
};

const Burgers = () => {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas
        camera={{
          position: [0, 2.25, -7],
          fov: 50,
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
      >
        <XR store={store}>
          <XRContent />
        </XR>
      </Canvas>
    </>
  );
};

export default Burgers;
