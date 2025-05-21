'use client';
import { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ path, id }: { path: string, id: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVertical, setIsVertical] = useState<boolean | null>(null);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleMetadata = () => {
            setIsVertical(video.videoHeight > video.videoWidth)
        };

        video.addEventListener('loadedmetadata', handleMetadata);
        return () => video.removeEventListener('loadedmetadata', handleMetadata);
    }, []);

    return (
        <>
            <video
                ref={videoRef}
                itemProp="contentUrl"
                src={`${path}/videos/${id}`}
                controls
                preload="none"
                poster={`${path}/thumbnails/${id}.jpg`}
                className={"w-full rounded-sm mb-3 outline outline-gray-700 bg-black " + (isVertical ? "max-h-[50vh]" : "")}
            >
                Sorry, your browser do not support embedded videos.
            </video>
        </>
    );
}
