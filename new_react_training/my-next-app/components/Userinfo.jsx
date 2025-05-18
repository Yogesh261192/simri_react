import { useState, useRef, useEffect } from 'react';
import { useUser } from './userContext';
import { account } from '../appwriteConfig';

export default function UserButton({ setIsSignInOpen }) {
  const { user, setUser } = useUser(); // assumes you're using a UserContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null); // Clear user in context
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="relative " ref={dropdownRef} >
      <button
        className="text-gray-600 hover:text-[#2C5530] flex cursor-pointer"
        onClick={() => {
          if (user) {
            setIsDropdownOpen(prev => !prev);
          } else {
            setIsSignInOpen(true);
          }
        }}
      >
        <i className="fas fa-user-circle text-xl"></i>
        <p className='ml-2 pt-[1px]'>{user ? user.name : 'Sign-in'}</p>
      </button>

      {user && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
