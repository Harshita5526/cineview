import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
   
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.email === data.email
    );
    if (existingUser) {
      alert("Email already registered!");
      return;
    }
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account Created Successfully!");
    console.log("Saved User:", data);
    reset();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-8 py-10">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-24 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1a1020] border border-orange-500/20">
            <span className="text-orange-400 text-xs tracking-[4px] uppercase">
              Cineview
            </span>
          </div>

          <h1 className="mt-8 text-6xl font-black leading-tight">
            Join the Cinema
            <br />
            Community
          </h1>

          <p className="mt-6 text-xl text-gray-300 max-w-xl leading-relaxed">
            Create an account and unlock a personalized movie
            experience like no other.
          </p>

          <div className="mt-10 space-y-8">
            <div className="flex gap-4">
              <div className="text-3xl">⭐</div>

              <div>
                <h3 className="font-semibold text-lg">
                  Personalized Recommendations
                </h3>

                <p className="text-gray-400">
                  Get movie suggestions based on your favorites.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🎬</div>

              <div>
                <h3 className="font-semibold text-lg">
                  Sync Across Devices
                </h3>

                <p className="text-gray-400">
                  Access your watchlist from anywhere.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🎁</div>

              <div>
                <h3 className="font-semibold text-lg">
                  Exclusive Features
                </h3>

                <p className="text-gray-400">
                  Enjoy advanced filters and collections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-[36px] border border-slate-800 bg-[#040b24]/95 backdrop-blur-xl p-8">
            
            <p className="text-center text-orange-400 tracking-[6px] text-xs uppercase">
              Get Started
            </p>

            <h2 className="text-center text-5xl font-bold mt-4">
              Create Account
            </h2>

            <p className="text-center text-gray-400 mt-4">
              Join thousands of movie enthusiasts
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10"
            >
              {/* NAME */}
              <div>
                <label className="text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  placeholder="Your Name"
                  className="mt-2 w-full rounded-2xl bg-[#1b2746] px-5 py-4 outline-none border border-transparent focus:border-orange-500"
                />

                {errors.name && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="mt-6">
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
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
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

              {/* SUBMIT BUTTON */}
             <button
             type="submit"
            className="w-full mt-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-semibold text-black shadow-lg shadow-orange-500/20 hover:opacity-90"
           >Create Account</button>
            </form>

            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-slate-800"></div>

              <span className="px-4 text-sm text-gray-400">
                Already a member?
              </span>

              <div className="flex-1 h-px bg-slate-800"></div>
            </div>

            <button
            onClick={() => navigate("/login")}
            className="w-full py-4 rounded-full border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white transition">
              Sign In
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}