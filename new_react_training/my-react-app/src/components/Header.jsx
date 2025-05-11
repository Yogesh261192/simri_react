import { useRedirect } from './Common';
import { useCart } from './CartContext';
import { useState, useEffect } from 'react';
const DATABASE_ID = '6740474900354338e949';
const COLLECTION_ID = '674047600025528835b3';
const BUCKET_ID = '6742e69c003e3ca0399e';
import { databases, storage } from '../appwriteConfig';
import SignUpModal from './SignUpModal';
import OtpModal from './OtpModal';

function Header() {
  const redirect = useRedirect();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotal
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [files, setFiles]= useState([]);
const [isSignUpOpen, setIsSignUpOpen] = useState(false);
const [isOtpOpen, setIsOtpOpen] = useState(false);
const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
const [userId, setUserId] = useState(null);

  useEffect (()=>{
    const fetchFiles = async () => {
      try {
        const response = await storage.listFiles(BUCKET_ID);
        setFiles(response.files);
        // setLoading(false);
      } catch (error) {
        console.error('Error listing files:', error);
      }
    };
    fetchFiles()

  },[])
  
  

  const handleBuyNow = () => {
    setIsSignInOpen(true);
  };

  const subtotal = getTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <>
      <header className="fixed w-full z-50 bg-white/95 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => redirect('/')}>
            <div className="text-2xl font-bold text-[#2C5530] flex items-center">
              <i className="fas fa-mountain text-[#4A90A0] mr-2"></i>
              <span>SIMDI</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative text-gray-600 hover:text-[#2C5530]"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#4A90A0] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="text-gray-600 hover:text-[#2C5530]">
                <i className="fas fa-user-circle text-xl"></i>
              </button>
            </div>
          </div>

          <button className="md:hidden text-gray-600">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </header>

      {/* Cart Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.map(item => {
                console.log(item)
                const filteredImage = files.find((file) => file.name.includes(item.name.toLowerCase()));
                return <div key={item.$id} className="flex items-center gap-4 mb-4 pb-4 border-b">
                <img src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${filteredImage.$id}/view?project=673ebe09000b35b67d8b&mode=admin`} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-[#2C5530] font-semibold">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.$id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.$id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.$id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
                
})}
            </div>

            <div className="p-4 bg-gray-50">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-3 rounded-lg font-medium"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-[#2C5530]"
                  placeholder="Enter your password"
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
                type="submit"
                className="w-full bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-3 rounded-lg font-medium"
              >
                Sign In
              </button>

              <div className="relative my-6">
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
              </div>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{" "}
                <a href="#" className="text-[#2C5530] hover:text-[#2C5530]/80 font-medium"
                onClick={() => {
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
      {/* Sign Up Modal */}
      {isSignUpOpen && <SignUpModal setIsSignUpOpen={setIsSignUpOpen} setIsOtpOpen={setIsOtpOpen} setUserId={setUserId}/>}
{isOtpOpen && <OtpModal setIsOtpOpen={setIsOtpOpen} otpValues={otpValues} setOtpValues={setOtpValues} />}

    </>
  );
}

export default Header;
