'use client';

import { useState } from "react";
import CommentModal from "./commentmodal";

export default function CommentButton({count, id} : {count : number, id : number}){

    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="bg-blue-600/10 backdrop-blur-md shadow-md border border-white/20 text-white p-2 my-2 w-full" onClick={() => setOpen(true)}>{count} Comments</button>
            {open && <CommentModal videoId={id} onClose={() => setOpen(false)} />}
        </>
    )
}