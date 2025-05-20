import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { databases, storage } from '../../appwriteConfig';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Image from 'next/image';
import ShimmerLoader from '../../components/ShimmerProduct';
import ProductHead from '../../components/ProductHead';

const DATABASE_ID = '6740474900354338e949';
const COLLECTION_ID = '674047600025528835b3';
const BUCKET_ID = '6742e69c003e3ca0399e';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import ProductHead from './ProductHead';  // Adjust import path
// import Header from './Header';             // Adjust import path
// import Footer from './Footer';             // Adjust import path
// import ShimmerLoader from './ShimmerLoader'; // Adjust import path

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [expandedSection, setExpandedSection] = useState('description');

  // Prepare productDetail for SEO head tags safely
  const productDetail = {
    name: product?.name ?? 'Pahadi Product',
    slug: product?.slug ?? slug ?? 'pahadi-product',
    description: product?.description 
      ? product.description.slice(0, 160)
      : `Buy organic product real made with love and Himalayan ${product?.name ?? 'Pahadi Product'}`,
    image: imageUrl || '',
  };

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        // Fetch all products
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

        // Find product matching slug
        const matched = res.documents.find(doc =>
          doc.name.toLowerCase().replace(/\s+/g, '-') === slug
        );

        if (matched) {
          setProduct(matched);

          // Fetch image related to the product
          const imageRes = await storage.listFiles(BUCKET_ID);
          const img = imageRes.files.find(file =>
            file.name.toLowerCase().includes(matched.name.toLowerCase())
          );

          if (img) {
            const url = `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${img.$id}/view?project=673ebe09000b35b67d8b&mode=admin`;
            setImageUrl(url);
          } else {
            setImageUrl(''); // fallback if no image found
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [slug]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Show loader until product is fetched
  if (!product) {
    return <ShimmerLoader />;
  }

  return (
    <>
      <ProductHead product={productDetail} />

      <Header />

      <div className="min-h-screen bg-gray-50 py-5">
        <div className="container mx-auto px-4 py-6 mt-4">
          {/* Image Section */}
          <div className="mb-8">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden bg-white shadow-md">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400">
                  Image not available
                </div>
              )}
            </div>
          </div>

          {/* Title and Price */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.localName}</p>

            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-semibold text-indigo-700">₹{product.price}</span>
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                <span className="text-gray-600">{product.rating || '4.8'} (124 reviews)</span>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('description')}
                className="w-full px-6 py-4 flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                <i className={`fas ${expandedSection === 'description' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
              </button>
              {expandedSection === 'description' && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    This is a rich and flavorful delicacy loved across generations. Perfectly layered, sweetened just right, and made with the finest ingredients.
                  </p>
                  <h3 className="font-semibold text-gray-800 mt-4 mb-2">History & Cultural Significance</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This dessert has deep roots in cultural celebrations and festive moments. Often served during weddings, festivals, and religious occasions.
                  </p>
                </div>
              )}
            </div>

            {/* Nutritional Facts */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
              <button 
                onClick={() => toggleSection('nutrition')}
                className="w-full px-6 py-4 flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800">Nutritional Facts</h2>
                <i className={`fas ${expandedSection === 'nutrition' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
              </button>
              {expandedSection === 'nutrition' && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="font-semibold text-gray-800">{product.calories || '320'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Fat</p>
                      <p className="font-semibold text-gray-800">{product.fat || '18g'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Carbs</p>
                      <p className="font-semibold text-gray-800">{product.carbs || '35g'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="font-semibold text-gray-800">{product.protein || '5g'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Storage */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('storage')}
                className="w-full px-6 py-4 flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800">Storage & Preparation</h2>
                <i className={`fas ${expandedSection === 'storage' ? 'fa-chevron-up' : 'fa-chevron-down'} text-gray-500`}></i>
              </button>
              {expandedSection === 'storage' && (
                <div className="px-6 py-4 border-t border-gray-100">
                  <p className="mb-4 text-gray-700">
                    Store in an airtight container in a cool, dry place. Best consumed within 7 days.
                  </p>
                  <p className="text-gray-700">
                    Serve at room temperature. For enhanced flavor, warm slightly before serving.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetailPage;


