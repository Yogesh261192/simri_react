import React from 'react';
import { useCart } from './CartContext';
import { useState } from 'react';
import { account } from '../appwriteConfig';
import { useToast } from './ToastContext';

const OrderConfirmationModal = ({ isOpen, onClose, onConfirm}) => {
       const [formData, setFormData] = useState({
      address: '',
      locality: '',
      pincode:'',
      alternatePhone:''
    });
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
    getTotal
  } = useCart();
  console.log(cartItems, getTotal)
  let total= getTotal();
  // console.log(total)
  async function handleConfirm(e){
    e.preventDefault();
    if(formData.address==""|| formData.locality==""|| formData.pincode==""|| formData.alternatePhone==""){
      showToast({message:"Please fill in all the details", type:"error"})
      return 
    }
     const user = await account.get(); // fetch user details
         console.log(user)
       let response = await fetch("https://simdi.in/confirm_order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 🔥 This is essential
        },
        body: JSON.stringify({
              email: user.email,
              total_amount:total,
              items:cartItems
            })
      });
      console.log(response, 'response')
             showToast({message:"Please check your email for details", type:"success"})
              onClose(false)
  }
//   function handleChange(e){
//     e.preventDefault();
//   }
  
  
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
            className="w-full bg-[#2C5530] text-white py-3 rounded-lg font-medium"
            onClick={handleConfirm}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
