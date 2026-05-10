import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CategoryFilter from "./pages/CategoryFilter";
import PriceFilter from "./pages/PriceFilter";
import ProductSort from "./pages/ProductSort";

function App() {
  return (
    <div className="min-h-screen bg-white text-[#333]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category-filter" element={<CategoryFilter />} />
        <Route path="/price-filter" element={<PriceFilter />} />
        <Route path="/sort" element={<ProductSort />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;