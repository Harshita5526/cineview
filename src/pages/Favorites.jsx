import React from "react";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";
export default function Favorites() {
  const navigate = useNavigate();

const {
  favorites,
  removeFavorite,
} = useFavorites();

  return (
    <div className="min-h-screen bg-[#020817] p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="rounded-[28px] border border-slate-800 bg-[#030b22] px-8 py-10 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-orange-400 font-medium mb-3">
              My Collection
            </p>

            <h1 className="text-5xl font-bold text-white mb-3">
              Your Favorites
            </h1>

            <p className="text-slate-400 text-lg">
              A cinematic shelf of the movies you love.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-600 transition text-black font-medium px-8 py-3 rounded-full"
          >
            Discover More
          </button>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="rounded-[28px] border border-slate-800 bg-[#030b22] min-h-[260px] flex flex-col items-center justify-center text-center px-6 mt-8">
            <h3 className="text-white text-2xl font-semibold mb-3">
              Your list is empty.
            </h3>

            <p className="text-slate-500 max-w-lg mb-8">
              Browse trailers and add movies to Favorites so they are easy to revisit.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 hover:bg-orange-600 transition text-black font-medium px-8 py-3 rounded-full"
            >
              Explore Movies
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                onClick={() =>
                  navigate(`/movie/${movie.id}`)
                }
                className="cursor-pointer bg-[#07152f] border border-slate-800 rounded-[28px] overflow-hidden"
              >
                <div className="relative h-[420px]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    <Star
                      size={12}
                      fill="gold"
                    />
                    {movie.vote_average?.toFixed(1)}
                  </div>
             <button
  onClick={(e) => {
    e.stopPropagation();
    removeFavorite(movie.id);
  }}
  className="absolute top-4 right-4 bg-red-500 p-3 rounded-full"
>
  <Heart
    size={16}
    fill="white"
  />
</button>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {movie.release_date?.split("-")[0]}
                  </p>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {movie.overview?.slice(0, 120)}
                    ...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}