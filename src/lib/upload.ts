import { eq, asc, sql, desc } from "drizzle-orm";
import { db } from "./database";
import { comments, videos } from './schema'; // your schema file
import { cache } from "react";

export async function addNewVideo(detail : {title : string, description : string}) {
  return await db.insert(videos).values({
    title: detail.title,
    description: detail.description,
    views: 0,
    createdAt: new Date().toISOString()
  }).returning();
}

export async function getAllVideosWithComments(limit : number, offset : number){
  return db
  .select({
    id: videos.id,
    title: videos.title,
    description : videos.description,
    createdAt: videos.createdAt,
    commentCount: sql<number>`COUNT(${comments.id})`.as('commentCount'),
  })
  .from(videos)
  .leftJoin(comments, eq(comments.videoId,videos.id))
  .groupBy(videos.id)
  .orderBy(desc(videos.createdAt))
  .limit(limit)
  .offset(offset);
}

export const getVideoWithComments = cache(async (videoId: number) => {
  const result = await db
    .select({
      id: videos.id,
      title: videos.title,
      description: videos.description,
      createdAt: videos.createdAt,
      commentCount: sql<number>`COUNT(${comments.id})`.as('commentCount'),
    })
    .from(videos)
    .leftJoin(comments, eq(comments.videoId, videos.id))
    .where(eq(videos.id, videoId))
    .groupBy(videos.id)
    .limit(1);

    if(result.length == 0){
      return null
    }else{
      return result[0]
    }
  // return result[0] ?? null;
});

export async function deleteLastVideo(id : number){
    return await db.delete(videos).where(eq(videos.id, id));
}

export async function getLastVideo(){
    return await db.select().from(videos).orderBy(asc(videos.createdAt));
}

export async function getCommentsCount(videoId: number): Promise<number> {
  const result = await db
    .select({
      count: sql<number>`COUNT(*)`
    })
    .from(comments)
    .where(eq(comments.videoId, videoId));

  return result[0]?.count ?? 0;
}

export async function getCommentsForVideo(videoId: number) {
  return await db
    .select()
    .from(comments)
    .where(eq(comments.videoId, videoId))
    .orderBy(comments.id);  // or order by timestamp if you add one
}