import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Logout from "./Logout";
import Home from "./components//Home";
import AppBar from "./components/AppBar";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Products from "./components/Products";
import QR from "./components/QR";
import Sectors from "./components/Sectors";
import User from "./components/User";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token === "undefined") token = false;
    setAuthenticated(!!token);
  }, []);

  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user" element={<User />} />
          <Route path="/products/:id/qr" element={<QR />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
