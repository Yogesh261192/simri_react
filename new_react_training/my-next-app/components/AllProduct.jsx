import React, { useEffect, useState } from 'react';
import { databases, storage } from '../appwriteConfig';
const DATABASE_ID = '6740474900354338e949';
const COLLECTION_ID = '674047600025528835b3';
const BUCKET_ID = '6742e69c003e3ca0399e';
import Header from './Header';
import Footer from './footer';
import { useCart } from './CartContext';

export default function AllProducts(params) {
  const [items, setItems] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setItems(res.documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchFiles = async () => {
      try {
        const response = await storage.listFiles(BUCKET_ID);
        setFiles(response.files);
        setLoading(false);
      } catch (error) {
        console.error('Error listing files:', error);
      }
    };

    getData();
    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Products</h2>
              <p className="text-gray-600">
                Discover authentic goods from local Himalayan artisans and producers
              </p>
            </div>
            <div className="mt-4 block">
              <div className="flex space-x-2">
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#2C5530] text-white py-2 px-4 rounded-full text-sm font-medium">All</button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#F5F7F6] text-gray-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">Handicrafts</button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#F5F7F6] text-gray-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">Food</button>
                <button className="!rounded-button whitespace-nowrap cursor-pointer bg-[#F5F7F6] text-gray-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-200">Textiles</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => {
              console.log(item, 'itemss')
              const filteredImage = files.find((file) => file.name.includes(item.name.toLowerCase()));
              const cartItem = cartItems.find((i) => i.$id === item.$id);

              return (
                <div key={item.$id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    {filteredImage ? (
                      <img
                        src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${filteredImage.$id}/view?project=673ebe09000b35b67d8b&mode=admin`}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div>Image not available</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">{item.alias_name}</h3>
                      <span className="bg-[#2C5530]/10 text-[#2C5530] text-xs px-2 py-1 rounded-full">Organic</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">₹{item.price}</span>
                      {!cartItem ? (
                        <button
                          className="!rounded-button whitespace-nowrap cursor-pointer bg-[#2C5530] hover:bg-[#2C5530]/90 text-white p-2 rounded-full"
                          onClick={() => addToCart(item)}
                        >
                          <i className="fas fa-shopping-cart"></i>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() => updateQuantity(item.$id, cartItem.quantity - 1)}
                          >
                            -
                          </button>
                          <span>{cartItem.quantity}</span>
                          <button
                            className="px-2 py-1 bg-gray-200 rounded"
                            onClick={() => updateQuantity(item.$id, cartItem.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
