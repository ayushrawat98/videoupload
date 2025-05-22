// import { db } from "@/lib/database";
// import { videos } from "@/lib/schema";
import { getAllVideosWithComments } from "@/lib/upload";
import InfiniteLoader from "@/ui/infiniteloader";
import Video from "@/ui/video";
// import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export default async function Home() {
  // const videolist = await db.select().from(videos).orderBy(desc(videos.createdAt));
  const videolist = await getAllVideosWithComments(600,0)
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 py-6 max-w-[600px] mx-auto">
      {
        videolist.map(video => {
          return <Video key={video.id} {...video}/>
        })
      }
      {/* <InfiniteLoader /> */}
      </div>
    </>
  );
}
