import { render } from 'preact';
import './index.css';
import App from './app.jsx';
import { CartProvider } from './components/CartContext.jsx';
import { UserProvider } from './components/userContext.jsx';
import { ToastProvider } from './components/ToastContext';

render(
    <ToastProvider>
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>
  </ToastProvider>,
  document.getElementById('app')
);
