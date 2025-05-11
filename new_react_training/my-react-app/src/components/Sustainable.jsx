export default function Sustainable(params) {
  return <section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Sustainability Impact</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">Making a positive difference in the Himalayan region through sustainable practices</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Carbon Reduction */}
      <div className="bg-white rounded-xl p-8 shadow-md text-center">
        <div className="w-20 h-20 rounded-full bg-[#2C5530]/10 flex items-center justify-center mb-6 mx-auto">
          <i className="fas fa-leaf text-3xl text-[#2C5530]"></i>
        </div>
        <h3 className="text-4xl font-bold text-[#2C5530] mb-2">24%</h3>
        <p className="text-gray-800 font-medium mb-2">Carbon Footprint Reduction</p>
        <p className="text-gray-600">Through ride-sharing and optimized delivery routes</p>
      </div>

      {/* Local Artisans */}
      <div className="bg-white rounded-xl p-8 shadow-md text-center">
        <div className="w-20 h-20 rounded-full bg-[#4A90A0]/10 flex items-center justify-center mb-6 mx-auto">
          <i className="fas fa-hands-helping text-3xl text-[#4A90A0]"></i>
        </div>
        <h3 className="text-4xl font-bold text-[#4A90A0] mb-2">150+</h3>
        <p className="text-gray-800 font-medium mb-2">Local Artisans Supported</p>
        <p className="text-gray-600">Providing sustainable income to Himalayan communities</p>
      </div>

      {/* Plastic Reduction */}
      <div className="bg-white rounded-xl p-8 shadow-md text-center">
        <div className="w-20 h-20 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center mb-6 mx-auto">
          <i className="fas fa-recycle text-3xl text-[#8B5E3C]"></i>
        </div>
        <h3 className="text-4xl font-bold text-[#8B5E3C] mb-2">1.2 tons</h3>
        <p className="text-gray-800 font-medium mb-2">Plastic Waste Reduced</p>
        <p className="text-gray-600">Through eco-friendly packaging and practices</p>
      </div>
    </div>

    <div className="mt-16 text-center">
      <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-3 px-8 rounded-full text-sm font-medium transition-colors">
        Learn More About Our Impact
      </button>
    </div>
  </div>
</section>   
}