import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components//Home";
import AppBar from "./components/AppBar";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Register from "./components/Register";
import Sectors from "./components/Sectors";
import User from "./components/User";

const App = () => {
  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
