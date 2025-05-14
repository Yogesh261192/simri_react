// app/layout.js

import { CartProvider } from '../components/CartContext';
import { ToastProvider } from '../components/ToastContext';
import { UserProvider } from '../components/userContext';
import '../src/app/globals.css'

export const metadata = {
  title: 'SIMDI',
  description: 'E-commerce for Himalayas and ride facilty for driving and NGO',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
