import React, { useEffect, useState } from "react";
import { Play, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../config/axiosInstance";
import useFavorites from "../hooks/useFavorites";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const {
    currentUser,
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get(
          "/trending/movie/week"
        );

        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  const heroMovie = movies[0];

  if (!heroMovie) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#020817] min-h-screen text-white">
      <div className="max-w-[1500px] mx-auto px-8 py-10">

        {/* HERO SECTION */}
        <section
          className="relative h-[600px] rounded-[30px] overflow-hidden"
          style={{
            backgroundImage: `url(
              https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}
            )`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>

          <div className="absolute left-12 bottom-16 max-w-2xl">
            <span className="bg-orange-500/20 px-5 py-2 rounded-full text-orange-400 text-sm">
              FEATURED
            </span>

            <h1 className="text-6xl font-black mt-5">
              {heroMovie.title}
            </h1>

            <div className="flex items-center gap-5 mt-5">
              <span>
                {heroMovie.release_date}
              </span>

              <span className="flex items-center gap-1 text-yellow-400">
                <Star
                  size={16}
                  fill="currentColor"
                />
                {heroMovie.vote_average?.toFixed(1)}
              </span>
            </div>

            <p className="text-gray-300 mt-6 text-lg">
              {heroMovie.overview}
            </p>

            <div className="flex gap-4 mt-8">
              <button className="bg-orange-500 px-8 py-4 rounded-full flex items-center gap-2 font-semibold">
                <Play size={18} />
                Watch Trailer
              </button>

              <button className="bg-white/10 px-8 py-4 rounded-full">
                Sign In To Save
              </button>
            </div>
          </div>
        </section>

        {/* TRENDING */}
        <section className="mt-16">
          <h2 className="text-4xl font-bold">
            Trending This Week
          </h2>

          <p className="text-gray-400 mt-2">
            Browse the movies people are watching around the globe.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {movies.map((movie) => (
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
                    className="w-full h-full object-cover"
                    alt={movie.title}
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
    toggleFavorite(movie);
  }}
  className="absolute top-4 right-4 bg-black/70 p-3 rounded-full"
>

  <Heart
  size={16}
  fill={isFavorite(movie.id) ? "red" : "none"}
  color={isFavorite(movie.id) ? "red" : "white"}
/>
</button>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold">
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {
                      movie.release_date?.split(
                        "-"
                      )[0]
                    }
                  </p>

                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {movie.overview?.slice(
                      0,
                      100
                    )}
                    ...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}