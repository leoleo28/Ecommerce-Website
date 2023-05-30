import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/cart"
          element={currentUser ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorite"
          element={currentUser ? <Favorite /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/success"
          element={currentUser ? <Success /> : <Navigate to="/" />}
        />
        <Route
          path="/cancel"
          element={currentUser ? <Cancel /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
