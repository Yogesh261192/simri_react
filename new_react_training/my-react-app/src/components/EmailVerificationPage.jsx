// EmailVerificationPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwriteConfig';

import { useUser } from './userContext';

// Adjust if your context is in a different file



export default function EmailVerificationPage() {
  const [message, setMessage] = useState('Verifying...');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Or use setIsSignedIn(true)
//   const account = new Account(client);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get('secret');
    const userId = urlParams.get('userId');

    if (secret && userId) {
      account.updateVerification(userId, secret)
        .then(async () => {
          const user = await account.get(); // fetch user details
          setUser(user); // set user context
          setMessage('✅ Email verified!');
          setTimeout(() => {
            navigate('/'); // redirect to homepage
          }, 1500);
        })
        .catch((err) => {
          console.error('Verification failed:', err);
          setMessage('❌ Email verification failed.');
        });
    } else {
      setMessage('Invalid verification link.');
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-semibold">{message}</h1>
    </div>
  );
}
