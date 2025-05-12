// components/OtpModal.jsx
import React from 'react';
import { useState } from 'react';
import { account,ID  } from '../appwriteConfig';

const OtpModal = ({ setIsOtpOpen, otpValues, setOtpValues, userId, setUser}) => {
    console.log(userId);
    async function handleSubmit(e) {
        e.preventDefault();
        const otp = otpValues.join('');
      
        try {
            // await account.deleteSession('current');
          const response = await account.updateVerification(userId, otp);
          console.log('OTP verified:', response);
          const user = await account.get();
          setUser(user)
          // maybe set session or redirect here
        } catch (err) {
          console.error('Failed to verify OTP:', err);
          alert('Invalid OTP');
        }
      }
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Phone Verification</h2>
          <button
            onClick={() => setIsOtpOpen(false)}
            className="!rounded-button whitespace-nowrap cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-600">We have sent a verification code to your phone number</p>
          <p className="text-gray-800 font-medium mt-2">+91 ●●●● ●●●● 89</p>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Enter 6-digit OTP</label>
            <div className="flex justify-between gap-2">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  name={`otp-${index}`}
                  className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-[#2C5530]"
                  onChange={(e) => {
                    const newOtp = [...otpValues];
                    newOtp[index] = e.target.value;
                    setOtpValues(newOtp);
                    if (e.target.value && index < 5) {
                      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !value && index > 0) {
                      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              Didn't receive the code?{" "}
              <button type="button" className="text-[#2C5530] font-medium">Resend OTP</button>
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <i className="fas fa-clock mr-2"></i>
              <span>Time remaining: 02:59</span>
            </div>
          </div>
          <button type="button" onClick={handleSubmit} className="!rounded-button whitespace-nowrap cursor-pointer w-full bg-[#2C5530] hover:bg-[#2C5530]/90 text-white py-3 rounded-lg font-medium">
            Verify & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
