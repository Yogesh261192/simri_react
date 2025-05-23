import React, { use } from 'react';
import { useCart } from './CartContext';
import { useState } from 'react';
import { account, databases } from '../appwriteConfig';
import { useToast } from './ToastContext';
const order_id= "6740474900354338e949"
// import ddd from "../pages/api"

const OrderConfirmationModal = ({ isOpen, onClose, onConfirm}) => {
       const [formData, setFormData] = useState({
      address: '',
      locality: '',
      pincode:'',
      alternatePhone:''
    });
    const [loading,setLoading]= useState(false)
      const { showToast } = useToast();
  if (!isOpen) return null;

     const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
 const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotal,
    clearCart
  } = useCart();
  console.log(cartItems, getTotal)
  let total= getTotal();
  // console.log(total)
  async function handleConfirm(e){
    setLoading(true)
    e.preventDefault();
    if(formData.address==""|| formData.locality==""|| formData.pincode==""|| formData.alternatePhone==""){
      showToast({message:"Please fill in all the details", type:"error"})
      setLoading(false)
      return 
    }
    console.log(cartItems, 'caritems')
     const user = await account.get(); // fetch user details
         console.log(user)
          
       let response = await fetch("/api/confirm-order", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: user.email,
    total_amount: total,
    items: cartItems,
    details: formData
  })
});

const result = await response.json();
      
      let db= await databases.createDocument(order_id, "6742d9eb00270c32b419", "unique()",
        {
           order: JSON.stringify(cartItems),
    name: "John Doe",
    phone: "1234567890",
    date: new Date().toISOString(), // or specific ISO string
    email: user.email,
    type: "order",
    status: "pending"

        }
      )
         setLoading(false)
         clearCart()
  
             showToast({message:"Please check your email for details", type:"success"})
              onClose(false)
  }
  
  
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center overflow-scroll">
      <div className="bg-white w-full max-w-md rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Confirm Order Details</h2>
          <button
            onClick={()=>{
                onClose(false)
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
           <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-4 text-sm">
    <strong>Note:</strong> We are currently only accepting <span className="font-semibold">UPI or Cash</span>. Payment details will be sent via email.
  </div>
        <form className="space-y-4" onSubmit={onConfirm}>
          <textarea
            name="address"
            onChange={handleChange}
            value={formData.address}
            placeholder="Complete Address"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 resize-none h-20"
            required
          ></textarea>

          <input
            name="locality"
            onChange={handleChange}
            value={formData.locality}
            type="text"
            placeholder="Locality / Area"
            className="w-full px-4 py-2 rounded-lg bg-gray-50"
            required
          />

          <input
            name="pincode"
            onChange={handleChange}
            value={formData.pincode}
            type="text"
            placeholder="Pin Code"
            className="w-full px-4 py-2 rounded-lg bg-gray-50"
            required
          />

          <div className="flex">
            <select className="px-3 py-2 rounded-l-lg bg-gray-50 text-gray-500" disabled>
              <option>+91</option>
            </select>
            <input
              name="alternatePhone"
              onChange={handleChange}
              value={formData.alternatePhone}
              type="tel"
              placeholder="Alternate Phone Number"
              className="w-full px-4 py-2 rounded-r-lg bg-gray-50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C5530] text-white py-3 rounded-lg font-medium"
            onClick={handleConfirm}
          >
            {loading?"Placing Order...":"Confirm Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
