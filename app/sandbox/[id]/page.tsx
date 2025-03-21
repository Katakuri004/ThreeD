"use client";

import { BackgroundBoxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { ModelViewer } from "@/components/ModelViewer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function SandboxPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [showAlert, setShowAlert] = useState(true);
  
  // Mock model URL - in production, this would be fetched from your database
  const modelUrl = `/models/${id}/model.glb`;
  
  // Mock model component
  const MockModel = () => (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#4f46e5"
        metalness={0.5}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );

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
          </div>
        </div>

        {/* 3D Viewer */}
        <div className="h-screen w-full">
          <ModelViewer 
            modelUrl={modelUrl} 
            className="h-full"
            fallbackModel={<MockModel />}
          />
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No CAD Model Found</AlertDialogTitle>
            <AlertDialogDescription>
              The requested CAD model is not available. You are viewing a mock model for demonstration purposes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 