import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Point d'entrée principal de l'application React.
 * Initialise la racine du DOM et rend le composant App.
 */
createRoot(document.getElementById('root')).render(<App />);
