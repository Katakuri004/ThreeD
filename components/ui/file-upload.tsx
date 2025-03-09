"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { IconUpload, IconFile, IconX } from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  className?: string;
  onFileSelect: (file: File) => void;
}

export function FileUpload({ className, onFileSelect }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/fbx': ['.fbx'],
      'model/gltf': ['.gltf', '.glb'],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50",
          isDragActive && "border-primary/50 bg-primary/5",
          file && "border-primary/50 bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        {!file ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <IconUpload className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium">
              {isDragActive ? "Drop your CAD file here" : "Drag & drop your CAD file here"}
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: .stl, .obj, .fbx, .gltf, .glb
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconFile className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="rounded-full p-1 hover:bg-muted"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <Progress value={uploadProgress} className="h-1" />
          </div>
        )}
      </div>
    </div>
  );
} 