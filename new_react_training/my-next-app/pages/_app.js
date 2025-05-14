// pages/_app.js
import { CartProvider } from '../components/CartContext';
import { ToastProvider } from '../components/ToastContext';
import { UserProvider } from '../components/userContext';
import '../src/app/globals.css';
import List from './ist';

export default function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <UserProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </UserProvider>
    </ToastProvider>
  );
}
