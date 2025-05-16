import Image from 'next/image'; 
import Header from '../components/Header'; 
import ScrollToTop from '../components/ScrollToTop';
import Hero from '../components/Hero';
import Footer from '../components/footer';
import Products from '../components/products';
import Services from '../components/Services';
// import Rides from './Rides';
// import AllProducts from '../components/AllProduct';
// import EmailVerificationPage from './emailverification';


export default function List() {
  return (
    <>
    
      <ScrollToTop />
      <div className="min-h-screen bg-white text-gray-800 font-sans">
       <Header />
      <Hero />
      <Services />
      <Products />
      <Footer />
        {/* You can add other components here like Hero, Services, Products, Footer */}
      </div>
    </>
  );
}
