'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ScrollToTopOnNavigation() {
    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    useEffect(() => {
        console.log('Page param changed:', page)  // Debug log
        window.scrollTo(0, 0)
    }, [page])


    return (
        <>
        </>
    )
}