import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import './App.css'
import AppBar from "./components/AppBar.jsx";
import Home from "./components/pages/Home.jsx";
import Products from "./components/pages/Products.jsx";
import Sectors from "./components/pages/Sectors.jsx";
import Orders from "./components/pages/Orders.jsx";
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
