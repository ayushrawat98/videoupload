import { getAllVideosWithComments } from "@/lib/upload"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page') || 1)
  const items = await getAllVideosWithComments(8, (page-1)*8)

  return Response.json( items )
}
