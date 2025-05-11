import React, { useState } from 'react';
import himalayan from '../assets/images/himalayan.jpg';
import product from '../assets/images/products.jpg';
import rides from '../assets/images/intercity_rides.jpg';
import delivery_services from '../assets/images/delivery_services.jpg'
import { useRedirect } from "./Common";

function Hero(params) {
  const redirect = useRedirect();
    const [location, setLocation] = useState('Shimla');
    return  <section className="pt-20 relative">
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C5530]/90 to-transparent z-10"></div>
      <img 
        src={himalayan} 
        alt="Himalayan Landscape" 
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      
      <div className="container mx-auto px-4 h-full relative z-20">
        <div className="flex flex-col justify-center h-full max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connecting the Himalayas</h1>
          <p className="text-xl mb-8">
            <span className="font-bold">S</span>ustainable{" "}
            <span className="font-bold">I</span>nitiative for{" "}
            <span className="font-bold">M</span>arketplace,{" "}
            <span className="font-bold">D</span>elivery, and{" "}
            <span className="font-bold">I</span>ntercity Transport
          </p>
          <p className="text-lg mb-8">Empowering local communities of <span className="font-bold">Uttrakhand</span> and <span className="font-bold">Himachal</span> through sustainable commerce and transportation solutions in the Himalayan region.</p>
          
          {/* <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Your location"
                className="py-3 pl-10 pr-4 w-64 rounded-l-full bg-white/90 border-none text-gray-800 text-sm focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C5530] text-sm"></i>
            </div>
            <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-3 px-6 rounded-r-full text-sm font-medium transition-colors">
              Explore Services
            </button>
          </div> */}
        </div>
      </div>
    </div>

    {/* Service Cards */}
    <div className="container mx-auto px-4 -mt-20 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
          <div className="h-40 overflow-hidden">
            <img 
              src={product}
              alt="Local Products" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#2C5530]/10 flex items-center justify-center mr-3">
                <i className="fas fa-store text-[#2C5530]"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Local Products</h3>
            </div>
            <p className="text-gray-600 mb-4">Discover authentic Himalayan products from local artisans and farmers.</p>
            <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"onClick={()=>{
                      redirect('products')
                    }}>
              Shop Now
            </button>
          </div>
        </div>

        {/* Rides Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
          <div className="h-40 overflow-hidden">
            <img 
              src={rides}
              alt="Intercity Rides" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#4A90A0]/10 flex items-center justify-center mr-3">
                <i className="fas fa-car text-[#4A90A0]"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Intercity Rides</h3>
            </div>
            <p className="text-gray-600 mb-4">Safe, reliable transportation between Himalayan towns and cities.</p>
            <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors" onClick={()=>{
                      redirect('rides')
                    }}>
              Book a Ride
            </button>
          </div>
        </div>

        {/* Delivery Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2">
          <div className="h-40 overflow-hidden">
            <img 
              src={delivery_services} 
              alt="Delivery Services" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center mr-3">
                <i className="fas fa-box text-[#8B5E3C]"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Delivery Services</h3>
            </div>
            <p className="text-gray-600 mb-4">Fast and efficient delivery of goods across the Himalayan region.</p>
            <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors" onClick={()=>{
                      redirect('rides')
                    }}>
              Send Package
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Hero;