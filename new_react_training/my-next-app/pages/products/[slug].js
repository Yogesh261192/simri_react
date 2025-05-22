import { useState } from 'react';
import { databases, storage } from '../../appwriteConfig';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Image from 'next/image';
import ShimmerLoader from '../../components/ShimmerProduct';
import ProductHead from '../../components/ProductHead';

const DATABASE_ID = '6740474900354338e949';
const COLLECTION_ID = '674047600025528835b3';
const BUCKET_ID = '6742e69c003e3ca0399e';

// export async function getStaticPaths() {
//   try {
//     const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
//     const paths = res.documents.map(doc => ({
//       params: {
//         slug: doc.name.toLowerCase().replace(/\s+/g, '-'),
//       },
//     }));

//     return { paths, fallback: 'blocking' };
//   } catch (error) {
//     console.error('Error generating static paths:', error);
//     return { paths: [], fallback: 'blocking' };
//   }
// }

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    const matched = res.documents.find(
      doc => doc.name.toLowerCase().replace(/\s+/g, '-') === slug
    );

    if (!matched) {
      return { notFound: true };
    }

    let imageUrl = '';
    const imageRes = await storage.listFiles(BUCKET_ID);
    const img = imageRes.files.find(file =>
      file.name.toLowerCase().includes(matched.name.toLowerCase())
    );

    if (img) {
      imageUrl = `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${img.$id}/view?project=673ebe09000b35b67d8b&mode=admin`;
    }

    return {
      props: {
        product: matched,
        imageUrl,
      },
    };
  } catch (error) {
    console.error('Error fetching product for SSR:', error);
    return { notFound: true };
  }
}


const ProductDetailPage = ({ product, imageUrl }) => {
  console.log(product)
  const [expandedSection, setExpandedSection] = useState('description');

  const toggleSection = section => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  const productDetail = {
    name: product?.name ?? 'Pahadi Product',
    slug: product?.name?.toLowerCase().replace(/\s+/g, '-') ?? 'pahadi-product',
    description:
      product?.description?.slice(0, 160) ??
      `Buy organic product made with love from the Himalayas.`,
    image: imageUrl || '',
  };

  if (!product || !imageUrl) {
    return <ShimmerLoader />;
  }

  return (
    <>
      <ProductHead product={productDetail} />
      <Header />

      <div className="min-h-screen bg-gray-50 py-5">
        <div className="container mx-auto px-4 py-6 mt-4">
          {/* Image */}
          <div className="mb-8">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden bg-white shadow-md">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}

              />
            </div>
          </div>

          {/* Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.alias_name}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-semibold text-indigo-700">₹{product.price}</span>
              <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 mr-1"></i>
                <span className="text-gray-600">{product.rating || '4.8'} ({product.review} reviews)</span>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {[
              {
                key: 'description',
                title: 'Description',
                content: (
                  <>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <h3 className="font-semibold text-gray-800 mt-4 mb-2">
                      History & Cultural Significance
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{product.history}</p>
                  </>
                ),
              },
              {
                key: 'nutrition',
                title: 'Nutritional Facts',
                content: (
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="Calories" value={product.calories || '320'} />
                    <InfoItem label="Fat" value={product.fat || '18g'} />
                    <InfoItem label="Carbs" value={product.carbs || '35g'} />
                    <InfoItem label="Protein" value={product.protein || '5g'} />
                  </div>
                ),
              },
              {
                key: 'storage',
                title: 'Storage & Preparation',
                content: (
                  <>
                    <p className="mb-4 text-gray-700">{product.storage}</p>
                    <p className="text-gray-700">{product.preparation}</p>
                  </>
                ),
              },
            ].map(({ key, title, content }) => (
              <div
                key={key}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full px-6 py-4 flex justify-between items-center cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                  <i
                    className={`fas ${
                      expandedSection === key ? 'fa-chevron-up' : 'fa-chevron-down'
                    } text-gray-500`}
                  ></i>
                </button>
                {expandedSection === key && (
                  <div className="px-6 py-4 border-t border-gray-100">{content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default ProductDetailPage;
