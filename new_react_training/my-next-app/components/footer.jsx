import { useRouter } from 'next/router';  // ✅ Import useRouter


function Footer(){
    const router = useRouter(); // ✅ Use the useRouter hook
  
  const redirect = (path) => {
    router.push(`/${path}`); // ✅ Redirect to the specified path
  };
    return  <footer className="bg-[#2C5530] text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Company Info */}
        <div>
          <div className="text-2xl font-bold mb-6 flex items-center">
            <i className="fas fa-mountain mr-2"></i>
            <span>SIMDI</span>
          </div>
          <p className="text-gray-300 mb-4">
            Sustainable Initiative for Marketplace, Delivery, and Intercity Transport
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/Yoursimdi" target='_blank' className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-facebook-f"></i>
            </a>
            {/* <a href="#" className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-twitter"></i>
            </a> */}
            <a href="https://www.instagram.com/yoursimdi/" target='_blank' className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-instagram"></i>
            </a>
            {/* <a href="#" className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-linkedin-in"></i>
            </a> */}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Services</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer" onClick={() => redirect('products')}>Local Marketplace</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer" onClick={() => redirect('rides')}>Intercity Rides</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer" onClick={() => redirect('rides')}>Package Delivery</a></li>
            {/* <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Business Solutions</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Sustainability Programs</a></li> */}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Company</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer"  onClick={() => redirect('about')}>About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer" onClick={() => redirect('mission')}>Our Mission</a></li>
            {/* <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Careers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Press</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Contact Us</a></li> */}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                  <span>Pabou, Uttarakhand, India</span>
                </li>
                {/* <li className="flex items-start">
                  <i className="fas fa-phone mt-1 mr-2"></i>
                  <span>+91 98765 43210</span>
                </li> */}
                <li className="flex items-start">
                  <i className="fas fa-envelope mt-1 mr-2"></i>
                  <span>team@simdi.in</span>
                </li>
              </ul>
            </div>
      </div>

      <div className="border-t border-[#3d6b42] pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; 2025 SIMDI. All rights reserved.
          </div>
          {/* <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm cursor-pointer">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm cursor-pointer">Cookie Policy</a>
            <div className="flex items-center space-x-3">
              <i className="fab fa-cc-visa text-xl"></i>
              <i className="fab fa-cc-mastercard text-xl"></i>
              <i className="fab fa-cc-paypal text-xl"></i>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </footer>
}

export default Footer;