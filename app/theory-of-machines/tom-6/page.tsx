"use client";

import { BackgroundBoxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { ModelViewer } from "@/components/ModelViewer";

export default function TheoryOfMachinesPage() {
  // TODO: Replace with actual model URL from your data source
  const modelUrl = "/models/tom-6/model.glb";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10">
        {/* Header */}
        <div className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 px-4 py-3 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/theory-of-machines">
              <Button variant="ghost" className="gap-2">
                <IconArrowLeft className="h-5 w-5" />
                Back to Theory of Machines
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold">TOM-6: Mechanism Analysis</h1>
          <div className="mb-8">
            <p className="text-lg text-gray-300">
              This interactive 3D model demonstrates the principles of mechanism analysis in Theory of Machines.
              Use the controls below to explore the model from different angles and zoom levels.
            </p>
          </div>

          {/* 3D Viewer */}
          <div className="h-[600px] w-full rounded-lg overflow-hidden">
            <ModelViewer modelUrl={modelUrl} />
          </div>
        </div>
      </div>
    </div>
  );
} 