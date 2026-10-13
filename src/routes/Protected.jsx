import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

const Protected = () => {
  const isAuthenticated =
    !!localStorage.getItem("currentUser");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Protected;