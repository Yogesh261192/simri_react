import React, { useState, useEffect, useRef } from "react";
import { account, databases } from "../appwriteConfig";
import Header from "../components/Header";
import Footer from "../components/footer";
import DriverList from "../components/Driver";
import { useUser } from "../components/userContext";
import Head from "next/head";
import SignUpModal from "../components/SignUpModal";
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
const order_id = "6740474900354338e949"

const defaultCenter = { lat: 28.6139, lng: 77.209 };
const containerStyle = { width: "100%", height: "400px" };
const libraries = ["places"];

export default function Rides() {
  const { showToast } = useToast();
  const { user, setUser } = useUser();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(false)
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
  const [weight, setWeight] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const mapRef = useRef(null);
  function clearData() {
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
      console.log(dropoffLatLng, 'drop', pickupLatLng, "pick")
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
            // showToast({message:"Unable to fetch location please select exact or nearest loaction.", type:"error"});
          }
        }
      );
    }
  }, [pickupLatLng, dropoffLatLng]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  async function handleSignIn() {
    try {
      let user = await account.createEmailPasswordSession(formData.email, formData.password);
      console.log(user)
      const userData = await account.get(); // Fetch user info
      console.log(userData);
      setUser(userData);
      showToast({ message: 'Login success!', type: 'success' })
      setIsSignInOpen(false);
    } catch (error) {
      console.log(error.message)
      showToast({ message: error.message, type: 'error' })
    }
    // setUser(user)
  }

  const handleBooking = async () => {
    setLoading(true)
    if (!directions) {
      showToast({ message: "Unable to fetch location please select exact or nearest loaction.", type: "error" });
      setLoading(false)

    }

    if (user) {
      console.log("Proceeding to checkout:");
    }
    else {
      setIsSignInOpen(true);
      setLoading(false)
      return
    }
    if (currentScreen == "ride") {
      if (!pickup || !dropoff || !rideDate || !rideTime) {
        showToast({ message: "Please fill in pickup, dropoff, date, and time.", type: "error" });
        setLoading(false)
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
      databases.createDocument(order_id, "6742d9eb00270c32b419", "unique()",
        {
          order: JSON.stringify({
            pickup,
            dropoff,
            rideDate,
            staticMapUrl
          }),
          name: user.name,
          phone: user.phone,
          date: new Date().toISOString(), // or specific ISO string
          email: user.email,
          type: "ride",
          status: "pending"

        }
      )



      try {
        const res = await fetch("https://simdi.in/confirm_booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          showToast({ message: "Booking confirmed, please check email for more info", type: "success" });
          clearData()
          setLoading(false)
        } else {
          showToast({ message: "Booking failed", type: "error" });
          clearData()
          setLoading(false)

        }
      } catch (err) {
        showToast({ message: err, type: "error" });
        clearData()
        setLoading(false)
        console.error("Error sending booking:", err);
      }
    }
    else {
      if (!pickup || !dropoff || !rideDate || !rideTime || !weight) {
        showToast({ message: "Please fill in pickup, dropoff,weight, date, and time.", type: "error" });
        setLoading(false)
        return;
      }
      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${directions.routes[0]?.overview_polyline?.points}&markers=color:green|label:P|${pickupLatLng.lat},${pickupLatLng.lng}&markers=color:red|label:D|${dropoffLatLng.lat},${dropoffLatLng.lng}&key=AIzaSyAopathNjAm8ycAgsVLkJ-no21SN6BMSTM`;

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
      databases.createDocument(order_id, "6742d9eb00270c32b419", "unique()",
        {
          order: JSON.stringify({
            pickup,
            dropoff,
            rideDate,
            staticMapUrl
          }),
          name: user.name,
          phone: user.phone,
          date: new Date().toISOString(), // or specific ISO string
          email: user.email,
          type: "delivery",
          status: "pending"

        }
      )
      try {
        const res = await fetch(" https://simdi.in/confirm_delivery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          showToast({ message: "Booking confirmed, please check email for more info", type: "success" });
          clearData()
          setLoading(false)
        } else {
          showToast({ message: "Booking failed", type: "error" });
          clearData()
          setLoading(false)
        }
      } catch (err) {
        showToast({ message: err, type: "error" });
        clearData()
        setLoading(false)
        console.error("Error sending booking:", err);
      }

    }
  };

  const handleCurrentChange = (param) => {
    setCurrentScreen(param);
    setCurrentText(param === "ride" ? "Book Now" : "Deliver Now");
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <Head>
        <title>Book Ride or Delivery to the Himalayas – SIMDI</title>
        <meta name="description" content="Book reliable rides or deliveries from Delhi to Uttarakhand and Himachal Pradesh. Eco-friendly, fast and safe transportation to the Himalayas." />
        <meta name="keywords" content="ride booking, delivery service, Delhi to Himalayas, Uttarakhand, Himachal Pradesh, eco-friendly travel, Himalayan delivery, pahadi transport, SIMDI ride, SIMDI delivery" />
        <meta name="author" content="Yogesh Mamgain" />
        <link rel="canonical" href="https://simdi.in/rides" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Book Ride or Delivery to the Himalayas – SIMDI" />
        <meta property="og:description" content="Plan your ride or delivery from Delhi to the Himalayas with SIMDI. Serving Uttarakhand & Himachal Pradesh with sustainable transport." />
        <meta property="og:url" content="https://simdi.in/rides" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://simdi.in/assets/images/intercity_rides.jpg" />
        <meta property="og:image:alt" content="A Simdi ride vehicle heading toward the Himalayas" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Ride or Delivery to the Himalayas – SIMDI" />
        <meta name="twitter:description" content="Plan your ride or delivery from Delhi to the Himalayas with SIMDI. Serving Uttarakhand & Himachal Pradesh with sustainable transport." />
        <meta name="twitter:image" content="https://simdi.in/assets/images/intercity_rides.jpg" />
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Book Ride or Delivery to the Himalayas – SIMDI",
  "description": "Plan your ride or delivery from Delhi to the Himalayas with SIMDI. Serving Uttarakhand & Himachal Pradesh with sustainable transport.",
  "url": "https://simdi.in/rides",
  "image": "https://simdi.in/assets/images/intercity_rides.jpg"
}
`}
        </script>

      </Head>


      <main>
        <Header />
        {isSignInOpen && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Sign In</h2>
                <button
                  onClick={() => setIsSignInOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-[#2C5530]"
                    placeholder="Enter your email"
                    onChange={handleChange} value={formData.email}
                    name="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-[#2C5530]"
                    placeholder="Enter your password"
                    onChange={handleChange} value={formData.password}
                    name="password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#2C5530] focus:ring-[#2C5530]" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[#2C5530] hover:text-[#2C5530]/80">Forgot password?</a>
                </div>

                <button
                  type="button"
                  onClick={handleSignIn}
                  className="w-full bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-3 rounded-lg font-medium"
                >
                  Sign In
                </button>

                {/* <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <i className="fab fa-google text-red-500"></i>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <i className="fab fa-facebook text-blue-500"></i>
                  Facebook
                </button>
              </div> */}

                <p className="text-center text-sm text-gray-600 mt-6">
                  Dont have an account?{" "}
                  <a href="#" className="text-[#2C5530] hover:text-[#2C5530]/80 font-medium"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsSignInOpen(false);
                      setIsSignUpOpen(true);
                    }}>
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
        {isSignUpOpen && <SignUpModal setIsSignUpOpen={setIsSignUpOpen} />}

        <section className="py-20 bg-[#F5F7F6]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Book a Ride or Schedule a Delivery to the Himalayas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fast, safe, and eco-conscious transportation and delivery services connecting <strong>Delhi</strong> with towns and villages across the Himalayan states.
              </p>
              <p className="text-gray-700 max-w-2xl mx-auto text-lg font-semibold mt-2">
                🛣️ Currently operating from <span className="text-[#4A90A0] font-bold">Delhi</span> to <span className="text-[#4A90A0] font-bold">Uttarakhand</span> and <span className="text-[#4A90A0] font-bold">Himachal Pradesh</span>
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

              {/* {currentScreen === 'ride' && (
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
              </div>)} */}
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
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleBooking();
                }}
                className="w-full bg-[#4A90A0] hover:bg-[#4A90A0]/90 text-white py-3 rounded-lg font-medium"
              >
                {loading ? "Confirming" : currentText}
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
