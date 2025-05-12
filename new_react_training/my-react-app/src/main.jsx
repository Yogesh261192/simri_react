import { render } from 'preact';
import './index.css';
import App from './app.jsx';
import { CartProvider } from './components/CartContext.jsx';
import { UserProvider } from './components/userContext.jsx';

render(
  <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UserProvider>,
  document.getElementById('app')
);
