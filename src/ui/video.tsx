'use server';

export default async function Video({
  title,
  description,
  id,
  date
}: {
  title: string;
  description: string;
  id: number;
  date : string
}) {

    const path = "https://bharattube.xyz"

  return (
    <article
      itemScope
      itemType="https://schema.org/VideoObject"
      className="p-4 bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-md"
    >
      <meta itemProp="uploadDate" content={date} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="thumbnailUrl" content={`${path}/thumbnails/${id}.jpg`} />

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
    </article>
  );
}
