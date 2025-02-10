import { useGLTF } from "@react-three/drei";

const Man = (props) => {
  const { scene } = useGLTF("man.glb");
  return <primitive object={scene} {...props} rotation={[0, Math.PI, 0]} />;
};

export default Man;
