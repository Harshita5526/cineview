import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Favorites from "../pages/Favorites";
import MovieDetails from "../pages/MovieDetail";
import Public from "./Public";
import Protected from "./Protected";
import MovieDetail from "../pages/MovieDetail";

const router = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path:"/movie/:id",
        element:<MovieDetail/>
      }
    ],
  },

  {
    element: <Protected />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/favorite",
        element: <Favorites />,
      },
    ],
  },
]);

function AppRoute() {
  return <RouterProvider router={router} />;
}

export default AppRoute;