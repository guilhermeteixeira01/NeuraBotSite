// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './gerarembed.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename="/GeradorEmbed/">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);