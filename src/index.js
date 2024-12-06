import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/form.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the entire app with AuthProvider to enable global authentication state */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// Optional: Measure app performance (e.g., with Google Analytics)
reportWebVitals();
