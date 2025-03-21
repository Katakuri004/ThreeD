"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { Suspense, useState, useEffect } from "react"
import { FloatingDock } from "./ui/floating-dock"
import { IconLock, IconLockOpen, IconZoomIn, IconZoomOut, IconRotate } from "@tabler/icons-react"
import { loadModel } from "@/lib/model-loader"

interface ModelViewerProps {
  modelUrl: string
  className?: string
  fallbackModel?: React.ReactNode
}

export function ModelViewer({ modelUrl, className, fallbackModel }: ModelViewerProps) {
  const [isLocked, setIsLocked] = useState(false)
  const [controls, setControls] = useState<any>(null)
  const [model, setModel] = useState<any>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    loadModel(modelUrl)
      .then(setModel)
      .catch((err) => {
        console.error("Failed to load model:", err)
        setError(true)
      })
  }, [modelUrl])

  const dockItems = [
    {
      title: isLocked ? "Unlock View" : "Lock View",
      icon: isLocked ? <IconLockOpen className="h-5 w-5" /> : <IconLock className="h-5 w-5" />,
      href: "#",
      onClick: () => {
        setIsLocked(!isLocked)
        if (controls) {
          controls.enabled = !isLocked
        }
      }
    },
    {
      title: "Reset View",
      icon: <IconRotate className="h-5 w-5" />,
      href: "#",
      onClick: () => {
        if (controls) {
          controls.reset()
        }
      }
    },
    {
      title: "Zoom In",
      icon: <IconZoomIn className="h-5 w-5" />,
      href: "#",
      onClick: () => {
        if (controls) {
          controls.dollyOut(1.2)
        }
      }
    },
    {
      title: "Zoom Out",
      icon: <IconZoomOut className="h-5 w-5" />,
      href: "#",
      onClick: () => {
        if (controls) {
          controls.dollyIn(1.2)
        }
      }
    }
  ]

  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas shadows camera={{ position: [0, 0, 150], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            {error && fallbackModel ? (
              fallbackModel
            ) : (
              model && <primitive object={model} />
            )}
          </Stage>
          <OrbitControls
            ref={(ref) => setControls(ref)}
            makeDefault
            minDistance={50}
            maxDistance={300}
            maxPolarAngle={Math.PI / 2}
            enabled={!isLocked}
          />
        </Suspense>
      </Canvas>
      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-8 left-1/2 -translate-x-1/2"
        mobileClassName="fixed bottom-4 right-4"
      />
    </div>
  )
}

function Model({ url }: { url: string }) {
  // This is a placeholder - you'll need to implement actual model loading
  // based on your model format (gltf, obj, etc.)
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
} 