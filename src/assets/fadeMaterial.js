import * as THREE from 'three';

export const FeatheredMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vPosition;
    uniform vec3 color;
    uniform float radius; // Receive radius from the React component

    void main() {
      // Calculate the distance from the center (the edge will be at 'radius' distance)
      float dist = length(vPosition.xy); // You can also use length(vPosition) for full 3D distance

      // Adjust smoothstep range based on the radius
      float alpha = smoothstep(radius - 0.2, radius, dist); // 'radius - 0.2' is where it starts fading
      
      gl_FragColor = vec4(color, 1.0 - alpha); // Fully transparent at the edge
    }
  `,
  uniforms: {
    color: { value: new THREE.Color('white') },
    radius: { value: 7 } // Default radius value, this will be updated from the component
  },
  side: THREE.BackSide,
  transparent: true, // Allow transparency for the feathering effect
});
