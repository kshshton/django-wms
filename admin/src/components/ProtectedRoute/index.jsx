import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({
  element,
  isAuthenticated,
  fallbackPath = "/login",
}) => {
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to={fallbackPath} replace />
  );
};

export default ProtectedRoute;
