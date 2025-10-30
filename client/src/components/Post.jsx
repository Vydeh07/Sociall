import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import Comment from "./Comment"; 
import {
  FaThumbsUp,
  FaCommentAlt,
  FaEdit,
  FaTrash,
  FaUserCircle,
  FaPaperPlane,
} from "react-icons/fa";


const formatDate = (dateString) => {
  if (!dateString) return "Just now";
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function Post({ post, onPostDeleted, onPostUpdated }) {
  const { user } = useAuth(); 
  
  
  const [currentPost, setCurrentPost] = useState(post);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);

  const isMyPost = user && currentPost.user?._id === user.id;
  const hasLiked = currentPost.likes.includes(user?.id);


  const handleLike = async () => {
    try {
     
      const newLikes = hasLiked
        ? currentPost.likes.filter((id) => id !== user.id)
        : [...currentPost.likes, user.id];
      
      setCurrentPost({ ...currentPost, likes: newLikes });

      
      await api.put(`/posts/like/${currentPost._id}`);
     
    } catch (err) {
      console.error("Failed to like post", err);
      
      setCurrentPost(post);
    }
  };


  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await api.post(`/posts/comment/${currentPost._id}`, {
        text: commentText,
      });
      
      setCurrentPost(res.data);
      onPostUpdated(res.data); 
      setCommentText(""); 
      setShowComments(true);
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleDelete = async () => {
   
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await api.delete(`/posts/${currentPost._id}`);
      
      onPostDeleted(currentPost._id);
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Failed to delete post.");
    }
  };



  const handleEdit = async () => {
    if (editContent === currentPost.content) {
      setIsEditing(false);
      return;
    }

    try {
      const res = await api.put(`/posts/${currentPost._id}`, {
        content: editContent,
      });
      
     
      const updatedPost = { ...currentPost, content: res.data.content };
      setCurrentPost(updatedPost);
      onPostUpdated(updatedPost);
      setIsEditing(false); 
    } catch (err) {
      console.error("Failed to edit post", err);
      alert("Failed to edit post.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      
      <div className="flex items-start justify-between mb-4">
        <Link
          to={`/profile/${currentPost.user?._id}`}
          className="flex items-center space-x-3 group"
        >
          <FaUserCircle className="text-4xl text-gray-500" />
          <div>
            <p className="font-bold text-gray-900 group-hover:underline">
              {currentPost.user?.name || "Deleted User"}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(currentPost.createdAt)}
            </p>
          </div>
        </Link>
        
       
        {isMyPost && !isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600"
              title="Edit Post"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
              title="Delete Post"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      
      <div className="mb-4">
        {isEditing ? (
          <div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="text-sm bg-blue-600 text-white px-4 py-1 rounded-full font-semibold hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
        
          <p className="text-gray-800 whitespace-pre-wrap">{currentPost.content}</p>
        )}
      </div>

      
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="cursor-pointer hover:underline">
          {currentPost.likes.length} Likes
        </span>
        <span
          onClick={() => setShowComments(!showComments)}
          className="cursor-pointer hover:underline"
        >
          {currentPost.comments.length} Comments
        </span>
      </div>

      <hr />

     
      <div className="flex justify-around py-1 text-gray-600">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-md hover:bg-gray-100 ${
            hasLiked ? "text-blue-600 font-semibold" : ""
          }`}
        >
          <FaThumbsUp />
          <span>{hasLiked ? "Liked" : "Like"}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center space-x-2 p-2 rounded-md hover:bg-gray-100"
        >
          <FaCommentAlt />
          <span>Comment</span>
        </button>
      </div>

   
      {showComments && (
        <div className="pt-2 border-t">
          
          <form onSubmit={handleComment} className="flex space-x-2 my-2">
            <FaUserCircle className="text-3xl text-gray-500" />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="p-2 rounded-full text-blue-600 hover:bg-blue-100"
              title="Post Comment"
            >
              <FaPaperPlane />
            </button>
          </form>

          <div className="mt-4 space-y-3">
            {currentPost.comments.length > 0 ? (
              currentPost.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">
                No comments yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

