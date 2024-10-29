"use client";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

interface Comment {
  id: number;
  text: string;
}

const CommentComponent: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-2xl font-semibold">Comments</h2>

      <div className="mb-6">
        <textarea
          className="w-full resize-none rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-3 w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition-all duration-200 hover:bg-blue-600"
        >
          Submit
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Transition
            key={comment.id}
            show={true}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="rounded-lg bg-gray-100 p-4 shadow-md transition-shadow duration-200 hover:shadow-lg">
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </Transition>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
