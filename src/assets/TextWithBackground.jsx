import { Text } from "@react-three/drei";

export default function TextWithBackground({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  textColor = "black",
  backgroundColor = "white",
}) {
  const planeWidth = children.length * 0.15; // Proportional to text length
  const planeHeight = 0.4;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial color={backgroundColor} />
      </mesh>
      <Text
        color={textColor}
        anchorX="center"
        anchorY="middle"
        fontSize={0.2}
      >
        {children}
      </Text>
    </group>
  );
}