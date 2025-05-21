/* app/api/comments/route.ts */
import { db } from '@/lib/database';
import { comments } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const videoId = url.searchParams.get('videoId');
    if (!videoId) {
        return NextResponse.json({ error: 'Missing postId' }, { status: 400 });
    }

    const tempid = Number(videoId)

    const result = await db
        .select()
        .from(comments)
        .where(eq(comments.videoId, tempid))
        .orderBy(comments.id);  // or order by timestamp if you add one
    return NextResponse.json(result);
}

export async function POST(request: Request) {
  const { videoId, text } = await request.json();
  if (!videoId || text.trim().length == 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const [newComment] = await db.insert(comments).values({ videoId: Number(videoId), content : text.trim() }).returning();
  return NextResponse.json(newComment, { status: 201 });
}