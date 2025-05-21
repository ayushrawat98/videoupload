'use server';

import { createThumbnail } from "@/lib/thumbnail";
import { addNewVideo, deleteLastVideo, getLastVideo } from "@/lib/upload";
import fs from "fs/promises"
import path from "path";

export async function uploadAction(prevState: { error?: string, success?: boolean }, formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const video = formData.get('file') as File

    //validations
    if (typeof title !== 'string' || title.trim() === '' || title.trim().length > 200) {
        return { error: 'Title length should be between 0-200' }
    } else if (typeof description !== 'string' || description.trim() === '' || description.trim().length > 200) {
        return { error: 'Description length should be between 0-2000' }
    } else if (video.size > 52428800) {
        return { error: 'Vidoe size should be less than 50 MB' }
    }

    //DB
    try {
        const videoDetails = await addNewVideo({ title: title, description: description })
        const publicDir = path.join(process.cwd(), 'public', 'videos');
        const buffer = Buffer.from(await video.arrayBuffer());
        await fs.writeFile(`${publicDir}/${videoDetails[0].id}`, buffer)
        createThumbnail(videoDetails[0].id)
        deleteVideo()
        return { success: true }
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message }
        } else {
            console.log(error)
            return { error: "Something broke!" }
        }
    }
}

async function deleteVideo() {
    const allVideos = await getLastVideo()
    if (allVideos.length > 600) {
        const oldest = allVideos[0];

        // Delete video file and thumbnail
        const videoPath = path.join(process.cwd(), "public", "videos", String(oldest.id));
        const thumbPath = path.join(process.cwd(), "public", "thumbnails", `${oldest.id}.jpg`);
        await fs.rm(videoPath, { force: true }).catch(() => { });
        await fs.rm(thumbPath, { force: true }).catch(() => { });

        // Delete from DB
        await deleteLastVideo(oldest.id)
    }
}