import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
 const navigate = useNavigate();
 const isAuthenticated = !!localStorage.getItem("currentUser");
 const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);
  return (
    <nav className="w-full bg-[#020B2D] border-b border-[#1b2448]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 rounded-full px-3 py-2">
              <div className="w-8 h-8 bg-[#2b1c15] rounded-full flex items-center justify-center text-white font-bold text-sm">
                CV
              </div>
              <span
         onClick={() => navigate("/")}
              className="ml-3 text-white font-bold tracking-wider text-lg">
                CINEVIEW
              </span>
            </div>
          </div>

          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#"
              className="text-white text-sm font-medium hover:text-orange-400 transition"
                    onClick={() => navigate("/")}
           >
              Home
            </a>

            <a
              href="#"
              className="text-gray-300 text-sm font-medium hover:text-orange-400 transition"
           onClick={() => { if (isAuthenticated) {navigate("/favorite"); }}}
           >
              Favorites
            </a>

            <a
              href="#"
              className="text-gray-300 text-sm font-medium hover:text-orange-400 transition"
                    onClick={() =>  isAuthenticated? navigate("/profile"): navigate("/login")}
            >
              Profile
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            
            {/* Search */}
            <button className="w-10 h-10 rounded-full border border-[#2b355f] flex items-center justify-center text-white hover:bg-[#101a44] transition">
              🔍
            </button>

          {
  currentUser ? (
    <div
      onClick={() => navigate("/profile")}
      className="flex items-center gap-2 bg-[#0b163d] px-3 py-2 rounded-full cursor-pointer"
    >
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
        {currentUser.name?.charAt(0).toUpperCase()}
      </div>

      <span className="text-white text-sm">
        {currentUser.name}
      </span>
    </div>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="px-5 py-2 rounded-full border border-orange-500 text-white text-sm hover:bg-orange-500/10 transition"
    >
      Sign In
    </button>
  )
}

            {/* Get Started */}
            <button
            onClick={() => { if (isAuthenticated) { navigate("/profile"); }}}
             className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium hover:opacity-90 transition">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;