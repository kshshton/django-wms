export const ApiManager = {
  url: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};
