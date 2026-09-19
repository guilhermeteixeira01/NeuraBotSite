import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanline from "./components/ui/Scanline";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useState, useCallback } from 'react';

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
