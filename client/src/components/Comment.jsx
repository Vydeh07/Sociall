import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const formatDate = (dateString) => {
  if (!dateString) return "Just now";
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function Comment({ comment }) {
  
  
  if (!comment || !comment.user) {
    return (
      <div className="flex space-x-2">
        <FaUserCircle className="text-3xl text-gray-400 mt-1" />
        <div className="bg-gray-100 p-3 rounded-lg flex-1">
          <p className="text-sm text-gray-500 italic">Comment unavailable.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Link to={`/profile/${comment.user._id}`}>
        <FaUserCircle className="text-3xl text-gray-500 mt-1" />
      </Link>
      <div className="bg-gray-100 p-3 rounded-lg flex-1">
        <div className="flex justify-between items-center">
          <Link
            to={`/profile/${comment.user._id}`}
            className="font-semibold text-sm text-gray-800 hover:underline"
          >
            {comment.user.name}
          </Link>
          <span className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
      </div>
    </div>
  );
}

