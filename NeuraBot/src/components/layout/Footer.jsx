import { FOOTER_COLS } from "../../data/site";
import logoname2 from "../../../../imgs/logoname2.png";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#040509",
        borderTop: "1px solid var(--line)",
        padding: "50px 40px 30px",
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-bottom {
          border-top: 1px solid var(--line);
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .footer-col-links {
          text-align: left;
        }

        @media (max-width: 768px) {
          footer {
            padding: 40px 24px 24px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px 20px !important;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }

        @media (max-width: 400px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-brand {
            grid-column: 1 !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid">
          <div className="footer-brand">
                <img src={logoname2} alt="Neura Bot Logo" style={{ width: '30%' }} />
            <p style={{ color: "var(--text-faint)", fontSize: 13, lineHeight: 1.8, maxWidth: 260 }}>
              A plataforma de bots Discord mais avançada do Brasil. Desenvolvido por{" "}
              <a href="https://github.com/guilhermeteixeira01" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>
                Guilherme Teixeira
              </a>
            </p>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="footer-col-links">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--text-faint)",
                  letterSpacing: 1.5,
                  marginBottom: 16,
                }}
              >
                {col.title}
              </div>
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="nav-link"
                  style={{ display: "block", marginBottom: 10, fontSize: 13 }}
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span style={{ color: "var(--text-faint)", fontSize: 12, fontFamily: "var(--font-mono)" }}>
            © 2025 Neura Bot
          </span>
          <span style={{ color: "var(--text-faint)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Hospedado no Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  );
}
