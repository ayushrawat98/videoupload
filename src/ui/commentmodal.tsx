'use client';
import { useState, useEffect } from 'react';

type Comment = { id: number; videoId: number; content: string };

export default function CommentModal({ videoId, onClose }: { videoId: number; onClose: () => void }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(`/api/comments?videoId=${videoId}`);
      if (res.ok) setComments(await res.json());
    }
    fetchComments();
  }, [videoId]);

  async function handleAdd() {
    if (!newText.trim()) return;
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId : videoId, text: newText }),
    });
    if (res.ok) {
      const created = await res.json();
      setComments(prev => [...prev, created]);
      setNewText('');
    }
  }

  return (
    <div className="fixed z-10 inset-0 flex items-end justify-center">
      <div className=" w-full bg-black max-h-3/4 rounded-t-2xl p-4 overflow-y-auto animate-slide-up">
        <button onClick={onClose} className="text-right w-full mb-2">✕</button>
        <div className="space-y-2">
          { comments.length == 0 && <div className="h-5 bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />}
          {comments.map(c => (
            <div key={c.id} className="p-2 text-white rounded">
              Anon : {c.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex sticky bottom-0 bg-black">
          <input
            type="text"
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 p-2 border rounded-l"
          />
          <button onClick={handleAdd} className="bg-blue-600 text-white p-2 rounded-r">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}