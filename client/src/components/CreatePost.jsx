import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import { FaUserCircle } from "react-icons/fa";


export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const { user } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return; 

    try {
      const res = await api.post("/posts", { content });
      
      onPostCreated(res.data);
      setContent(""); 
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Error: Could not create post.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex space-x-3">
        <FaUserCircle className="text-4xl text-gray-500" />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder={`What's on your mind, ${user?.name}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!content.trim()} 
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

