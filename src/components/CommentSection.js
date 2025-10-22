"use client";

import { useState } from "react";

export default function CommentsSection({ comments = [] }) {
  const [showAll, setShowAll] = useState(false);
  const [newComment, setNewComment] = useState("");

  const visibleComments = showAll ? comments : comments.slice(0, 5);

  return (
    <section id="comments" className="mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        💬 Comments
      </h2>

      {/* --- Comment List --- */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {visibleComments.map((comment, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={comment.avatar || "/author-avatar.png"}
                  alt={comment.name}
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {comment.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {comment.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 italic">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}

      {/* --- Show More Button --- */}
      {comments.length > 5 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
          >
            {showAll ? "Show Less" : "Show More Comments"}
          </button>
        </div>
      )}

      {/* --- Add Comment Form --- */}
      <div className="mt-10 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          📝 Add a Comment
        </h3>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          rows={4}
        />

        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              if (!newComment.trim()) return alert("Please enter a comment.");
              alert("Comment feature coming soon!");
              setNewComment("");
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Post Comment
          </button>
        </div>
      </div>
    </section>
  );
}
