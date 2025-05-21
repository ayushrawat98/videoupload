'use server';

import Video from "@/ui/video"
import { getVideoWithComments } from "@/lib/upload"

export default async function VideoId({params} : {params : Promise<{id : string}>}){
    const {id} = await params
    const reqData = await getVideoWithComments(Number(id))
    return (
        <>
            <div className="grid grid-cols-1 gap-6 px-4 py-6 max-w-[600px] mx-auto">
                <Video {...reqData} />
            </div>
            
        </>
    )
}