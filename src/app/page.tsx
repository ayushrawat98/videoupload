// import { db } from "@/lib/database";
// import { videos } from "@/lib/schema";
import { getAllVideosWithComments } from "@/lib/upload";
// import InfiniteLoader from "@/ui/infiniteloader";
import Video from "@/ui/video";
import Link from "next/link";
// import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  // const videolist = await db.select().from(videos).orderBy(desc(videos.createdAt));
  const page = parseInt((await searchParams).page ?? '1', 10)
  const videolist = await getAllVideosWithComments(8, (page-1)*8)
  const hasMore = videolist[videolist.length-1].id != 1
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-4 py-6 max-w-[600px] mx-auto">
        {
          videolist.map(video => {
            return <Video key={video.id} {...video} />
          })
        }

        <div className="mt-6 flex justify-between">
          {/* Prev button */}
          {page > 1 ? (
            <Link
              href={`?page=${page - 1}`}
              className="px-4 py-2 bg-gray-500 text-black rounded hover:bg-gray-600"
            >
              ←
            </Link>
          ) : (
            <span />
          )}

          {/* Next button */}
          {hasMore ? (
            <Link
              href={`?page=${page + 1}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              →
            </Link>
          ) : (
            <span />
          )}
        </div>

        {/* <InfiniteLoader /> */}
      </div>
    </>
  );
}
