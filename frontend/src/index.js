import React from 'react';
import ReactDOM from 'react-dom/client';  // Importar 'client' desde 'react-dom'
import App from './App';
import './index.css';

// Se crea un root y se pasa al div con el id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
