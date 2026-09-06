import { useState } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import { NAV_LINKS } from "../../data/site";
import logoname2 from "../../../../imgs/logoname2.png";

export default function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 50;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled || menuOpen
          ? "rgba(5,6,10,0.88)"
          : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        padding: "0 40px",
        transition: "all 0.3s",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .nav-inner { padding: 0 20px !important; }
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>

      <div
        className="nav-inner"
        style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logoname2} alt="Neura Bot Logo" style={{ width: '6rem' }} />
        </div>

        {/* Desktop links + CTA */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <button
            className="btn-outline"
            style={{ padding: "9px 18px", fontSize: 12 }}
            onClick={() => {
              const url = import.meta.env.DEV
                ? "http://localhost:5175/"
                : "https://neurabot.com.br/GeradorEmbed/"
              window.open(url, "_blank")
            }}
          >
            Gerar Embed
          </button>
          <button
            className="btn-primary"
            style={{ padding: "9px 18px", fontSize: 12 }}
            onClick={() => {
              const url = import.meta.env.DEV
                ? "http://localhost:5174/"
                : "https://neurabot.com.br/DashBoard/"
              window.open(url, "_blank")
            }}
          >
            Dashboard
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Menu"
        >
          <span style={{ width: 22, height: 2, background: menuOpen ? "var(--cyan)" : "var(--text)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 22, height: 2, background: "var(--text)", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 22, height: 2, background: menuOpen ? "var(--cyan)" : "var(--text)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="nav-mobile-menu"
        style={{
          display: "none",
          flexDirection: "column",
          gap: 4,
          padding: menuOpen ? "16px 20px 24px" : "0 20px",
          maxHeight: menuOpen ? 400 : 0,
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: 15, padding: "10px 0", borderBottom: "1px solid var(--line)" }}
          >
            {link.label}
          </a>
        ))}
        <button
          className="btn-outline"
          style={{ marginTop: 12, padding: "12px", fontSize: 13, width: "100%" }}
          onClick={() => {
            const url = import.meta.env.DEV
              ? "http://localhost:5175/"
              : "https://neurabot.com.br/GeradorEmbed/"
            window.open(url, "_blank")
          }}
        >
          Gerar Embed
        </button>
        <button
          className="btn-primary"
          style={{ marginTop: 12, padding: "12px", fontSize: 13, width: "100%" }}
          onClick={() => {
            const url = import.meta.env.DEV
              ? "http://localhost:5174/"
              : "https://neurabot.com.br/DashBoard/"
            window.open(url, "_blank")
          }}
        >
          Ir para o Dashboard
        </button>
      </div>
    </nav>
  );
}
