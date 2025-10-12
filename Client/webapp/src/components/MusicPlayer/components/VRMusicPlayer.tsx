import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Box, 
  Sphere, 
  Text, 
  Html, 
  OrbitControls,
  Environment
} from "@react-three/drei";
// import { XR, useXR } from "@react-three/xr"; // For future VR implementation
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { useLocalization, L10N } from "@/localization";
import * as THREE from "three";

// 3D Button Component
const VRButton: React.FC<{
  position: [number, number, number];
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
  size?: number;
  disabled?: boolean;
}> = ({ position, onClick, children, color = "#4f46e5", size = 0.3, disabled = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      if (pressed) {
        meshRef.current.position.y = position[1] - 0.05;
      } else {
        meshRef.current.position.y = position[1];
      }
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[size, size * 0.3, size]}
      onClick={disabled ? undefined : onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      <meshStandardMaterial 
        color={disabled ? "#666" : color} 
        transparent 
        opacity={disabled ? 0.5 : 0.8}
        roughness={0.2}
        metalness={0.1}
      />
      <Html
        position={[0, 0, 0.2]}
        center
        style={{
          fontSize: "24px",
          color: "white",
          fontWeight: "bold",
          pointerEvents: "none",
        }}
      >
        {children}
      </Html>
    </Box>
  );
};

// 3D Slider Component
const VRSlider: React.FC<{
  position: [number, number, number];
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  color?: string;
}> = ({ position, value, onChange, min = 0, max = 100, color = "#4f46e5" }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isDragging, setIsDragging] = useState(false);

  const normalizedValue = (value - min) / (max - min);
  const sliderLength = 2;
  const thumbPosition = (normalizedValue - 0.5) * sliderLength;

  const handlePointerDown = (event: any) => {
    setIsDragging(true);
    event.stopPropagation();
  };

  const handlePointerMove = (event: any) => {
    if (!isDragging) return;
    
    // Calculate new value based on pointer position
    const intersection = event.intersections[0];
    if (intersection) {
      const localX = intersection.point.x - position[0];
      const newValue = ((localX / sliderLength) + 0.5) * (max - min) + min;
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Track */}
      <Box args={[sliderLength, 0.1, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#333" />
      </Box>
      
      {/* Progress */}
      <Box args={[sliderLength * normalizedValue, 0.1, 0.1]} position={[-(sliderLength * (1 - normalizedValue)) / 2, 0, 0.01]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Thumb */}
      <Sphere args={[0.15]} position={[thumbPosition, 0, 0.1]}>
        <meshStandardMaterial color={color} />
      </Sphere>
    </group>
  );
};

// Main VR Music Player Scene
const VRMusicPlayerScene: React.FC = () => {
  const {
    state,
    currentTrack,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    nextTrack,
    previousTrack,
    formatTime,
    getVolumeIcon,
  } = useMusicPlayer();

  const { t } = useLocalization();

  const volumeLevel = getVolumeIcon();
  const volumeIcon = volumeLevel === "muted" ? "🔇" : 
                    volumeLevel === "low" ? "🔉" : "🔊";

  return (
    <>
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Main Player Panel */}
      <group position={[0, 0, -2]}>
        {/* Background Panel */}
        <Box args={[4, 3, 0.2]} position={[0, 0, -0.1]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            transparent 
            opacity={0.8}
            roughness={0.1}
            metalness={0.3}
          />
        </Box>

        {/* Track Info */}
        <Text
          position={[0, 1, 0.1]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
        >
          {currentTrack.title}
        </Text>
        
        <Text
          position={[0, 0.6, 0.1]}
          fontSize={0.2}
          color="#888"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
        >
          {currentTrack.artist}
        </Text>

        {/* Time Display */}
        <Text
          position={[-1.5, 0.2, 0.1]}
          fontSize={0.15}
          color="#ccc"
          anchorX="center"
          anchorY="middle"
        >
          {formatTime(state.currentTime)}
        </Text>
        
        <Text
          position={[1.5, 0.2, 0.1]}
          fontSize={0.15}
          color="#ccc"
          anchorX="center"
          anchorY="middle"
        >
          {formatTime(state.duration)}
        </Text>

        {/* Progress Bar */}
        <VRSlider
          position={[0, 0.2, 0.1]}
          value={state.duration ? (state.currentTime / state.duration) * 100 : 0}
          onChange={(value) => {
            const event = { target: { value: value } } as any;
            handleProgressChange(event, value);
          }}
          color="#4f46e5"
        />

        {/* Control Buttons Row */}
        <group position={[0, -0.3, 0.1]}>
          {/* Previous Track */}
          <VRButton
            position={[-1.2, 0, 0]}
            onClick={previousTrack}
            color="#6366f1"
          >
            ⏮
          </VRButton>

          {/* Play/Pause */}
          <VRButton
            position={[-0.4, 0, 0]}
            onClick={togglePlay}
            color={state.isPlaying ? "#ef4444" : "#10b981"}
            size={0.4}
            disabled={state.isLoading}
          >
            {state.isLoading ? "⏳" : state.isPlaying ? "⏸" : "▶️"}
          </VRButton>

          {/* Next Track */}
          <VRButton
            position={[0.4, 0, 0]}
            onClick={nextTrack}
            color="#6366f1"
          >
            ⏭
          </VRButton>

          {/* Mute/Unmute */}
          <VRButton
            position={[1.2, 0, 0]}
            onClick={toggleMute}
            color={state.isMuted ? "#ef4444" : "#10b981"}
          >
            {volumeIcon}
          </VRButton>
        </group>

        {/* Volume Control */}
        <group position={[0, -0.8, 0.1]}>
          <Text
            position={[-1.5, 0.2, 0]}
            fontSize={0.15}
            color="#ccc"
            anchorX="center"
            anchorY="middle"
          >
            {t(L10N.musicPlayer.volumeControl)}
          </Text>
          
          <VRSlider
            position={[0, 0, 0]}
            value={state.isMuted ? 0 : state.volume * 100}
            onChange={(value) => {
              const event = { target: { value: value / 100 } } as any;
              handleVolumeChange(event, value / 100);
            }}
            color="#8b5cf6"
          />
        </group>
      </group>

      {/* Floating Music Notes Animation */}
      {state.isPlaying && (
        <>
          {[...Array(5)].map((_, i) => (
            <FloatingNote
              key={i}
              position={[
                (Math.random() - 0.5) * 8,
                Math.random() * 4 - 2,
                Math.random() * 2 - 1
              ]}
              delay={i * 0.5}
            />
          ))}
        </>
      )}
    </>
  );
};

// Floating Music Note Component
const FloatingNote: React.FC<{
  position: [number, number, number];
  delay: number;
}> = ({ position, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += 0.01;
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime + delay) * 0.01;
      
      // Fade out over time
      const opacity = Math.max(0, 1 - (state.clock.elapsedTime - delay) * 0.2);
      if (opacity <= 0) {
        setVisible(false);
      }
    }
  });

  if (!visible) return null;

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={0.3}
      color="#4f46e5"
      anchorX="center"
      anchorY="middle"
    >
      🎵
    </Text>
  );
};

// VR Music Player as a 3D Component (not full screen)
export const VRMusicPlayer: React.FC = () => {
  return <VRMusicPlayerScene />;
};
