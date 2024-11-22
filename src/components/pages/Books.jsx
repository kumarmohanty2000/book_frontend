import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Books() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-600 text-white p-6">
      <Link to='/home' className="block px-4 py-2 rounded hover:bg-blue-700"><h2 className="text-2xl font-bold mb-6" >BookApp</h2></Link>
        <nav className="space-y-4">
          <Link
            to="/profile"
            className="block px-4 py-2 rounded hover:bg-blue-700"
          >
            Profile
          </Link>
          <Link
            to="/books"
            className="block px-4 py-2 rounded hover:bg-blue-700"
          >
            Books
          </Link>
          <Link
            to="/addbooks"
            className="block px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Books
          </Link>

          <button
            onClick={()=>{localStorage.removeItem('token');
              navigate('/login');
            }}
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </nav>
      </aside>
      <div className=" bg-gradient-to-b from-blue-200 to-green-200 flex-1 pt-6 md:p-8 text-center md:text-left space-y-4">
        <h1 className="text-lg font-medium">Books</h1>
      </div>
    </div>
  );
}
