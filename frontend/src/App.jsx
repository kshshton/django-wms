import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.css'
import AppBar from "./components/semantic/AppBar.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import Sectors from "./components/Sectors.jsx";
import Orders from "./components/Orders.jsx";
import User from "./components/user/User.jsx";
import Login from "./components/user/Login.jsx";
import Register from "./components/user/Register.jsx";

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
}

export default App
