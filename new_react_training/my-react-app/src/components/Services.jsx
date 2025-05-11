// import  { useNavigate } from 'react-router-dom';
import { useRedirect } from "./Common";

export default function Services(params) {
  console.log(params);
  const redirect = useRedirect();
    return <section className="py-20 bg-[#F5F7F6]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Connecting communities across the Himalayas with sustainable solutions for commerce, transportation, and delivery.</p>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Products Service */}
                <div className="bg-white rounded-xl p-8 shadow-md transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#2C5530]/10 flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-leaf text-2xl text-[#2C5530]"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Local Products Marketplace</h3>
                  <p className="text-gray-600 text-center mb-10 h-12">Connect with local artisans, farmers, and businesses to discover authentic Himalayan products.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#2C5530] mt-1 mr-3"></i>
                      <span className="text-gray-600">Handcrafted local goods</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#2C5530] mt-1 mr-3"></i>
                      <span className="text-gray-600">Organic produce and herbs</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#2C5530] mt-1 mr-3"></i>
                      <span className="text-gray-600">Traditional Himalayan specialties</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors" 
                    onClick={()=>{
                      redirect('products')
                    }}>
                      Explore Marketplace
                    </button>
                  </div>
                </div>
    
                {/* Rides Service */}
               
                <div className="bg-white rounded-xl p-8 shadow-md transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#4A90A0]/10 flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-route text-2xl text-[#4A90A0]"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Intercity Rides</h3>
                  <p className="text-gray-600 text-center mb-10 h-12">Safe and comfortable transportation between cities and towns across the Himalayan region.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#4A90A0] mt-1 mr-3"></i>
                      <span className="text-gray-600">Shared and private rides</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#4A90A0] mt-1 mr-3"></i>
                      <span className="text-gray-600">Experienced mountain drivers</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#4A90A0] mt-1 mr-3"></i>
                      <span className="text-gray-600">Flexible scheduling options</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors" onClick={()=>{
                      
                      redirect('rides')
                    }}>
                      Book Your Ride
                    </button>
                  </div>
                </div>
    
                {/* Delivery Service */}
                <div className="bg-white rounded-xl p-8 shadow-md transition-transform hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center mb-6 mx-auto">
                    <i className="fas fa-truck text-2xl text-[#8B5E3C]"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">Delivery Services</h3>
                  <p className="text-gray-600 text-center mb-10 h-12">Reliable package delivery and courier services throughout the Himalayan region.</p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#8B5E3C] mt-1 mr-3"></i>
                      <span className="text-gray-600">Same-day local delivery</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#8B5E3C] mt-1 mr-3"></i>
                      <span className="text-gray-600">Intercity package transport</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-[#8B5E3C] mt-1 mr-3"></i>
                      <span className="text-gray-600">Real-time tracking</span>
                    </li>
                  </ul>
                  <div className="text-center">
                    <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white py-2 px-6 rounded-full text-sm font-medium transition-colors" onClick={()=>{
                      redirect('rides')
                    }}>
                      Send a Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
}