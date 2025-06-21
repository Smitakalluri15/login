// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    alert("🚫 Please log in to access this page.");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default PrivateRoute;
