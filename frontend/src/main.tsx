import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Remove initial HTML loader upon React application initialization
const initialLoader = document.getElementById('loader');
if (initialLoader) {
  initialLoader.style.opacity = '0';
  setTimeout(() => {
    initialLoader.remove();
  }, 300);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);