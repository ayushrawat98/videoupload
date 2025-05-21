'use client';

import { useState, type MouseEvent } from 'react';

export default function CopyLink({ id }: { id: number }) {

    const [text, setText] = useState("[Copy Link]")

    function copyLink(event: MouseEvent) {
        event.preventDefault()
        navigator.clipboard.writeText("https://bharattube.xyz/video/" + id)
            .then(() => {
                setText("[Copied]")
                setTimeout(() => {
                    setText("[Copy Link]")
                }, 1000);
            })
    }

    return (
        <>
            <div className='flex mb-0.5'>
                <a className='ml-auto text-sm' href={"https://bharattube.xyz/video/" + id} onClick={(event) => copyLink(event)}>{text}</a>
            </div>
        </>
    )
}