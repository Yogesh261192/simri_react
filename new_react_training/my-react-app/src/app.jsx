import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/footer';
import Products from './components/products';
import Services from './components/Services';
import Rides from './components/Rides';
import Sustainable from './components/Sustainable';
import ScrollToTop from './components/ScrollToTop';
import AllProducts from './components/AllProduct';


function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Products />
      <Footer />
    </>
  );
}

function App() {
  return (
    
    <Router>
       <ScrollToTop />
      <div className="min-h-screen bg-white text-gray-800 font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/products" element={<AllProducts />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
