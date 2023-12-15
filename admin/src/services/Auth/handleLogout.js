import { useNavigate } from "react-router-dom";
import { ApiManager } from "../ApiManager";

export const handleLogout = async () => {
  const navigateTo = useNavigate();

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
