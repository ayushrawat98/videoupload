import { db } from '@/lib/database';
import { videos } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import fs from "fs/promises"
import { NextResponse } from 'next/server';
import path from "path";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const videoId = url.searchParams.get('id');
    const key = url.searchParams.get('key');
    if (!videoId || key != "lele") {
        return NextResponse.json({ error: 'Missing videoId' }, { status: 400 });
    }

    const tempid = Number(videoId)
    try{
    //delete from db
    await db.delete(videos).where(eq(videos.id, tempid));
    //delete video
    await fs.unlink(path.join(process.cwd(), 'public', 'videos', videoId))
    //delete thumbnail
    await fs.unlink(path.join(process.cwd(), 'public', 'thumbnails', videoId))
    }catch(err){
        
    }

    return NextResponse.json({ error: 'sucess'}, { status: 200 });
}