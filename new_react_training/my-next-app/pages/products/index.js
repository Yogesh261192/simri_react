import React, { useEffect, useState } from 'react';
// import { databases, storage } from '../appwriteConfig';
import { databases,storage } from '../../appwriteConfig';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import { useCart } from '../../components/CartContext';
import Head from 'next/head';
import Image from 'next/image';
import { Coming_Soon } from 'next/font/google';
import { useRouter } from 'next/router';

const DATABASE_ID = '6740474900354338e949';
const COLLECTION_ID = '674047600025528835b3';
const BUCKET_ID = '6742e69c003e3ca0399e';

export default function AllProducts({ serverProducts }) {
  const [items, setItems] = useState(serverProducts);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, updateQuantity } = useCart();
 const router = useRouter(); // ✅ Use the useRouter hook
  
  const redirect = (path) => {
    router.push(`/${path}`); // ✅ Redirect to the specified path
  };
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await storage.listFiles(BUCKET_ID);
        setFiles(response.files);
      
      } catch (error) {
        console.error('Error listing files:', error);
      } finally {
        setLoading(false);
      }
    };

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
        <Head>
        <title>Buy Authentic Pahadi Products Online | SIMDI</title>
        <meta name="description" content="Shop original Pahadi and Uttarakhand products like Gauth, Kaafal, Jhangora, and more. Delivered pan India. Discover Himalayan goods now." />
        <meta name="keywords" content="pahadi products, buy pahadi products, uttarakhand products, himalayan goods, gauth, daal, jhangora, kaafal, organic, simdi" />
        <meta name="author" content="Simdi Team" />
        <link rel="canonical" href="https://www.simdi.in/products" />
        <meta property="og:title" content="Buy Pahadi Products Online | SIMDI" />
        <meta property="og:description" content="Authentic Himalayan goods delivered to your doorstep." />
        <meta property="og:url" content="https://www.simdi.in/products" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Simdi",
            url: "https://www.simdi.in/products",
            image: "https://simdi.in/assets/images/products.jpg",
            description: "Buy authentic Pahadi and Uttarakhand products online",
            sameAs: [
              "https://www.instagram.com/yoursimdi/",
              "https://www.facebook.com/Yoursimdi"
            ]
          })}
        </script>
      </Head>
      <main>
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              {/* <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Products</h2>
                <p className="text-gray-600">
                  Discover authentic goods from local Himalayan artisans and producers
                </p>
              </div> */}
                <div className=" text-gray-700">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Buy Pahadi Products Online</h2>
              <p>
                Welcome to <strong>Simdi</strong> — your one-stop shop to <strong>buy authentic Pahadi products online</strong>. We deliver natural, handmade, and organic items like <strong>Gauth, Jhangora, Kaafal</strong>, and more, sourced directly from the hills of <strong>Uttarakhand</strong> and <strong>Himachal</strong>. Support local artisans and enjoy the taste of the Himalayas.
              </p>
            </div>
                <div className="mt-4 ">
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
                // console.log(item, 'iteem')
                const filteredImage = files.find((file) => file.name.toLowerCase().includes(item.name.toLowerCase()));
                const cartItem = cartItems.find((i) => i.$id === item.$id);

                return (
                  <div key={item.$id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-2">
                    <div className="h-48 overflow-hidden">
                      {filteredImage ? (
                        <Image
                          src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${filteredImage.$id}/view?project=673ebe09000b35b67d8b&mode=admin`}
                          alt={item.name}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover object-top cursor-pointer"
                          onClick={()=>{
                            const slug = item.name.toLowerCase().replace(/\s+/g, '-'); // e.g. "Mango Lokum" → "mango-lokum"
  redirect(`products/${slug}`);
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">Image not available</div>
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
      </main>
    </>
  );
}

// Static generation with ISR
export async function getStaticProps() {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return {
      props: {
        serverProducts: res.documents || [],
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        serverProducts: [],
      },
    };
  }
}
