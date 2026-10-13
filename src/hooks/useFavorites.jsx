import { useState } from "react";

export default function useFavorites() {
  const [refresh, setRefresh] = useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  const isFavorite = (id) => {
    return favorites.some(
      (movie) => movie.id === id
    );
  };

  const toggleFavorite = (movie) => {
    if (!currentUser) return false;

    let updatedFavorites = [...favorites];

    const exists = updatedFavorites.find(
      (item) => item.id === movie.id
    );

    if (exists) {
      updatedFavorites = updatedFavorites.filter(
        (item) => item.id !== movie.id
      );
    } else {
      updatedFavorites.push(movie);
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    setRefresh(!refresh);

    return true;
  };
  const removeFavorite = (id) => {
  let updatedFavorites = favorites.filter(
    (movie) => movie.id !== id
  );

  localStorage.setItem(
    "favorites",
    JSON.stringify(updatedFavorites)
  );

  setRefresh(!refresh);
};

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    currentUser,
    refresh,
    removeFavorite,
  };
}