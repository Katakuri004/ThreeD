"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { Suspense } from "react"

export function LoadingViewer({ className }: { className?: string }) {
  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial 
                color="#4f46e5"
                metalness={0.5}
                roughness={0.2}
                wireframe
                transparent
                opacity={0.5}
              />
            </mesh>
          </Stage>
          <OrbitControls
            makeDefault
            minDistance={50}
            maxDistance={300}
            maxPolarAngle={Math.PI / 2}
            enabled={false}
          />
        </Suspense>
      </Canvas>
    </div>
  )
} 