import { Routes, Route, useLocation } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CategoryFilter from "./pages/CategoryFilter";
import PriceFilter from "./pages/PriceFilter";
import ProductSort from "./pages/ProductSort";
import Admin from "./pages/Admin";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-white text-[#333]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category-filter" element={<CategoryFilter />} />
        <Route path="/price-filter" element={<PriceFilter />} />
        <Route path="/sort" element={<ProductSort />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;