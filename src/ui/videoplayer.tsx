'use client';
import { useState } from 'react';

export default function VideoPlayer({ path, id }: { path: string, id: number }) {
    const [isVertical, setIsVertical] = useState<boolean | null>(null);

    function metaDataLoaded(e : React.SyntheticEvent<HTMLVideoElement, Event> ){
        setIsVertical(e.currentTarget.videoHeight > e.currentTarget.videoWidth)
    }
   
    return (
        <>
            <video
                itemProp="contentUrl"
                src={`${path}/videos/${id}`}
                controls
                preload="none"
                poster={`${path}/thumbnails/${id}.jpg`}
                onLoadedMetadata={(e) => metaDataLoaded(e)}
                className={"w-full rounded-sm mb-3 outline outline-gray-700 bg-black " + (isVertical ? "max-h-[50vh]" : "")}
            >
            </video>
        </>
    );
}
