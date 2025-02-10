import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Billboard, Text, Box } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useXR, XROrigin, createXRStore, XR } from "@react-three/xr";
import * as THREE from "three";
import FeatheredSphere from "./assets/FadingSphere";
import TextWithBackground from "./assets/TextWithBackground";
import Man from "./assets/Man";
import { CameraLogger } from "./CameraLogger";

const store = createXRStore();

// BIG MACS PER MINIMUM WAGE DAY IN 1980 vs 2022

const Burger = ({ position }) => {
  useGLTF.preload("burger.glb");
  const { scene } = useGLTF("burger.glb");

  // Traverse the scene to find the specific object with the name 'Sketchfab_model'
  let burgerMesh;
  scene.traverse((child) => {
    if (child.name === "Burger") {
      burgerMesh = child.clone(); // Clone the mesh to avoid reference issues
      burgerMesh.castShadow = true; // Enable shadow casting for the burger mesh
    }
  });
  return <primitive object={burgerMesh} scale={0.0005} position={position} />;
};

const BurgerStack = ({ count, position }) => {
  const burgers = [];
  for (let i = 0; i < count; i++) {
    const burgerPosition = [position[0], position[1] + i * 0.065, position[2]];
    burgers.push(<Burger key={i} position={burgerPosition} />);
  }
  return <>{burgers}</>;
};

const Tooltip = ({ text, position }) => (
  <Billboard position={position}>
    <Text color="white" fontSize={0.05} anchorX="center" anchorY="middle">
      {text}
    </Text>
  </Billboard>
);

const XRContent = () => {
  const { session } = useXR();
  const isPresenting = Boolean(session);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[-5, 5, -4]} intensity={5} castShadow />
      <XROrigin position={[0, 0, -1]} rotation={[0, Math.PI, 0]} />

      {isPresenting && (
        <>
          {" "}
          <group position={[-0.3, 0.7, 0]}>
            <BurgerStack count={3} position={[-0.03, 0, -0.08]} />
            <BurgerStack count={4} position={[-0.08, 0, -0]} />
            <BurgerStack count={5} position={[-0, 0, -0]} />
            <Tooltip text="2022" position={[-0.03, 0.5, -0.08]} />
          </group>
          <group position={[0.5, 0.7, 0]}>
            <BurgerStack count={5} position={[0, 0, 0]} />
            <BurgerStack count={5} position={[-0.08, 0, 0]} />
            <BurgerStack count={4} position={[-0.16, 0, 0]} />
            <BurgerStack count={4} position={[-0.24, 0, 0]} />
            <BurgerStack count={2} position={[-0.03, 0, -0.08]} />
            <BurgerStack count={2} position={[-0.11, 0, -0.08]} />
            <BurgerStack count={1} position={[-0.19, 0, -0.08]} />
            <Tooltip text="1980" position={[-0.1, 0.5, 0]} />
          </group>
          <Box args={[1.8, 0.1, 0.5]} position={[0, 0.63, 0]} receiveShadow>
            <meshPhongMaterial color="grey" />
          </Box>
        </>
      )}

      {!isPresenting && (
        <>
          <group position={[-0.3, 0, 0]}>
            <BurgerStack count={3} position={[-0.03, 0, -0.08]} />
            <BurgerStack count={4} position={[-0.08, 0, -0]} />
            <BurgerStack count={5} position={[-0, 0, -0]} />
            <Tooltip text="2022" position={[-0.03, 0.5, -0.08]} />
          </group>

          <group position={[0.5, 0, 0]}>
            <BurgerStack count={5} position={[0, 0, 0]} />
            <BurgerStack count={5} position={[-0.08, 0, 0]} />
            <BurgerStack count={4} position={[-0.16, 0, 0]} />
            <BurgerStack count={4} position={[-0.24, 0, 0]} />
            <BurgerStack count={2} position={[-0.03, 0, -0.08]} />
            <BurgerStack count={2} position={[-0.11, 0, -0.08]} />
            <BurgerStack count={1} position={[-0.19, 0, -0.08]} />
            <Tooltip text="1980" position={[-0.1, 0.5, 0]} />
          </group> 

           <group position={[-0.3, 0, 0]}>
            <BurgerStack count={3} position={[-0.03, 0, -0.08]} />
            <BurgerStack count={4} position={[-0.08, 0, -0]} />
            <BurgerStack count={5} position={[-0, 0, -0]} />
            <Tooltip text="2022" position={[-0.03, 0.5, -0.08]} />
          </group>

          <group position={[0.5, 0, 0]}>
            <BurgerStack count={5} position={[0, 0, 0]} />
            <BurgerStack count={5} position={[-0.08, 0, 0]} />
            <BurgerStack count={4} position={[-0.16, 0, 0]} />
            <BurgerStack count={4} position={[-0.24, 0, 0]} />
            <BurgerStack count={2} position={[-0.03, 0, -0.08]} />
            <BurgerStack count={2} position={[-0.11, 0, -0.08]} />
            <BurgerStack count={1} position={[-0.19, 0, -0.08]} />
            <Tooltip text="1980" position={[-0.1, 0.5, 0]} />
          </group> 

          <Grid
            args={[3, 3]}
            cellSize={0.1}
            cellThickness={0.2}
            sectionSize={0.5}
          />

          <OrbitControls target0={[0, 4, 0]} />
        </>
      )}

      <TextWithBackground
        position={[0, 1, 2]}
        rotation={[0, Math.PI, 0]}
        scale={0.4}
      >
        McDonald's Big Macs per Minimum Wage Day
      </TextWithBackground>
    </>
  );
};

const Burgers = () => {
  return (
    <>
      <button className="enter-vr" onClick={() => store.enterAR()}>Enter XR</button>
      <Canvas
        shadows
        camera={{
          position: [0, 0.25, -2.2],
          fov: 50,
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
      >
        <XR store={store}>
          <XRContent />
        </XR>
        <CameraLogger />
      </Canvas>
    </>
  );
};

export default Burgers;
