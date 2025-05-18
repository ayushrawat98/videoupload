import { eq, asc } from "drizzle-orm";
import { db } from "./database";
import { videos } from './schema'; // your schema file

export async function addNewVideo(detail : {title : string, description : string}) {
  return await db.insert(videos).values({
    title: detail.title,
    description: detail.description,
    views: 0,
    createdAt: new Date().toISOString()
  }).returning();
}

export async function deleteLastVideo(id : number){
    return await db.delete(videos).where(eq(videos.id, id));
}

export async function getLastVideo(){
    return await db.select().from(videos).orderBy(asc(videos.createdAt));
}