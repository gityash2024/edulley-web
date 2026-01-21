import React, { createContext, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [state, setState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Only check session for logged-in users
    const checkSession = () => {
      const user = localStorage.getItem('_u');
      if (!user) {
        return; // Skip session check for non-logged in users
      }

      const lastSessionTime = localStorage.getItem('lastSessionTime');
      const currentTime = new Date().getTime();

      if (!lastSessionTime) {
        // First time visit, just set the timestamp
        localStorage.setItem('lastSessionTime', currentTime.toString());
      } else if (currentTime - parseInt(lastSessionTime) > 24 * 60 * 60 * 1000) {
        // Session expired - clear only user data
        localStorage.removeItem('_u');
        localStorage.setItem('lastSessionTime', currentTime.toString());
        navigate('/');
        window.location.reload();
      } else {
        // Update session time
        localStorage.setItem('lastSessionTime', currentTime.toString());
      }
    };

    // Delay initial check to let navigation complete
    setTimeout(checkSession, 500);
    
    const intervalId = setInterval(checkSession, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="269522874549-btcak5miha8v8c8u4v2jqbtladiqh98g.apps.googleusercontent.com">
    <BrowserRouter>
      <HelmetProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </HelmetProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

export { AppContext };