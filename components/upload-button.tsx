import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "./ui/button";
import { Loader2, Upload } from "lucide-react";

export function UploadButton() {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("modelUploader");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        await startUpload(acceptedFiles);
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    },
    [startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*", "application/octet-stream"]),
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p className="text-lg">Drag & drop files here, or click to select files</p>
            <p className="text-sm text-gray-500">
              Supported formats: STL, OBJ, STEP, and more (max 32MB)
            </p>
          </>
        )}
        {isUploading && (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
} 