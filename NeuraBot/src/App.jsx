import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scanline from "./components/ui/Scanline";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";

function MainLayout() {
  console.log(
    "%cPARE SEU SAFADO !",
    "color: #ffcc00; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
  );

  console.log(
    "%cEsta é uma funcionalidade do navegador destinada a desenvolvedores. Se alguém te disse para copiar e colar algo aqui para ativar um recurso ou 'hackear' a conta de alguém, isso é uma fraude e pode dar a essa pessoa acesso à sua conta.",
    "color: #ff3333; font-size: 16px; font-weight: bold;"
  );

  console.log(
    "%cNunca cole código aqui que você não entende completamente.",
    "color: #ffffff; background: #cc0000; font-size: 14px; padding: 4px;"
  );
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
