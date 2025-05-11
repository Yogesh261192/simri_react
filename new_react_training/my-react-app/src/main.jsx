import { render } from 'preact'
import './index.css'
import  App  from './app.jsx'
import './index.css';
import { CartProvider } from './components/CartContext.jsx';


render(<CartProvider>
    <App />
    </CartProvider>
    
    , document.getElementById('app'))
