import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { VRMusicPlayer } from "@/components/MusicPlayer/components/VRMusicPlayer";

interface VRWrapperProps {
  isVR: boolean;
  onExitVR: () => void;
}

export const VRWrapper: React.FC<VRWrapperProps> = ({ isVR, onExitVR }) => {
  if (!isVR) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1500,
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* VR Music Player in 3D space */}
        <VRMusicPlayer />
        
        {/* Mouse controls */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
      
      {/* Exit VR Button */}
      <button
        onClick={onExitVR}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1600,
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          border: "2px solid #4f46e5",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Exit VR
      </button>
    </div>
  );
};
