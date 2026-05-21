import { Route, Routes, useLocation } from 'react-router'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Admin from './pages/Admin'
import CategoryFilter from './pages/CategoryFilter'
import Home from './pages/Home'
import PriceFilter from './pages/PriceFilter'
import ProductSort from './pages/ProductSort'

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

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
  )
}

export default App
