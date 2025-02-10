import React from "react";
import { FeatheredMaterial } from "./fadeMaterial";
import * as THREE from "three";

function FeatheredSphere({ radius = 7, position = [0, 2.5, 0] }) {
  // Set the sphere radius here, this can be dynamic based on your needs

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32, 0, Math.PI, 0, Math.PI]} />{" "}
      <shaderMaterial
        attach="material"
        vertexShader={FeatheredMaterial.vertexShader}
        fragmentShader={FeatheredMaterial.fragmentShader}
        uniforms={{
          color: { value: new THREE.Color("white") },
          radius: { value: radius }, // Pass radius to the shader
        }}
        side={THREE.BackSide}
        transparent={true}
      />‚
    </mesh>
  );
}

export default FeatheredSphere;
