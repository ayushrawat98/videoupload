'use client'

import { useEffect, useRef, useState } from 'react'
import VideoClient from './videoclient';

type video = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    commentCount: number;
}

export default function InfiniteLoader() {
    const [items, setItems] = useState<video[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const loaderRef = useRef(null)
    const isFirstRun = useRef(true)
    const [noData, setNoData] = useState(false)

    useEffect(() => {

        if (isFirstRun.current) {
            console.log('first run')
            isFirstRun.current = false
            return;
        }
        const fetchItems = async () => {
            const res = await fetch(`/api/videos?page=${page}`)
            const data = await res.json()
            if (data.length == 0) {
                setNoData(true)
                setLoading(false)
                return
            }
            setItems(prev => [...prev, ...data])
            setLoading(false)
        }

        fetchItems()
    }, [page])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && !noData) {
                setLoading(true)
                setPage(prev => prev + 1)
            }
        }, { threshold: 1.0 })

        if (loaderRef.current) observer.observe(loaderRef.current)

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current)
        }
    }, [loading])

    return (
        <>
            {
                items.map(video => {
                    return <VideoClient key={video.id} {...video} />
                })
            }
            {loading && <><article className="p-4  shadow-lg rounded-md animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-full" />
            </article>
                <article className="p-4  shadow-lg rounded-md animate-pulse">
                    <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

                    <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-full" />
                </article>
                <article className="p-4  shadow-lg rounded-md animate-pulse">
                    <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

                    <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-700 rounded w-full" />
                </article></>}
            {noData && <span>No more videos (┬┬﹏┬┬)</span>}
            <div ref={loaderRef} className="h-10" />
        </>
    )
}
