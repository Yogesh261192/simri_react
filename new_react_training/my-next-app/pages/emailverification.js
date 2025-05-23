// EmailVerificationPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../appwriteConfig';
import { useUser } from '../components/userContext';
// import { useRedirect } from "./Common";
import { useRedirect } from '../components/Common';
import CryptoJS from 'crypto-js';
export default function EmailVerificationPage() {
   const redirect = useRedirect();
  const [message, setMessage] = useState('Verifying...');
  const { user, setUser } = useUser(); 
  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  if (userId) {
    const decryptAndLogin = async () => {
      try {
        const decoded = decodeURIComponent(userId);
        const bytes = CryptoJS.AES.decrypt(decoded, '68302e19-9978-8000-aa2b-cfbe05cbe42f');
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
         const user = await account.get();
        console.log(user, 'decypted')
        if(user){
          await account.deleteSession('current');
        }
        await account.createEmailPasswordSession(decrypted.id, decrypted.password);
        const currentUser = await account.get();
        setUser(currentUser);
        setMessage('✅ Email verified!');
        sendVerify(decrypted.id);
        // setTimeout(() => redirect('/'), 1500);
      } catch (error) {
        console.error("Verification failed", error);
        setMessage('Verification failed.');
        // setTimeout(() => redirect('/'), 1500);
      }
    };
    const sendVerify= async(email)=>{
      let response = await fetch("https://simdi.in/authenticate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 🔥 This is essential
        },
        body: JSON.stringify({
              email: email,
            })
      });
    }

    decryptAndLogin();
  } else {
    setMessage('Invalid verification link.');
    // setTimeout(() => redirect('/'), 1500);
  }
}, []);


  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-xl font-semibold">{message}</h1>
    </div>
  );
}
