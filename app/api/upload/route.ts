import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string

    if (!file || !title || !category) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // TODO: Implement actual file upload to cloud storage (e.g., S3)
    // For now, we'll just save the metadata
    const model = await db.model.create({
      data: {
        title,
        description,
        category,
        fileUrl: 'placeholder-url', // Replace with actual uploaded file URL
        thumbnail: 'placeholder-thumbnail', // Replace with actual thumbnail URL
        userId: session.user.id,
      },
    })

    return NextResponse.json(model)
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 