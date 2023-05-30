import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

const Model = (props) => {
  const { nodes, materials } = useGLTF("/shoes-transformed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.shoe_shoe_0.geometry}
        material={materials.shoe}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
      <mesh
        geometry={nodes.shoelace_shoelace_0.geometry}
        material={materials.shoelace}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
};

useGLTF.preload("/shoes-transformed.glb");

const ShoesItem = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
    </>
  );
};

export default ShoesItem;
