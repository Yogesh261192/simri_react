import React, { useState, useEffect, useRef } from "react";
import { account } from "../appwriteConfig";
import Header from "../components/Header";
import Footer from "../components/footer";
import DriverList from "../components/Driver";
import Head from "next/head";
// import { useToast } from './ToastContext';
import { useToast } from "../components/ToastContext";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import PlaceInput from "../components/PlaceInput";
import html2canvas from "html2canvas";

const defaultCenter = { lat: 28.6139, lng: 77.209 };
const containerStyle = { width: "100%", height: "400px" };
const libraries = ["places"];

export default function Rides() {
    const { showToast } = useToast();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [directions, setDirections] = useState(null);
  const [pickupLatLng, setPickupLatLng] = useState(null);
  const [dropoffLatLng, setDropoffLatLng] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [currentScreen, setCurrentScreen] = useState("ride");
  const [currentText, setCurrentText] = useState("Book Now");
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [weight, setWeight ]= useState("")

  const mapRef = useRef(null);
  function clearData(){
    setPickup("");
    setDropoff("");
    setDirections("");
    setDistance("");
    setPickupLatLng("")
    setRideDate("");
    setWeight("");
    setRideTime("");
    setDropoffLatLng("");
    setDuration("");
  }

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
  

  const handleBooking = async () => {
      const user = await account.get(); // fetch user details
         console.log(user)
    if(currentScreen=="ride"){
      if (!pickup || !dropoff || !rideDate || !rideTime) {
      showToast({message:"Please fill in pickup, dropoff, date, and time.", type:"error"});
      return;
    }

    const mapElement = mapRef.current;
    const canvas = await html2canvas(mapElement);
    const imageData = canvas.toDataURL("image/png");
const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${directions.routes[0].overview_polyline?.points}&markers=color:green|label:P|${pickupLatLng.lat},${pickupLatLng.lng}&markers=color:red|label:D|${dropoffLatLng.lat},${dropoffLatLng.lng}&key=AIzaSyAopathNjAm8ycAgsVLkJ-no21SN6BMSTM`;
    
    const formData = {
      pickup,
      dropoff,
      rideDate,
      rideTime,
      staticMapUrl,
      distance,
      duration,
      userName: user.name,
      email: user.email
    };
    

    try {
      const res = await fetch("https://simdi.in/confirm_booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        showToast({message:"Booking confirmed, please check email for more info", type:"success"});
        clearData()
      } else {
        showToast({message:"Booking failed", type:"error"});
        clearData()

      }
    } catch (err) {
      showToast({message:err, type:"error"});
      clearData()
      console.error("Error sending booking:", err);
    }
    }
    else{
       if (!pickup || !dropoff || !rideDate || !rideTime || !weight) {
      showToast({message:"Please fill in pickup, dropoff,weight, date, and time.", type:"error"});
      return;
    }
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${directions.routes[0].overview_polyline?.points}&markers=color:green|label:P|${pickupLatLng.lat},${pickupLatLng.lng}&markers=color:red|label:D|${dropoffLatLng.lat},${dropoffLatLng.lng}&key=AIzaSyAopathNjAm8ycAgsVLkJ-no21SN6BMSTM`;

    const formData = {
      pickup,
      dropoff,
      rideDate,
      rideTime,
      staticMapUrl,
      weight,
      userName: user.name,
      email: user.email
    };
     try {
      const res = await fetch(" https://simdi.in/confirm_delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
     showToast({message:"Booking confirmed, please check email for more info", type:"success"});
        clearData()
      } else {
         showToast({message:"Booking failed", type:"error"});
        clearData()
      }
    } catch (err) {
      showToast({message:err, type:"error"});
      clearData()
      console.error("Error sending booking:", err);
    }

    }
  };

  const handleCurrentChange = (param) => {
    setCurrentScreen(param);
    setCurrentText(param === "ride" ? "Book Now" : "Deliver Now");
  };

  return (
    <>
      <Head>
        <title>Rides</title>
        <meta name="description" content="Book ride or delivery in Uttarakhand" />
      </Head>

      <main>
        <Header />
        <section className="py-20 bg-[#F5F7F6]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Book a Ride or Delivery
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fast, reliable transportation and delivery services connecting Himalayan communities
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
              {/* Buttons */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <button
                  className={`flex-1 py-3 px-4 rounded-lg font-medium ${currentScreen === 'ride' ? 'bg-[#4A90A0] text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleCurrentChange('ride')}
                >
                  🚗 Ride
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-lg font-medium ${currentScreen === 'delivery' ? 'bg-[#4A90A0] text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => handleCurrentChange('delivery')}
                >
                  📦 Delivery
                </button>
              </div>

              {/* Map */}
              <div ref={mapRef}>
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
                      <Marker position={pickupLatLng} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }} />
                    )}
                    {dropoffLatLng && (
                      <Marker position={dropoffLatLng} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
                    )}
                    {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
                  </GoogleMap>
                </LoadScript>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <PlaceInput label="Pickup Location" placeholder="Enter pickup location" value={pickup} setValue={setPickup} />
                <PlaceInput label="Dropoff Location" placeholder="Enter drop location" value={dropoff} setValue={setDropoff} />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full py-3 px-4 rounded-lg bg-gray-100 border-none focus:ring-[#4A90A0]/40"
                    value={rideDate}
                    onChange={(e) => setRideDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full py-3 px-4 rounded-lg bg-gray-100 border-none focus:ring-[#4A90A0]/40"
                    value={rideTime}
                    onChange={(e) => setRideTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Ride Summary */}

              {currentScreen === 'ride' && (
<div className="bg-[#4A90A0]/10 rounded-lg p-4 my-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-700">Estimated Price</p>
                  <p className="text-xl font-bold text-[#4A90A0]">₹{distance ? Math.ceil(parseFloat(distance) * 12) : "---"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">Duration</p>
                  <p className="text-lg font-semibold">{duration || "---"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">Distance</p>
                  <p className="text-lg font-semibold">{distance || "---"}</p>
                </div>
              </div>)}
               {currentScreen === 'delivery' && (
    <>
      {/* 🔧 Approximate Weight input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Item Weight (approx)</label>
        <input
          type="number"
          placeholder="e.g. 5(all weight in kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
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

              {/* Book Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBooking();
                }}
                className="w-full bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-3 rounded-lg font-medium"
              >
                {currentText}
              </button>
            </div>
          </div>
        </section>

        <DriverList />
        <Footer />
      </main>
    </>
  );
}
