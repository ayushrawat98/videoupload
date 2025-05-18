'use client';

import { useActionState, useEffect } from "react"
import { uploadAction } from "@/actions/upload";
import { useRouter } from "next/navigation";


export default function Upload() {
    const [state, formUploadAction, pending] = useActionState(uploadAction, { error: undefined, success: false })

    const router = useRouter();
    useEffect(() => {
        if (state?.success) router.push('/');
    }, [state, router]);

    return (
        <>
            <form action={formUploadAction} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold">Upload</h1>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="file"
                    name="file"
                    placeholder="File"
                    accept="video/*"
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded disabled:opacity-50" disabled={pending}>
                    {pending ? 'Uploading...' : 'Upload'}
                </button>
                {state?.error && <p className="text-red-500">{state.error}</p>}
            </form>
        </>
    )
}