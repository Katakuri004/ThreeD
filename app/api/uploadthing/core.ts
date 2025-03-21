import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  modelUploader: f({
    image: { maxFileSize: "4MB" },
    "application/octet-stream": { maxFileSize: "32MB" },
    "model/stl": { maxFileSize: "32MB" },
    "model/obj": { maxFileSize: "32MB" },
    "model/gltf+json": { maxFileSize: "32MB" },
    "model/gltf-binary": { maxFileSize: "32MB" },
    "application/x-tgif": { maxFileSize: "32MB" },
  })
    .middleware(async ({ req }) => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) throw new Error("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const model = await db.model.create({
          data: {
            title: file.name.split('.')[0],
            description: "",
            fileUrl: file.url,
            thumbnail: file.url,
            category: "Uncategorized",
            userId: metadata.userId,
            status: "PUBLIC"
          },
        });

        return { modelId: model.id };
      } catch (error) {
        console.error("[UPLOAD_ERROR]", error);
        throw new Error("Failed to create model record");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 