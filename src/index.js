import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// Don't worry about this page, it only gets root calls App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
