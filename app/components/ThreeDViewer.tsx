"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function RobotModel({ position = [0, 0, 0] }) {
  // Path is relative to public, so move the .glb to public/3d_model/ if not already
  const gltf = useGLTF("/3d_model/robot_playground.glb");
  const { animations } = gltf;
  const group = React.useRef();
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    // Play the first animation if available
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]]?.play();
    }
  }, [actions]);

  return <primitive ref={group} object={gltf.scene} position={position} />;
}

export default function ThreeDViewer() {
  return (
    <div
      id="container3D"
      style={{
        position: "absolute",
        top: "-90vh",
        left: "30vw",
        overflow: "visible",
        zIndex: 100,
        pointerEvents: "none",
        width: "90vw",
        height: "90vh",
      }}
    >
      Hello
      <Canvas
        camera={{ position: [0, 2, 3.5], fov: 50 }} // Dummy camera position
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }} // Full viewport, show overflow
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <RobotModel position={[0, -1, 0]} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={(3 * Math.PI) / 8}
          maxPolarAngle={(3 * Math.PI) / 8}
        />
      </Canvas>
    </div>
  );
}

// Required for GLTF loading
useGLTF.preload("/3d_model/robot_playground.glb");
