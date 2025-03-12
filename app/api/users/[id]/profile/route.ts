import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: {
        id: params.id,
      },
      include: {
        models: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            category: true,
            status: true,
            createdAt: true,
            likes: true,
            downloads: true,
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Transform the data to match the expected format
    const transformedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      models: user.models.map(model => ({
        ...model,
        tag: model.category as any, // Map category to tag
        createdAt: model.createdAt.toISOString(),
      })),
      pointHistory: [], // Initialize empty for now
      stats: {
        totalLikes: user.models.reduce((sum, model) => sum + model.likes, 0),
        modelsCreated: user.models.length,
        completedBounties: 0, // Initialize to 0 for now
      },
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("[USER_PROFILE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const { name, image } = await req.json();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Only allow users to update their own profile
    if (session.user.id !== params.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        name: name,
        image: image,
      },
      include: {
        models: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            category: true,
            status: true,
            createdAt: true,
            likes: true,
            downloads: true,
          },
        },
      },
    });

    // Transform the response to match the expected format
    const transformedUser = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      models: updatedUser.models.map(model => ({
        ...model,
        tag: model.category as any,
        createdAt: model.createdAt.toISOString(),
      })),
      pointHistory: [],
      stats: {
        totalLikes: updatedUser.models.reduce((sum, model) => sum + model.likes, 0),
        modelsCreated: updatedUser.models.length,
        completedBounties: 0,
      },
    };

    return NextResponse.json(transformedUser);
  } catch (error) {
    console.error("[USER_PROFILE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 