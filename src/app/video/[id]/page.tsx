'use server';

import Video from "@/ui/video"
import { getVideoWithComments } from "@/lib/upload"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const reqData = await getVideoWithComments(Number(id))
    if (reqData == null) {
        return {
            title: "Not found",
            description: "Not found"
        }
    } else {
        return {
            title: reqData.title,
            description: reqData.description,
            openGraph: {
                title: reqData.title,
                description: reqData.description,
                images: [{ url: "https://bharattube.xyz/thumbnails/" + reqData.id + ".jpg" }],
            },
            twitter: {
                card: 'summary_large_image',
                title: reqData.title,
                description: reqData.description,
                images: ["https://bharattube.xyz/thumbnails/" + reqData.id + ".jpg"],
            },
        };
    }

}

export default async function VideoId({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const reqData = await getVideoWithComments(Number(id))
    if (reqData == null) {
        return <h3>Video not available</h3>
    } else {
        return (
            <>
                <div className="grid grid-cols-1 gap-6 px-4 py-6 max-w-[600px] mx-auto">
                    <Video {...reqData} />
                </div>
            </>
        )
    }
}