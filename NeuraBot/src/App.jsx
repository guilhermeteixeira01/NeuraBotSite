import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanline from "./components/ui/Scanline";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState, useCallback } from 'react';
import { useDevToolsBlocker } from './hooks/useDevToolsBlocker';
import BlockScreen from './components/ui/BlockScreen';

function MainLayout() {

  return (
    <>
      <Navbar />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default function App() {

  const [blocked, setBlocked] = useState(false);

  const handleOpen = useCallback(() => setBlocked(true), []);
  const handleClose = useCallback(() => setBlocked(false), []);

  useDevToolsBlocker({ onOpen: handleOpen, onClose: handleClose });

  // Enquanto DevTools estiver aberto, mostra tela de bloqueio
  if (blocked) return <BlockScreen />;

  return (
    <BrowserRouter basename="/">
      <div style={{
        background: "#05060a",
        color: "#eef2f8",
        minHeight: "100vh",
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        overflowX: "hidden",
      }}>
        <Scanline />
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
