'use client';

export default function CommentButton({count} : {count : number}){
    function showComments(){
        alert("Show comments / Add comments")
    }
    return (
        <>
            <button className="bg-blue-600 text-white p-2 rounded disabled:opacity-50 my-2 w-full" onClick={showComments}>{count} Comments</button>
        </>
    )
}