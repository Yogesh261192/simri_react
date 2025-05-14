// app/layout.js

import { CartProvider } from '../components/CartContext';
import { ToastProvider } from '../components/ToastContext';
import { UserProvider } from '../components/userContext';
import '../src/app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
        <UserProvider>
        <CartProvider>
          {children}
        </CartProvider>
        </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
