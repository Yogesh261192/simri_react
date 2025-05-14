import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import DriverList from "../components/Driver";
import Head from "next/head";
// import { handleRedirect } from "./Common";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import PlaceInput from "../components/PlaceInput";

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const libraries = ["places"];


export default function Rides() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [directions, setDirections] = useState(null);
  const [pickupLatLng, setPickupLatLng] = useState(null);
  const [dropoffLatLng, setDropoffLatLng] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [currentScreen, setCurrentScreen]= useState('ride');
  const [currentText, setCurrentText]= useState("Book Now")

  const autocompleteService = useRef(null);
  
 


  useEffect(() => {
    if (!window.google) return;
    // autocompleteService.current =
    //   new window.google.maps.places.AutocompleteService();
  }, []);
  function handleCurrentChange(param){
        setCurrentScreen(param);
        if(param=="rides"){
            setCurrentText("Book Now")
        }
        else{
            setCurrentText("Deliver Now")
        }

  }

  // Geocode place names into coordinates
  const geocodePlace = (address, setter) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setter({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    });
  };

  useEffect(() => {
    if (pickup) geocodePlace(pickup, setPickupLatLng);
    if (dropoff) geocodePlace(dropoff, setDropoffLatLng);
  }, [pickup, dropoff]);

  useEffect(() => {
    if (pickupLatLng && dropoffLatLng && window.google) {
      const service = new window.google.maps.DirectionsService();
  
      service.route(
        {
          origin: pickupLatLng,
          destination: dropoffLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    }
  }, [pickupLatLng, dropoffLatLng]);

  return (
    <>
      <Head>
        <title>Rides</title>
        <meta name="description" content="pahadi and uttrakhand products as well as cab booking for char dham and all desitanation in himachal and uttrakhand" />
        <meta name="keywords" content="kedarnath, rides, cab, driver, badrinath,gangotri,
        yamunotri, char, dham, yatra, comfortable, safe" />
        <meta name="author" content="yogesh mamgain" />
        <link rel="canonical" href="http://simdi.in" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="SIMDI" />
        <meta property="og:description" content="simdi." />
        <meta property="og:url" content="http://simdi.in" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Page Title" />
        <meta name="twitter:description" content="Your social media preview text." /> */}
      </Head>
    <main>
      <Header></Header>
   
    <section className="py-20 bg-[#F5F7F6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Book a Ride or Delivery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fast, reliable transportation and delivery services connecting
            Himalayan communities
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <button
  className={`!rounded-button whitespace-nowrap cursor-pointer flex-1 py-3 px-4 rounded-lg text-center font-medium ${
    currentScreen === 'ride' ? 'bg-[#4A90A0] text-white' : 'bg-[#F5F7F6] text-gray-700 hover:bg-gray-200'
  }`}
  onClick={() => setCurrentScreen('ride')}
>
  <i className="fas fa-car mr-2"></i> Ride
</button>

            <button
  className={`!rounded-button whitespace-nowrap cursor-pointer flex-1 py-3 px-4 rounded-lg text-center font-medium ${
    currentScreen === 'delivery' ? 'bg-[#4A90A0] text-white' : 'bg-[#F5F7F6] text-gray-700 hover:bg-gray-200'
  }`}
  onClick={() => handleCurrentChange('delivery')}
>
  <i className="fas fa-box mr-2"></i> Delivery
</button>
          </div>

          <LoadScript
            googleMapsApiKey="AIzaSyAopathNjAm8ycAgsVLkJ-no21SN6BMSTM"
            libraries={libraries}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={pickupLatLng || defaultCenter}
              zoom={12}
            >
              {pickupLatLng && (
                <Marker
                  position={pickupLatLng}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }}
                />
              )}
              {dropoffLatLng && (
                <Marker
                  position={dropoffLatLng}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                />
              )}
              {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
            </GoogleMap>
          </LoadScript>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-2">
            <PlaceInput
              label="Pickup Location"
              placeholder="Enter pickup location"
              value={pickup}
              setValue={setPickup}
            />

            <PlaceInput
              label="Dropoff Location"
              placeholder="Enter drop location"
              value={dropoff}
              setValue={setDropoff}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#F5F7F6] border-none text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90A0]/30"
                  defaultValue="2025-05-08"
                />
                <i className="fas fa-calendar absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#F5F7F6] border-none text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90A0]/30"
                  defaultValue="10:00"
                />
                <i className="fas fa-clock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              </div>
            </div>
          </div>

          <div className="bg-[#4A90A0]/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">Estimated Price</p>
                <p className="text-[#4A90A0] text-2xl font-bold">₹{distance ? Math.ceil(parseFloat(distance) * 12) : "---"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Estimated Time</p>
                <p className="text-gray-800 font-bold">{duration || "---"}</p>
              </div>
              <div>
                <p className="text-gray-700 font-medium">Distance</p>
                <p className="text-gray-800 font-bold">{distance || "---"}</p>
              </div>
            </div>
          </div>
          {currentScreen === 'delivery' && (
    <>
      {/* 🔧 Approximate Weight input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Item Weight (approx)</label>
        <input
          type="number"
          placeholder="e.g. 5"
          className="w-full py-3 px-4 rounded-lg bg-[#F5F7F6] border-none text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90A0]/30"
        />
      </div>

      {/* 🔧 Handle with Care checkbox */}
      <div className="flex items-start space-x-2 mt-2">
        <input
          type="checkbox"
          id="handleWithCare"
          className="mt-1"
        />
        <label htmlFor="handleWithCare" className="text-sm text-gray-700">Handle with care</label>
      </div>
    </>
  )}
          <button className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-3 px-4 rounded-lg text-center font-medium">
            {currentText}
          </button>
        </div>
      </div>
    </section>
    {/* <Services notshow="rides"></Services> */}
    <DriverList></DriverList>
     <Footer></Footer>
    </main>
    </>
    
  );
}
