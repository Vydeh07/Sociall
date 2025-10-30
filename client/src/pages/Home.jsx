import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data); 
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts", err);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
   
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  
  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  
  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <aside className="md:col-span-1 h-fit md:sticky top-20">
        <ProfileCard />
      </aside>

      
      <main className="md:col-span-2 space-y-6">
        
        <CreatePost onPostCreated={handlePostCreated} />

        
        {loading ? (
          <div className="text-center text-gray-500">Loading feed...</div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={handlePostUpdated}
            />
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
            <p className="font-semibold">No posts yet!</p>
            <p>Be the first to share something with your network.</p>
          </div>
        )}
      </main>
    </div>
  );
}

