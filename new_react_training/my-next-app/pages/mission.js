import Image from 'next/image';
import Header from "../components/Header";
import Footer from "../components/footer";
import { useState, useEffect } from 'react';
import mission_image from '../public/assets/images/mission_main.jpg'
import Head from 'next/head';


export default function OurMission() {
    const [counters, setCounters] = useState({
    villages: 0,
    women: 0,
    products: 0,
    families: 0,
  });

  const targetCounters = {
    villages: 7,
    women: 70,
    products: 28,
    families: 67,
  };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounters((prev) => ({
//         villages:
//           prev.villages < targetCounters.villages
//             ? prev.villages + 1
//             : prev.villages,
//         women: prev.women < targetCounters.women ? prev.women + 10 : prev.women,
//         products:
//           prev.products < targetCounters.products
//             ? prev.products + 1
//             : prev.products,
//         families:
//           prev.families < targetCounters.families
//             ? prev.families + 5
//             : prev.families,
//       }));

//       if (
//         counters.villages >= targetCounters.villages &&
//         counters.women >= targetCounters.women &&
//         counters.products >= targetCounters.products &&
//         counters.families >= targetCounters.families
//       ) {
//         clearInterval(interval);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [counters]);

  return (
    <>
    <Head>
  <title>Our Mission – Empowering Himalayan Villages | SIMDI</title>
  <meta 
    name="description" 
    content="Discover SIMDI's mission to create jobs, empower women, and promote sustainable development in Uttarakhand and Himachal Pradesh villages." 
  />
  <meta 
    name="keywords" 
    content="sustainable development, women empowerment, job creation, Uttarakhand, Himachal, rural transformation, SIMDI mission, pahadi communities" 
  />
  <meta name="author" content="Yogesh Mamgain" />
  <link rel="canonical" href="https://simdi.in/mission" />

  {/* Open Graph (Facebook, LinkedIn, etc.) */}
  <meta property="og:title" content="Our Mission – Empowering Himalayan Villages | SIMDI" />
  <meta property="og:description" content="Join SIMDI's mission to build sustainable livelihoods, empower women, and digitally connect mountain communities." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://simdi.in/mission" />
  <meta property="og:image" content="https://simdi.in/assets/images/mission_main.jpg" /> 
  <meta property="og:image:alt" content="Women working in Uttarakhand with SIMDI support" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Our Mission – Empowering Himalayan Villages | SIMDI" />
  <meta name="twitter:description" content="Discover how SIMDI is creating opportunities in remote Himalayan villages." />
  <meta name="twitter:image" content="https://simdi.in/assets/images/mission_main.jpg" />
  <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Simdi",
            url: "https://www.simdi.in/mission",
            image: "https://simdi.in/assets/images/mission_main.jpg",
            description: "Buy authentic Pahadi and Uttarakhand products online",
            sameAs: [
              "https://www.instagram.com/yoursimdi/",
              "https://www.facebook.com/Yoursimdi"
            ]
          })}
        </script>
</Head>

    <Header></Header>
    <div className="mission-content p-2">
            {/* Vision Banner */}
            <div className="relative h-[500px] mb-16 rounded-xl overflow-hidden">
              <img
              // width={400} height={400}
                src={mission_image.src}
                alt="Uttarakhand Mountain Landscape"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-16">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Our Mission
                </h1>
                <p className="text-2xl text-white max-w-2xl">
                  Creating Sustainable Livelihoods in Uttarakhand Villages
                </p>
              </div>
            </div>

            {/* Goals Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
                Our Core Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Job Creation</h3>
                  <p className="text-gray-600">
                    We aim to create sustainable employment opportunities within
                    villages, eliminating the need for migration to urban areas.
                    By developing local value chains, we ensure that economic
                    benefits remain within the community.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">
                    Technology Adoption
                  </h3>
                  <p className="text-gray-600">
                    We are bridging the digital divide by introducing appropriate
                    technology that connects remote villages to global markets.
                    Our platform gives Pahadi (mountain) producers the tools to
                    compete in the modern marketplace.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-female"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Women Empowerment</h3>
                  <p className="text-gray-600">
                    We focus on empowering women through Mahila Mandals (Women&apos;s
                    Collectives), providing training, resources, and market
                    access. These women are becoming economic drivers in their
                    communities, changing traditional power dynamics.
                  </p>
                </div>
              </div>
            </div>

            {/* SIMDI Explanation */}
            <div className=" bg-green-50 py-16 px-8 rounded-xl">
              <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
                Understanding SIMDI
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sustainable</h3>
                  <p className="text-gray-600">
                    Environmentally responsible practices that preserve
                    Uttarakhand&apos;s pristine ecology
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Initiative</h3>
                  <p className="text-gray-600">
                    Community-led action to address local challenges with
                    innovative solutions
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-store"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Marketplace</h3>
                  <p className="text-gray-600">
                    Digital platform connecting village producers directly with
                    conscious consumers
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-truck"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Delivery</h3>
                  <p className="text-gray-600">
                    Efficient logistics network that brings mountain products to
                    your doorstep
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <div className="text-4xl text-green-600 mb-4">
                    <i className="fas fa-bus"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Intercity Transport
                  </h3>
                  <p className="text-gray-600">
                    Connecting remote villages to urban centers, facilitating
                    movement of people and goods
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metrics */}
            {/* <div className="mb-20">
              <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
                Our Impact So Far
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <p className="text-5xl font-bold text-green-700 mb-2">
                    {counters.villages}
                  </p>
                  <p className="text-xl text-gray-600">Villages Impacted</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <p className="text-5xl font-bold text-green-700 mb-2">
                    {counters.women}+
                  </p>
                  <p className="text-xl text-gray-600">Women Employed</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <p className="text-5xl font-bold text-green-700 mb-2">
                    {counters.products}
                  </p>
                  <p className="text-xl text-gray-600">Products Marketed</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <p className="text-5xl font-bold text-green-700 mb-2">
                    {counters.families}+
                  </p>
                  <p className="text-xl text-gray-600">Families Supported</p>
                </div>
              </div>
            </div> */}

            {/* Call to Action */}
            <div className=" bg-green-700 text-white py-16 px-8  text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Together, we can revitalize Uttarakhand&apos;s villages and create a
                model for sustainable rural development across the Himalayas.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                <button className="bg-white text-green-700 px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-300 ease-in-out text-lg font-medium !rounded-button whitespace-nowrap cursor-pointer">
                  Support Our Work
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg shadow hover:bg-white/10 transition duration-300 ease-in-out text-lg font-medium !rounded-button whitespace-nowrap cursor-pointer">
                  Become a Partner
                </button>
              </div>
              {/* <div className="max-w-md mx-auto">
                <p className="mb-4 font-medium">
                  Stay updated with our progress:
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-l-lg border-none focus:outline-none text-gray-800"
                  />
                  <button className="bg-green-800 text-white px-6 py-3 rounded-r-lg hover:bg-green-900 transition duration-300 ease-in-out !rounded-button whitespace-nowrap cursor-pointer">
                    Subscribe
                  </button>
                </div>
              </div> */}
              {/* <div className="flex justify-center space-x-6 mt-8">
                <a
                  href="#"
                  className="text-white text-2xl hover:text-green-200 transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-white text-2xl hover:text-green-200 transition-colors cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-white text-2xl hover:text-green-200 transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-white text-2xl hover:text-green-200 transition-colors cursor-pointer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div> */}
            </div>
          </div>
    <Footer></Footer>
    </>
  );
}
