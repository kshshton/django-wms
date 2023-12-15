export const ApiManager = {
  url: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};
