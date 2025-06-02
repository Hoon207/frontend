import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertContextProvider } from './AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertContextProvider>
    <App />
  </AlertContextProvider>
);
