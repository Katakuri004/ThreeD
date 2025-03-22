"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BackgroundBoxes } from "@/components/ui/background-boxes";
import { toast } from "sonner";
import { IconPlus, IconX, IconCheck, IconX as IconCross } from "@tabler/icons-react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface UploadFormData {
  title: string;
  description: string;
  file: File | null;
  images: File[];
}

interface UploadEvent {
  id: string;
  fileName: string;
  status: 'uploading' | 'success' | 'error';
  timestamp: Date;
  error?: string;
}

// Recent Upload Events Component
const RecentUploadEvents = ({ events }: { events: UploadEvent[] }) => {
  return (
    <div className="fixed right-4 top-24 w-80 space-y-2 rounded-lg border bg-card p-4 shadow-lg">
      <h3 className="mb-4 font-semibold">Recent Uploads</h3>
      <div className="max-h-[400px] space-y-2 overflow-y-auto">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent uploads</p>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-md border border-muted-foreground/20 bg-background/50 p-2"
            >
              <div className="flex items-center gap-2">
                {event.status === 'uploading' && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-primary" />
                )}
                {event.status === 'success' && (
                  <IconCheck className="h-4 w-4 text-green-500" />
                )}
                {event.status === 'error' && (
                  <IconCross className="h-4 w-4 text-red-500" />
                )}
                <div>
                  <p className="text-sm font-medium truncate max-w-[180px]" title={event.fileName}>
                    {event.fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {event.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className={cn(
                "text-xs font-medium",
                event.status === 'success' && "text-green-500",
                event.status === 'error' && "text-red-500"
              )}>
                {event.status === 'uploading' ? 'Uploading...' : event.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function UploadPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    title: "",
    description: "",
    file: null,
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadEvents, setUploadEvents] = useState<UploadEvent[]>([]);
  const { startUpload } = useUploadThing("modelUploader");
  const router = useRouter();

  const addUploadEvent = (event: Omit<UploadEvent, 'id' | 'timestamp'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).slice(2),
      timestamp: new Date(),
    };
    setUploadEvents(prev => [newEvent, ...prev].slice(0, 10)); // Keep only last 10 events
  };

  const handleFileSelect = (file: File) => {
    setFormData((prev) => ({ ...prev, file }));
    setShowForm(true);
    addUploadEvent({
      fileName: file.name,
      status: 'uploading',
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    files.forEach(file => {
      addUploadEvent({
        fileName: file.name,
        status: 'uploading',
      });
    });

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    // Create image previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const removedImage = formData.images[index];
    addUploadEvent({
      fileName: removedImage.name,
      status: 'error',
      error: 'Removed by user'
    });
    
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.file || !formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // Upload the main model file
      const modelUploadResult = await startUpload([formData.file]);
      if (!modelUploadResult) {
        throw new Error("Failed to upload model file");
      }
      addUploadEvent({
        fileName: formData.file.name,
        status: 'success',
      });

      // Upload images if any
      let imageUrls: string[] = [];
      if (formData.images.length > 0) {
        const imageUploadResult = await startUpload(formData.images);
        if (imageUploadResult) {
          imageUrls = imageUploadResult.map(res => res.url);
          formData.images.forEach(image => {
            addUploadEvent({
              fileName: image.name,
              status: 'success',
            });
          });
        }
      }

      toast.success("Model uploaded successfully!");
      setShowForm(false);
      setFormData({ title: "", description: "", file: null, images: [] });
      setImagePreviews([]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload model");
      
      // Mark all current uploads as failed
      if (formData.file) {
        addUploadEvent({
          fileName: formData.file.name,
          status: 'error',
          error: 'Upload failed'
        });
      }
      formData.images.forEach(image => {
        addUploadEvent({
          fileName: image.name,
          status: 'error',
          error: 'Upload failed'
        });
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-4 pt-24 pb-6">
      <BackgroundBoxes className="fixed inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Upload Your CAD Model</h1>
          <p className="text-muted-foreground">
            Share your designs with the community. Supported formats: .stl, .obj, .fbx, .gltf, .glb
          </p>
        </div>

        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        <AlertDialog open={showForm} onOpenChange={setShowForm}>
          <AlertDialogContent className="sm:max-w-[600px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Model Details</AlertDialogTitle>
              <AlertDialogDescription>
                Add information about your CAD model to help others discover it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter a descriptive title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe your model, its features, and use cases"
                  className="h-32 resize-none"
                />
              </div>
              
              <div>
                <Label>Gallery Images (Optional)</Label>
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="rounded-lg object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <IconX className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {formData.images.length < 6 && (
                    <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                      <IconPlus className="h-8 w-8 text-muted-foreground/50" />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Add up to 6 images showcasing your model from different angles
                </p>
              </div>
            </div>

            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Upload Model</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Recent Upload Events Section */}
      <RecentUploadEvents events={uploadEvents} />
    </div>
  );
} 