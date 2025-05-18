import { db } from "@/lib/database";
import { videos } from "@/lib/schema";
import Video from "@/ui/video";
import { desc } from 'drizzle-orm';


export default async function Home() {
  const videolist = await db.select().from(videos).orderBy(desc(videos.createdAt));
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 py-6 max-w-[600px] mx-auto">
      {
        videolist.map(video => {
          return <Video key={video.id} title={video.title} description={video.description} id={video.id} date={video.createdAt}/>
        })
      }
      </div>
    </>
  );
}
