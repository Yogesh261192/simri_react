// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';

const ProductDetailPage= () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState('description');

  // Product data (would normally come from API/props)
  const product = {
    id: 1,
    name: 'Traditional Baklava',
    localName: 'Baklava / بقلاوة',
    price: '$12.99',
    rating: 4.8,
    reviewCount: 124,
    images: [
      {
        url: 'https://readdy.ai/api/search-image?query=Delicious%20traditional%20baklava%20dessert%20with%20honey%20and%20pistachios%20on%20elegant%20plate%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting%2C%20neutral%20background%20with%20subtle%20texture%2C%20appetizing%20close-up%20shot%20showing%20layered%20pastry%20details&width=600&height=400&seq=1&orientation=landscape',
        alt: 'Traditional Baklava'
      },
      {
        url: 'https://readdy.ai/api/search-image?query=Homemade%20baklava%20dessert%20with%20honey%20drizzle%20and%20crushed%20pistachios%2C%20overhead%20view%20on%20marble%20surface%2C%20soft%20natural%20lighting%20highlighting%20golden%20pastry%20layers%2C%20professional%20food%20styling%20with%20decorative%20elements&width=600&height=400&seq=2&orientation=landscape',
        alt: 'Baklava with honey drizzle'
      },
      {
        url: 'https://readdy.ai/api/search-image?query=Baklava%20pastry%20being%20prepared%20in%20traditional%20kitchen%2C%20hands%20working%20with%20phyllo%20dough%2C%20honey%20and%20nuts%20visible%2C%20authentic%20cooking%20process%2C%20warm%20lighting%20highlighting%20culinary%20craftsmanship%2C%20cultural%20heritage%20moment&width=600&height=400&seq=3&orientation=landscape',
        alt: 'Baklava preparation'
      }
    ],
    ingredients: [
      'Phyllo Dough (40%)',
      'Pistachios (25%)',
      'Honey (15%)',
      'Butter (10%)',
      'Sugar (8%)',
      'Cinnamon (1%)',
      'Cardamom (1%)'
    ],
    allergens: ['Nuts', 'Wheat', 'Dairy'],
    description: 'Baklava is a rich, sweet dessert pastry made of layers of filo filled with chopped nuts and sweetened with syrup or honey. It was one of the most popular sweet pastries of Ottoman cuisine and is sold in many Middle Eastern, Balkan and Asian countries.',
    history: 'The history of baklava is not well documented, but there is evidence that it has been around since ancient times. Many cultures claim baklava as their own, including the Greeks, Turks, and various Middle Eastern countries. The current form of baklava was probably developed in the imperial kitchens of the Topkapı Palace in Istanbul.',
    nutritionalFacts: {
      calories: 320,
      fat: '18g',
      carbs: '35g',
      protein: '5g',
      sugar: '22g'
    },
    storage: 'Store in an airtight container at room temperature for up to 1 week, or refrigerate for up to 2 weeks. Can be frozen for up to 3 months.',
    preparation: 'Serve at room temperature. For the best experience, warm slightly before serving to enhance the flavors and aromas of the spices and honey.'
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-gray-50 py-5">
      {/* Header */}
      

      <div className="container mx-auto px-4 py-6 mt-4 ">
        {/* Product Image Gallery */}
        <div className="mb-8 relative">
          <div className="relative h-[400px] rounded-lg overflow-hidden bg-white shadow-md">
            <img 
              src={product.images[currentImageIndex].url} 
              alt={product.images[currentImageIndex].alt}
              className="w-full h-full object-cover object-top"
            />
            
            {/* Image Navigation Arrows */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md cursor-pointer !rounded-button whitespace-nowrap"
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left text-gray-800"></i>
            </button>
            
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md cursor-pointer !rounded-button whitespace-nowrap"
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right text-gray-800"></i>
            </button>
          </div>
          
          {/* Image Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {product.images.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer !rounded-button whitespace-nowrap ${
                  currentImageIndex === index ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                aria-label={`View image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Product Title and Basic Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.localName}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-semibold text-indigo-700">{product.price}</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i}
                    className={`fas fa-star ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400' 
                        : i < product.rating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                    }`}
                  ></i>
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-shopping-cart mr-2"></i>
              Add to Cart
            </button>
            <button className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="far fa-heart mr-2"></i>
              Save
            </button>
            <button className="border border-gray-300 hover:border-gray-400 bg-white text-gray-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              <i className="fas fa-share-alt mr-2"></i>
              Share
            </button>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-4">
          {/* Description Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('description')}
              className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer !rounded-button whitespace-nowrap"
            >
              <h2 className="text-xl font-semibold text-gray-800">Description</h2>
              <i className={`fas ${expandedSection === 'description' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
            </button>
            
            {expandedSection === 'description' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>
                <h3 className="font-semibold text-gray-800 mt-4 mb-2">History & Cultural Significance</h3>
                <p className="text-gray-700 leading-relaxed">{product.history}</p>
              </div>
            )}
          </div>

          {/* Ingredients Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('ingredients')}
              className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer !rounded-button whitespace-nowrap"
            >
              <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
              <i className={`fas ${expandedSection === 'ingredients' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
            </button>
            
            {expandedSection === 'ingredients' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="mb-1">{ingredient}</li>
                  ))}
                </ul>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Allergens</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nutritional Facts */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('nutrition')}
              className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer !rounded-button whitespace-nowrap"
            >
              <h2 className="text-xl font-semibold text-gray-800">Nutritional Facts</h2>
              <i className={`fas ${expandedSection === 'nutrition' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
            </button>
            
            {expandedSection === 'nutrition' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="font-semibold text-gray-800">{product.nutritionalFacts.calories}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Fat</p>
                    <p className="font-semibold text-gray-800">{product.nutritionalFacts.fat}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-semibold text-gray-800">{product.nutritionalFacts.carbs}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-semibold text-gray-800">{product.nutritionalFacts.protein}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                    <p className="text-sm text-gray-500">Sugar</p>
                    <p className="font-semibold text-gray-800">{product.nutritionalFacts.sugar}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Storage & Preparation */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button 
              onClick={() => toggleSection('storage')}
              className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer !rounded-button whitespace-nowrap"
            >
              <h2 className="text-xl font-semibold text-gray-800">Storage & Preparation</h2>
              <i className={`fas ${expandedSection === 'storage' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
            </button>
            
            {expandedSection === 'storage' && (
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Storage Instructions</h3>
                  <p className="text-gray-700">{product.storage}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Preparation Method</h3>
                  <p className="text-gray-700">{product.preparation}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products - Placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={`https://readdy.ai/api/search-image?query=Traditional%20Middle%20Eastern%20dessert%20with%20honey%20and%20nuts%2C%20professional%20food%20photography%20with%20soft%20natural%20lighting%2C%20neutral%20background%2C%20appetizing%20presentation%20showing%20texture%20and%20details&width=400&height=300&seq=${item + 10}&orientation=landscape`}
                    alt="Related product"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">Similar Dessert {item}</h3>
                  <p className="text-gray-600 text-sm mt-1">Traditional Recipe</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-medium text-indigo-700">${(10 + item).toFixed(2)}</span>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-400 mr-1 text-sm"></i>
                      <span className="text-sm text-gray-600">4.{5 + item}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
    <Footer></Footer>
    </>
  );
};

export default ProductDetailPage;
