import ParticleField from "../ui/ParticleField";
import HeroCore3D from "../ui/HeroCore3D";
import { STATS } from "../../data/site";

export default function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }
        .hero-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 44px;
          flex-wrap: wrap;
        }
        .hero-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-copy {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-core-wrap {
            order: -1;
          }
          .hero-buttons {
            justify-content: center;
            width: 100%;
          }
          .hero-buttons .btn-primary,
          .hero-buttons .btn-outline {
            width: 100%;
            max-width: 320px;
            text-align: center;
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
            gap: 28px;
          }
          .hero-desc {
            max-width: 100% !important;
            margin-bottom: 32px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-inner {
            padding: 100px 20px 60px !important;
          }
        }
      `}</style>

      <ParticleField />

      {/* Grid background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(63,216,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(63,216,255,0.05) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "grid-fade 1s forwards",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "45%",
          left: "62%",
          transform: "translate(-50%,-50%)",
          width: 760,
          height: 760,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(63,216,255,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 40px 80px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="hero-grid">
          {/* Left: copy */}
          <div className="hero-copy" style={{ animation: "fadeUp 0.8s ease both" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                background: "rgba(63,216,255,0.06)",
                border: "1px solid var(--line-strong)",
                borderRadius: 4,
                padding: "6px 14px",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--green)",
                  animation: "blink 1.6s infinite",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--text-dim)", fontSize: 12 }}>
                sistema online · 99.9% uptime
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(32px, 4.6vw, 58px)",
                lineHeight: 1.12,
                color: "var(--text)",
                marginBottom: 22,
                width: "100%",
              }}
            >
              Automação de Discord com{" "}
              <span style={{ color: "var(--cyan)" }}>infraestrutura de verdade</span>
            </h1>

            <p
              className="hero-desc"
              style={{
                color: "var(--text-dim)",
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 36,
                maxWidth: 480,
              }}
            >
              Uma suíte completa de bots para o seu servidor: segurança, música,
              engajamento e automação em um único painel de controle.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => document.getElementById("bots")?.scrollIntoView({ behavior: "smooth" })}>
                Ver os bots
              </button>
              <button className="btn-outline" onClick={() => window.open("/DOCS/documentacao_neura_bot.html", "_blank")}>
                Documentação
              </button>
            </div>

            <div className="hero-stats">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 20, color: "var(--cyan)" }}>
                    {s.value}
                  </div>
                  <div style={{ color: "var(--text-faint)", fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D core */}
          <div className="hero-core-wrap" style={{ animation: "fadeUp 0.8s 0.2s ease both" }}>
            <HeroCore3D />
          </div>
        </div>
      </div>
    </section>
  );
}