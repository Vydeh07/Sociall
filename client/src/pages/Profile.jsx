import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import Post from "../components/Post"; 

export default function Profile() {
  const { id } = useParams(); 
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePosts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/posts/user/${id}`);
        setPosts(res.data);
        
        if (res.data.length > 0) {
          setUserName(res.data[0].user.name);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile posts", err);
        setLoading(false);
      }
    };

    fetchProfilePosts();
  }, [id]); 

  
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

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {userName || "User Profile"}
        </h1>
        <p className="text-lg text-gray-600">
          All posts from {userName || "this user"}
        </p>
      </div>

      
      <div className="space-y-6">
        {posts.length > 0 ? (
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
            <p>This user hasn't posted anything yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

