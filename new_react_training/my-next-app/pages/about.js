import Image from 'next/image';
import Header from "../components/Header";
import Footer from "../components/footer";
import rides from '../public/assets/images/village-women.jpg';
import mahila_madal from '../public/assets/images/mahila_mandal.jpg'
import panorama from '../public/assets/images/panorama.jpg'

// import Image from 'next/image';
// import delivery_services from '../public/assets/images/delivery_services.jpg';

export default function AboutUs() {
  return (
    <>
    <Header></Header>
      <div className="about-content p-2">
            {/* Hero Section */}
            <div className="relative h-[500px] mb-3 rounded-xl overflow-hidden">
              <Image
                src={panorama.src}
                alt="Uttarakhand Village Landscape"
                className="w-full h-full object-cover object-top"
                width={400} height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-16">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Our Story
                </h1>
                <p className="text-xl text-white max-w-lg">
                  Empowering Mountain Communities Through Technology
                </p>
              </div>
            </div>

            {/* Our Journey Section */}
            <div className="flex flex-col md:flex-row gap-12 mb-4">
              <div className="md:w-1/2">
                <Image
                  src={mahila_madal.src}
                  alt="Village Women Working"
                  className="w-full h-[500px] object-cover object-top rounded-xl shadow-lg"
                  width={400} height={400}
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-green-700 mb-6">
                  The Journey of Resilience
                </h2>
                <p className="text-lg mb-6">
                  In the picturesque villages of Uttarakhand, we witnessed a
                  concerning trend: young people migrating to plains in search
                  of livelihood, leaving behind aging parents and empty homes.
                  This migration has hollowed out once-vibrant communities, with
                  over 1,700 villages now classified as <b>ghost villages</b>.
                </p>
                <p className="text-lg mb-8">
                  We asked ourselves a simple question: Why can not we create jobs
                  in the villages themselves? This question became our mission,
                  and with the help of local <b>Mahila Mandals</b> (Women&apos;s
                  Collectives), we began cultivating, processing, and packaging
                  organic products that represent the essence of <b>Uttarakhand Pauri Garhwal</b>.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-4xl font-bold text-green-700">35%</p>
                    <p className="text-gray-600">
                      Decrease in youth migration from our partner villages
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-4xl font-bold text-green-700">24</p>
                    <p className="text-gray-600">
                      Villages now with sustainable income sources
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Focus Section */}
            <div className="mb-5">
              <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
                Our Community Focus
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Village Mahila Mandals
                  </h3>
                  <p className="text-gray-600">
                    We partner with women&apos;s collectives in remote villages,
                    providing training, resources, and market access. These
                    women are the backbone of our initiative, bringing
                    traditional knowledge and dedication to quality.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Organic Production</h3>
                  <p className="text-gray-600">
                    All our products are grown and processed without chemicals,
                    preserving the natural purity of Uttarakhand&apos;s soil. We
                    follow traditional farming methods that have sustained these
                    communities for generations.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-laptop"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Technology Integration
                  </h3>
                  <p className="text-gray-600">
                    We are bridging the digital divide by introducing technology
                    that connects remote villages to global markets. Our
                    platform gives Pahadi (mountain) producers the tools to
                    compete in the modern marketplace.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Gallery */}
           <div className="mb-5">
              <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
                Our Impact in Pictures
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Image
                    width={400} height={400}
                  src="https://readdy.ai/api/search-image?query=Authentic%20Garhwali%20woman%20in%20traditional%20Uttarakhandi%20dress%20with%20pichoda%20harvesting%20red%20chilies%20and%20herbs%20in%20mountain%20terrace%20farm%2C%20snow%20peaks%20visible%2C%20morning%20golden%20light%2C%20documentary%20style%20photography&width=300&height=400&seq=uttarakhand-farmer-2&orientation=portrait"
                  alt="Local Farmer"
                  className="w-full h-64 object-cover object-top rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                />
                <Image
                    width={400} height={400}
                  src="https://readdy.ai/api/search-image?query=Elderly%20Kumaoni%20women%20in%20traditional%20Uttarakhandi%20attire%20working%20together%20sorting%20pine%20nuts%20and%20local%20spices%2C%20wearing%20traditional%20silver%20jewelry%2C%20inside%20wooden%20mountain%20home%2C%20warm%20natural%20lighting%20through%20windows&width=300&height=400&seq=uttarakhand-processing-2&orientation=portrait"
                  alt="Product Processing"
                  className="w-full h-64 object-cover object-top rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                />
                <Image
                width={400} height={400}
                  src="https://readdy.ai/api/search-image?query=Group%20of%20Pahadi%20women%20in%20colorful%20Uttarakhandi%20traditional%20dress%20packaging%20organic%20rajma%20beans%20and%20mandua%20flour%20in%20eco-friendly%20bags%2C%20working%20in%20small%20mountain%20cooperative%2C%20natural%20lighting%2C%20authentic%20setting&width=300&height=400&seq=uttarakhand-packaging-2&orientation=portrait"
                  alt="Packaging Activities"
                  className="w-full h-64 object-cover object-top rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                />
                <Image
                width={400} height={400}
                  src="https://readdy.ai/api/search-image?query=Young%20Garhwali%20person%20in%20traditional%20Uttarakhandi%20vest%20teaching%20elderly%20village%20women%20to%20use%20smartphones%20for%20digital%20payments%2C%20inside%20traditional%20mountain%20home%20with%20wooden%20architecture%2C%20warm%20lighting%20through%20windows&width=300&height=400&seq=uttarakhand-tech-2&orientation=portrait"
                  alt="Technology Training"
                  className="w-full h-64 object-cover object-top rounded-lg shadow cursor-pointer hover:opacity-90 transition-opacity"
                />
              </div>
            </div>

            {/* Team Section */}
            {/* <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
                Our Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20Indian%20woman%20in%20her%2040s%20with%20confident%20expression%2C%20simple%20background%2C%20high%20quality%20portrait%2C%20business%20attire%20with%20subtle%20traditional%20elements%2C%20warm%20lighting&width=200&height=200&seq=team-1&orientation=squarish"
                      alt="Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Priya Sharma</h3>
                  <p className="text-gray-600">Founder & Director</p>
                  <p className="text-center text-gray-500 mt-2">
                    Born in Uttarakhand, returned after 15 years in corporate
                    sector
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20Indian%20man%20in%20his%2050s%20with%20kind%20eyes%20and%20gentle%20smile%2C%20simple%20background%2C%20high%20quality%20portrait%2C%20casual%20professional%20attire%2C%20warm%20lighting&width=200&height=200&seq=team-2&orientation=squarish"
                      alt="Co-Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Rajesh Bhatt</h3>
                  <p className="text-gray-600">Agricultural Expert</p>
                  <p className="text-center text-gray-500 mt-2">
                    30 years experience in sustainable farming practices
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Indian%20woman%20in%20her%2030s%20with%20bright%20smile%2C%20simple%20background%2C%20high%20quality%20portrait%2C%20smart%20casual%20attire%2C%20warm%20lighting&width=200&height=200&seq=team-3&orientation=squarish"
                      alt="Community Manager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Meena Rawat</h3>
                  <p className="text-gray-600">Community Manager</p>
                  <p className="text-center text-gray-500 mt-2">
                    Coordinates with 24 Mahila Mandals across the region
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20Indian%20man%20in%20his%2020s%20with%20tech-savvy%20appearance%2C%20simple%20background%2C%20high%20quality%20portrait%2C%20casual%20modern%20attire%2C%20warm%20lighting&width=200&height=200&seq=team-4&orientation=squarish"
                      alt="Tech Lead"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Vikram Negi</h3>
                  <p className="text-gray-600">Technology Lead</p>
                  <p className="text-center text-gray-500 mt-2">
                    Returned to his village after working in Bangalore&apos;s tech
                    sector
                  </p>
                </div>
              </div>
            </div> */}
          </div>
    <Footer></Footer>
    </>
   
  );
}

