"use client";

import { Suspense, useState } from "react";
import { use } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { BackgroundBoxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";

function Model({ url }: { url: string }) {
  const [error, setError] = useState(false);

  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  } catch (err) {
    if (!error) {
      setError(true);
      toast.error("Failed to load 3D model");
    }
    // Return a simple cube as fallback
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    );
  }
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
}

export default function SandboxPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // TODO: Replace with actual model fetching logic
  const modelUrl = `/models/${id}/model.glb`;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10">
        {/* Header */}
        <div className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href={`/models/${id}`}>
              <Button variant="ghost" className="gap-2">
                <IconArrowLeft className="h-5 w-5" />
                Back to Model
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Reset View
              </Button>
              <Button variant="outline" size="sm">
                Screenshot
              </Button>
            </div>
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="h-screen w-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: "transparent" }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Stage environment="city" intensity={0.5}>
                <Model url={modelUrl} />
              </Stage>
              <OrbitControls
                autoRotate
                autoRotateSpeed={0.5}
                enableZoom={true}
                enablePan={true}
                minDistance={2}
                maxDistance={10}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
} 