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
            isFirstRun.current = false
            return;
        }
        setLoading(true)
        const fetchItems = async () => {
            // await new Promise(res => setTimeout(res, 3000))

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
        const target = loaderRef.current
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && !noData) {
                setPage(prev => prev + 1)
            }
        }, { threshold: 1.0 })

        if (target) observer.observe(target)

        return () => {
            if (target) observer.unobserve(target)
        }
    }, [loading, noData])

    return (
        <>
            

            {
                items.map(video => {
                    return <VideoClient key={video.id} {...video} />
                })
            }

            {loading && <article className="p-4  shadow-lg rounded-md animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-sm mb-3" />

                <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-full" />
            </article>
            }

            {noData && <span className='text-center'>No more videos (┬┬﹏┬┬)</span>}
            <div ref={loaderRef} className="h-10" />
        </>
    )
}
