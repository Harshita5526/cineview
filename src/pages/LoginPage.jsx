import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
const navigate = useNavigate();
const { register,handleSubmit,formState: { errors }} = useForm();
const onSubmit = (data) => {
const users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find((u) =>
    u.email === data.email &&
    u.password === data.password);
  if (user) {
  localStorage.setItem(
    "currentUser",
    JSON.stringify(user));
  alert(`Welcome ${user.name}!`);
  navigate("/");
  } else {
  alert("Invalid Email or Password!");}
  };

return ( <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-8 py-10"> <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-24 items-center">


    {/* LEFT SIDE */}
    <div>
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1a1020] border border-orange-500/20">
        <span className="text-orange-400 text-xs tracking-[4px] uppercase">
          Cineview
        </span>
      </div>

      <h1 className="mt-8 text-6xl font-black leading-tight">
        Welcome Back
        <br />
        Movie Lover
      </h1>

      <p className="mt-6 text-xl text-gray-300 max-w-xl leading-relaxed">
        Sign in to access your watchlist, favorites,
        ratings and personalized movie recommendations.
      </p>

      <div className="mt-10 space-y-8">
        <div className="flex gap-4">
          <div className="text-3xl">🎥</div>
          <div>
            <h3 className="font-semibold text-lg">
              Your Watchlist
            </h3>
            <p className="text-gray-400">
              Continue watching your favorite movies.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-3xl">❤️</div>
          <div>
            <h3 className="font-semibold text-lg">
              Saved Favorites
            </h3>
            <p className="text-gray-400">
              Access all your saved movies instantly.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-3xl">⭐</div>
          <div>
            <h3 className="font-semibold text-lg">
              Personalized Experience
            </h3>
            <p className="text-gray-400">
              Get recommendations tailored to your taste.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-[36px] border border-slate-800 bg-[#040b24]/95 backdrop-blur-xl p-8">

        <p className="text-center text-orange-400 tracking-[6px] text-xs uppercase">
          Welcome Back
        </p>

        <h2 className="text-center text-5xl font-bold mt-4">
          Sign In
        </h2>

        <p className="text-center text-gray-400 mt-4">
          Access your personalized cinema experience
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10"
        >
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">
              Email Address
            </label>

            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="arshi@gmail.com"
              className="mt-2 w-full rounded-2xl bg-[#1b2746] px-5 py-4 outline-none border border-transparent focus:border-orange-500"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mt-6">
            <label className="text-sm text-gray-300">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl bg-[#1b2746] px-5 py-4 outline-none border border-transparent focus:border-orange-500"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full mt-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-semibold text-black shadow-lg shadow-orange-500/20 hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-slate-800"></div>

          <span className="px-4 text-sm text-gray-400">
            New to Cineview?
          </span>

          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        <Link to="/signup">
          <button
            className="w-full py-4 rounded-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition"
          >
            Create Account
          </button>
        </Link>

      </div>
    </div>

  </div>
</div>


);
}

