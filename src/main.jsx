import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename={import.meta.env.MODE === 'production' ? '/UniSport' : '/'}>
    <App />
  </HashRouter>
);