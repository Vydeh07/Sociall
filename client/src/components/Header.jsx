import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto max-w-5xl px-4 py-3 flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-2">
          
          <span className="text-xl font-bold text-gray-800 hidden sm:block">
            Social Media Clone
          </span>
        </Link>
        
        
        <div>
          {user ? (
           
            <div className="flex items-center space-x-4">
              <Link
                to={`/profile/${user.id}`}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              >
                <FaUserCircle className="text-2xl" />
                <span className="font-semibold hidden sm:block">
                  {user.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                title="Log Out"
              >
                <IoMdLogOut className="text-2xl" />
                <span className="font-semibold text-sm hidden sm:block">Log Out</span>
              </button>
            </div>
          ) : (
           
            <div className="space-x-2">
              <Link
                to="/login"
                className="text-gray-600 font-medium px-4 py-2 rounded-md hover:text-blue-600 hover:bg-gray-100"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-700"
              E
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

