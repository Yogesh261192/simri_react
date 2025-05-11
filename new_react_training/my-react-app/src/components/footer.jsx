function Footer(){
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
            <a href="#" className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300 cursor-pointer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Services</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Local Marketplace</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Intercity Rides</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Package Delivery</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Business Solutions</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Sustainability Programs</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Company</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Our Mission</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Careers</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Press</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white cursor-pointer">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
          <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates and offers</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="py-2 px-4 w-full rounded-l-full bg-[#1a3a1f] border-none text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90A0]"
            />
            <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-2 px-4 rounded-r-full text-sm">
              Subscribe
            </button>
          </div>
          <div className="mt-6">
            <h5 className="text-sm font-semibold mb-3">Download Our App</h5>
            <div className="flex space-x-3">
              <a href="#" className="bg-black/80 hover:bg-black text-white py-2 px-4 rounded-lg flex items-center space-x-2 cursor-pointer">
                <i className="fab fa-apple text-xl"></i>
                <div className="text-xs">
                  <div>Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="bg-black/80 hover:bg-black text-white py-2 px-4 rounded-lg flex items-center space-x-2 cursor-pointer">
                <i className="fab fa-google-play text-xl"></i>
                <div className="text-xs">
                  <div>Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#3d6b42] pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; 2025 SIMDI. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm cursor-pointer">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm cursor-pointer">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm cursor-pointer">Cookie Policy</a>
            <div className="flex items-center space-x-3">
              <i className="fab fa-cc-visa text-xl"></i>
              <i className="fab fa-cc-mastercard text-xl"></i>
              <i className="fab fa-cc-paypal text-xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
}

export default Footer;