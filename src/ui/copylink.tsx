'use client';

import { useState, type MouseEvent } from 'react';

export default function CopyLink({ id }: { id: number }) {

    const [text, setText] = useState(false)

    function copyLink(event: MouseEvent) {
        event.preventDefault()
        navigator.clipboard.writeText("https://bharattube.xyz/video/" + id)
            .then(() => {
                setText(true)
                setTimeout(() => {
                    setText(false)
                }, 1000);
            })
    }

    return (
        <>
            {/* <div className='flex mb-0.5'>
                <a className='ml-auto text-sm' href={"https://bharattube.xyz/video/" + id} onClick={(event) => copyLink(event)}>{text}</a>
            </div> */}
            <button className="bg-blue-600/10 backdrop-blur-md shadow-md border border-white/20 text-white p-2 my-2 w-[20%]" onClick={(event) => copyLink(event)}>Share</button>
            {text && (
                <div
                    className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1"
                    role="tooltip"
                >
                    Link copied!
                </div>
            )}
        </>
    )
}