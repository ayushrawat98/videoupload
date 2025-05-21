'use client';

import { useState } from "react";
import CommentModal from "./commentmodal";

export default function CommentButton({count, id, extra} : {count : number, id : number, extra : string}){

    const [open, setOpen] = useState(false);

    return (
        <>
            <button className={"bg-blue-600/10 backdrop-blur-md shadow-md border border-white/20 text-white p-2 my-2 " + extra} onClick={() => setOpen(true)}>{count} Comments</button>
            {open && <CommentModal videoId={id} onClose={() => setOpen(false)} />}
        </>
    )
}