'use client';

import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';

const TAGS = [
  'Hooks', 'JSX', 'Virtual DOM', 'Props', 'State', 
  'Context', 'Redux', 'Zustand', 'Next.js', 'Framer'
];

const RADIUS = 200; // Orbit radius

export default function OrbitingTags() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state (center is 0,0)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement for that "Awwwards" floaty feel
  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Current rotation angles
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Animation Loop
  useAnimationFrame((t, delta) => {
    // Base rotation speed + mouse influence
    // If mouse is in center, it keeps rotating slowly
    // Moving mouse speeds up rotation in that direction
    const moveX = smoothMouseX.get();
    const moveY = smoothMouseY.get();

    setRotation(prev => ({
      x: prev.x + (moveY * 0.002 + 0.001) * (delta / 10), // Rotate X axis
      y: prev.y + (moveX * 0.002 - 0.002) * (delta / 10), // Rotate Y axis
    }));
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center (range: -1 to 1)
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    mouseX.set(x * 20); // Sensitivity
    mouseY.set(-y * 20);
  };

  const handleMouseLeave = () => {
    // Slow down/reset interaction on leave
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '500px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#050505',
        overflow: 'hidden',
        cursor: 'default',
        perspective: '1000px', // Adds 3D perspective
      }}
    >
      {/* Central Text */}
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '800',
          color: 'white',
          margin: 0,
          letterSpacing: '-0.05em',
          textShadow: '0 0 40px rgba(97, 218, 251, 0.4)', // React Blue glow
          background: 'linear-gradient(to bottom right, #ffffff, #888888)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          React Bits
        </h1>
        <p style={{
          color: '#666',
          fontSize: '0.9rem',
          marginTop: '10px',
          fontWeight: 300,
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          Interactive Orbit
        </p>
      </div>

      {/* Orbiting Tags */}
      {TAGS.map((tag, i) => {
        // Distribute points evenly on a sphere (Fibonacci Sphere algorithm modified for ring/orbit)
        // Here we use simple spherical coordinates based on index
        const phi = Math.acos(-1 + (2 * i) / TAGS.length);
        const theta = Math.sqrt(TAGS.length * Math.PI) * phi;

        return (
          <Tag 
            key={i} 
            text={tag} 
            index={i}
            initialPos={{ phi, theta }}
            rotation={rotation}
          />
        );
      })}
    </div>
  );
}

// Sub-component to handle individual tag math
function Tag({ text, initialPos, rotation }: { text: string, index: number, initialPos: { phi: number, theta: number }, rotation: { x: number, y: number } }) {
  // 3D Rotation Logic
  // Convert spherical coords to 3D Cartesian coords
  const x = RADIUS * Math.sin(initialPos.phi) * Math.cos(initialPos.theta);
  const y = RADIUS * Math.sin(initialPos.phi) * Math.sin(initialPos.theta);
  const z = RADIUS * Math.cos(initialPos.phi);

  // Apply Rotation Matrix
  // Rotate around X
  const rotatedX1 = x;
  const rotatedY1 = y * Math.cos(rotation.x) - z * Math.sin(rotation.x);
  const rotatedZ1 = y * Math.sin(rotation.x) + z * Math.cos(rotation.x);

  // Rotate around Y
  const rotatedX2 = rotatedX1 * Math.cos(rotation.y) + rotatedZ1 * Math.sin(rotation.y);
  const rotatedY2 = rotatedY1;
  const rotatedZ2 = -rotatedX1 * Math.sin(rotation.y) + rotatedZ1 * Math.cos(rotation.y);

  // Final positions
  const finalX = rotatedX2;
  const finalY = rotatedY2;
  const finalZ = rotatedZ2;

  // Calculate visual properties based on Z-depth
  const scale = (finalZ + 2 * RADIUS) / (3 * RADIUS); // Scale between ~0.5 and 1.2
  const opacity = Math.max(0.1, (finalZ + RADIUS) / (2 * RADIUS)); // Opacity fade at back
  const blur = Math.max(0, (1 - scale) * 10); // Blur items at the back

  return (
    <motion.div
      style={{
        position: 'absolute',
        transform: `translate3d(${finalX}px, ${finalY}px, 0) scale(${scale})`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: finalZ > 0 ? 20 : 1, // Objects in front cover the text, back go behind
        color: '#aaaaaa',
        fontSize: '14px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        pointerEvents: 'none', // Allow mouse to pass through to container
        willChange: 'transform, opacity, filter',
      }}
    >
      <span style={{
        padding: '8px 16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: `0 0 ${scale * 10}px rgba(255, 255, 255, 0.05)`
      }}>
        {text}
      </span>
    </motion.div>
  );
}