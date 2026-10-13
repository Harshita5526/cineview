import React, { useEffect, useState } from "react";
import { Play, Heart, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/axiosInstance";
import useFavorites from "../hooks/useFavorites";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
const {
    currentUser,
  favorites,
  isFavorite,
  toggleFavorite,
} = useFavorites();
  const [movie, setMovie] = useState(null);
const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await api.get(
          `/movie/${id}`
        );

        setMovie(movieResponse.data);

        const similarResponse = await api.get(
          `/movie/${id}/similar`
        );

        setSimilarMovies(
          similarResponse.data.results
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieData();
}, [id]);
  if (!movie) {
    return (
      <div className="min-h-screen bg-[#020817] flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#020817] min-h-screen text-white">
      <div className="max-w-[1500px] mx-auto px-8 py-10">

        {/* TOP SECTION */}
        <div className="border border-slate-800 rounded-[30px] p-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT IMAGE */}
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full max-w-[500px] rounded-[30px]"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>

              <h1 className="text-5xl font-bold">
                {movie.title}
              </h1>

              <div className="flex items-center gap-5 mt-4 text-gray-300">
                <span>{movie.release_date}</span>

                <span>
                  {movie.runtime} min
                </span>

                <span>
                  Rating:
                  {" "}
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>

              <p className="mt-5 text-lg text-gray-300">
                {movie.tagline}
              </p>

              {/* INFO BOXES */}
              <div className="grid md:grid-cols-2 gap-5 mt-8">

                <div className="bg-[#07152f] rounded-3xl p-6">
                  <p className="text-gray-400">
                    Release date
                  </p>

                  <h3 className="text-2xl font-bold mt-3">
                    {movie.release_date}
                  </h3>
                </div>

                <div className="bg-[#07152f] rounded-3xl p-6">
                  <p className="text-gray-400">
                    Runtime
                  </p>

                  <h3 className="text-2xl font-bold mt-3">
                    {movie.runtime} min
                  </h3>
                </div>

              </div>

              {/* GENRES */}
              <div className="flex gap-3 flex-wrap mt-8">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* OVERVIEW */}
              <div className="bg-[#07152f] rounded-3xl p-6 mt-8">
                <p className="leading-8 text-gray-300">
                  {movie.overview}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-8">

                <button className="bg-orange-500 px-8 py-4 rounded-full flex items-center gap-2 font-semibold text-black">
                  <Play size={18} />
                  Play Trailer
                </button>

                {
  currentUser ? (
    <button
      onClick={() => toggleFavorite(movie)}
      className="bg-white/10 px-8 py-4 rounded-full flex items-center gap-2"
    >
      <Heart
        size={18}
        fill={isFavorite(movie.id) ? "red" : "none"}
      />

      {isFavorite(movie.id)
        ? "Remove Favorite"
        : "Add To Favorite"}
    </button>
  ) : (
    <button
      onClick={() => navigate("/login")}
      className="bg-white/10 px-8 py-4 rounded-full"
    >
      Sign In
    </button>
  )
}

              </div>

            </div>

          </div>
        </div>

        {/* SIMILAR MOVIES */}
        <section className="mt-16">

          <h2 className="text-4xl font-bold">
            Similar movies
          </h2>

          <p className="text-gray-400 mt-2">
            Explore recommendations that match this title.
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            {similarMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() =>
                  navigate(`/movie/${movie.id}`)
                }
                className="cursor-pointer bg-[#07152f] border border-slate-800 rounded-[28px] overflow-hidden transition-all duration-300 hover:scale-105 hover:border-orange-500"
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
    fill={
      isFavorite(movie.id)
        ? "red"
        : "none"
            }
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
                      120
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