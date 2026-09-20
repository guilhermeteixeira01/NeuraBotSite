import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanline from "./components/ui/Scanline";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";

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
        background: "#0b0c0f",
        color: "#f1f1f1",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflowX: "hidden",
      }}>
        <Scanline />
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
