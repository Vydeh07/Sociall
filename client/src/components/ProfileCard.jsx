import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileCard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 h-16"></div>
      
      <div className="p-4 text-center relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <FaUserCircle className="text-gray-300 bg-white rounded-full" size={70} />
        </div>
        
        <div className="mt-10">
          <Link
            to={`/profile/${user.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline"
          >
            Welcome, {user.name}!
          </Link>
          <p className="text-sm text-gray-500 mt-1">
          </p>
        </div>
      </div>
      
      <hr />
      
      <Link 
        to={`/profile/${user.id}`} 
        className="block p-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-50"
      >
        View My Profile
      </Link>
    </div>
  );
}

