import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiManager } from "../services/ApiManager";

const Logout = () => {
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ApiManager.url}/auth/refresh_token`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      });

      if (!response.ok) {
        console.error("Logout failed");
        return;
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      navigateTo("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <h2>Are you sure?</h2>
      <button
        style={{ backgroundColor: "#1976d2", color: "#fff" }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
