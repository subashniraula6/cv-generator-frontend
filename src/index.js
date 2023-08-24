import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { FirebaseProvider } from './context/Firebase'
import { LanguageProvider } from './context/Language'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
