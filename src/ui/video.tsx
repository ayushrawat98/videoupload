'use server';

import CommentButton from "./commentbutton";
import CopyLink from "./copylink";

export default async function Video({
  title,
  description,
  id,
  createdAt,
  commentCount
}: {
  title: string;
  description: string;
  id: number;
  createdAt : string;
  commentCount : number
}) {

    const path = "https://bharattube.xyz"
    // const path = ""

  return (
    // bg-gray-800 border border-gray-700
    
    <article
      itemScope
      itemType="https://schema.org/VideoObject"
      className="p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-md"
    >
      <meta itemProp="uploadDate" content={createdAt} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="thumbnailUrl" content={`${path}/thumbnails/${id}.jpg`} />

      {/* <CopyLink id={id}/> */}
      
      <video
        itemProp="contentUrl"
        src={`${path}/videos/${id}`}
        controls
        preload="none"
        poster={`${path}/thumbnails/${id}.jpg`}
        className="w-full rounded-sm mb-3 border border-gray-700 bg-black"
      >
        Sorry, your browser do not support embedded videos.
      </video>

      <h2 itemProp="name" className="text-lg font-semibold text-gray-100 mb-1">
        {title}
      </h2>
      <p itemProp="description" className="text-gray-300 text-sm">
        {description}
      </p>
      <CommentButton count={commentCount} id={id} extra="w-[80%]"/>
      <CopyLink id={id}/>
    </article>
  );
}
