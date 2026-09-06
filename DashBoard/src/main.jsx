// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LogProvider } from './context/LogContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LogProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LogProvider>
    </AuthProvider>
  </StrictMode>
);
