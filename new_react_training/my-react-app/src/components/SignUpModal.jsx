// components/SignUpModal.jsx
import React, { useState } from 'react';
import { account,ID  } from '../appwriteConfig';
import { useToast } from './ToastContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpModal = ({ setIsSignUpOpen, setIsOtpOpen, setUserId }) => {
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
        const response = await fetch('http://simdi.in:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              name: formData.name,
              phone: `+91${formData.phone}`, // Include country code if needed
            }),
          });
        //   const token = await account.createEmailToken(
        //     ID.unique(),
        //     formData.email
        // );
        await account.deleteSession('current');
        let emails= await account.createEmailPasswordSession(formData.email, formData.password);
        
        let urlDetails= await account.createVerification('http://simdi.in/verify-email'); // must be whitelisted in Appwrite
        console.log(urlDetails);
          
          const data = await response.json();
        //   const response_1 = await account.createPhoneVerification();
          if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
          }
        //   const userId = token.userId;
        // setUserId(userId);
        // setIsOtpOpen(true);
        showToast({message:"Please check your email for verification link from Appwrite", type:"success"})
        setIsSignUpOpen(false);
      
          console.log('User registered:', data);
    } catch (error) {
      console.error(error);
    //   alert(error.message || "Failed to register.");
    showToast({message:error.message, type:"error"})
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-scroll">
      <div className="bg-white w-full max-w-md rounded-xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <button
            onClick={() => setIsSignUpOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="name" onChange={handleChange} value={formData.name} type="text" placeholder="Full name" className="w-full px-4 py-2 rounded-lg bg-gray-50" required />
          <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email" className="w-full px-4 py-2 rounded-lg bg-gray-50" required />
          <div className="flex">
            <select className="px-3 py-2 rounded-l-lg bg-gray-50 text-gray-500" disabled><option>+91</option></select>
            <input name="phone" onChange={handleChange} value={formData.phone} type="tel" placeholder="Phone number" className="w-full px-4 py-2 rounded-r-lg bg-gray-50" required />
          </div>
          <textarea name="address" onChange={handleChange} value={formData.address} placeholder="Complete address" className="w-full px-4 py-2 rounded-lg bg-gray-50 resize-none h-8" required></textarea>
<div className="relative">
        <input
          name="password"
          onChange={handleChange}
          value={formData.password}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-gray-50 pr-10"
          required
        />
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="relative">
        <input
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          className="w-full px-4 py-2 rounded-lg bg-gray-50 pr-10"
          required
        />
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>          <div className="flex items-center">
            <input type="checkbox" className="rounded text-[#2C5530]" required />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <a href="#" className="text-[#2C5530]">Terms</a> and <a href="#" className="text-[#2C5530]">Privacy Policy</a>
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C5530] text-white py-3 rounded-lg font-medium"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
