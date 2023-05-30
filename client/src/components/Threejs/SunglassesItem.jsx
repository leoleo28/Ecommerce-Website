import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/sunglasses-transformed.glb");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        >
          <mesh
            geometry={nodes.g_earthingys_m_frame_metal_no_text001_0.geometry}
            material={materials["m_frame_metal_no_text.001"]}
          />
          <mesh
            geometry={nodes.g_earthingys_m_frame_metal_0.geometry}
            material={materials.m_frame_metal}
          />
          <mesh
            geometry={nodes.g_earthingys_m_plastic_black_gloss_0.geometry}
            material={materials.m_plastic_black_gloss}
          />
        </group>
        <mesh
          geometry={nodes.g_lense_frame_m_frame_metal_no_text001_0.geometry}
          material={materials["m_frame_metal_no_text.001"]}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_lense_m_lense_0.geometry}
          material={materials.m_lense}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_nose_guard_arm_m_frame_metal_no_text001_0.geometry}
          material={materials["m_frame_metal_no_text.001"]}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_spring_m_frame_metal_no_text001_0.geometry}
          material={materials["m_frame_metal_no_text.001"]}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={
            nodes.g_nose_guardholder_m_frame_metal_no_text001_0.geometry
          }
          material={materials["m_frame_metal_no_text.001"]}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_nose_screwholder_m_chrome_0.geometry}
          material={materials.m_chrome}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_nose_guard_m_rubber_clear_0.geometry}
          material={materials.m_rubber_clear}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_nose_screw_m_chrome_0.geometry}
          material={materials.m_chrome}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={nodes.g_mechanism_m_frame_metal_no_text001_0.geometry}
          material={materials["m_frame_metal_no_text.001"]}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
        <mesh
          geometry={
            nodes.g_connects_to_mechanism_m_frame_metal_no_text001_0.geometry
          }
          material={materials["m_frame_metal_no_text.001"]}
          position={[135.18, 68.34, -63.87]}
          rotation={[-1.53, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/sunglasses-transformed.glb");

const SunglassesItem = () => {
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

export default SunglassesItem;
