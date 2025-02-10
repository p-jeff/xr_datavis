import {
  Grid,
  OrbitControls,
  RoundedBox,
  Billboard,
  Text,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { XR, XROrigin, createXRStore, useXR } from "@react-three/xr";
import FeatheredSphere from "./assets/FadingSphere";
import TextWithBackground from "./assets/TextWithBackground";
import { CameraLogger } from "./CameraLogger";
import Man from "./assets/Man";

const store = createXRStore();


const XRContent = () => {
  const { session } = useXR();

  const isPresenting = Boolean(session);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[-5, 5, -4]} intensity={4} castShadow />
      <XROrigin position={[0, 0, -3]} rotation={[0, Math.PI, 0]} />

      {/* World Average */}
      <RoundedBox
        args={[1.98, 1.98, 1.98]}
        radius={0.1}
        position={[-2, 1, 1]}
        pointerEventsType={{ deny: "grab" }}
      >
        <meshPhongMaterial color={"blue"} opacity={0.6} />
      </RoundedBox>
      <Billboard position={[-2, 2.4, 1]}>
        {/* Y = cube Y + (size/2) + 0.1 */}
        <Text fontSize={0.2} color="white">
          World Average
        </Text>
      </Billboard>

      {/* Solomon Islands */}
      <RoundedBox
        args={[0.972588826, 0.972588826, 0.972588826]}
        radius={0.05}
        position={[0.5, 0.5, -1]}
        pointerEventsType={{ deny: "grab" }}
      >
        <meshPhongMaterial color={"limegreen"} opacity={0.6} />
      </RoundedBox>
      <Billboard position={[0.5, 1.2, -1]}>
        {/* Y = cube Y + (size/2) + 0.1 */}
        <Text fontSize={0.2} color="white">
          Solomon Islands
        </Text>
      </Billboard>

      {/* US Emissions */}
      <RoundedBox
        args={[2.76198625, 2.76198625, 2.76198625]}
        radius={0.1}
        position={[2, 1.5, 2]}
        pointerEventsType={{ deny: "grab" }}
      >
        <meshPhongMaterial color={"red"} opacity={0.6} />
      </RoundedBox>
      <Billboard position={[2, 1.5, 2 - 1.5]}>
        <Text fontSize={0.2} color="white">
          United States
        </Text>
      </Billboard>

      {!isPresenting && (
        <>
          <Grid
            args={[10, 10]}
            cellSize={0.1}
            cellThickness={0.2}
            sectionSize={0.5}
            sectionThickness={2}
          />
          <Text rotation={[0, Math.PI, 0]} position={[0, 5, 5]} scale={0.5}>
            Average Daily C02 Emissions per Capita.
          </Text>
          <Text rotation={[0, Math.PI, 0]} position={[0, 4.5, 5]} scale={0.5}>
            Grid Square is 0.5m x 0.5m.
          </Text>
          <Man position={[0, 0, 0]} />
        </>
      )}

      {isPresenting && (
        <>
          <FeatheredSphere radius={7} position={[0, 3.5, 1]} />
          <TextWithBackground
            position={[0, 1.5, -2.3]}
            rotation={[0, Math.PI, 0]}
            scale={0.2}
          >
            Average Daily C02 Emissions per Capita.
          </TextWithBackground>
          <TextWithBackground
            position={[0, 1.45, -2.3]}
            rotation={[0, Math.PI, 0]}
            scale={0.2}
          >
            Volume in m³ - True to scale.
          </TextWithBackground>
        </>
      )}


    </>
  );
};

const CO2 = () => {
  return (
    <>
      <button className="enter-vr" onClick={() => store.enterAR()}>Enter XR</button>
      <Canvas
        camera={{
          position: [0, 2.25, -7], // x, y, z coordinates
          fov: 50, // field of view
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
      >
        <XR store={store}>
          <XRContent />
        </XR>
        <CameraLogger />
        <OrbitControls target={[0,1.2,0]}/>
      </Canvas>
    </>
  );
};

export default CO2;
