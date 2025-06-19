import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // make sure this includes Tailwind directives
import Auth from './components/Auth'; // adjust path if your Auth.jsx is in a different folder

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <Auth />
    </div>
  </React.StrictMode>
);
