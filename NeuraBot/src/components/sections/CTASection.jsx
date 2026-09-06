import botlogo from "../../../../imgs/logoo.png";

export default function CTASection() {
  return (
    <section
      className="cta-section"
      style={{
        padding: "80px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .cta-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .cta-section {
            padding: 60px 20px !important;
          }
          .cta-buttons .btn-primary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(63,216,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(63,216,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(63,216,255,0.03) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-block", animation: "float 4s ease-in-out infinite", marginBottom: 32 }}>
          <img
            src={botlogo}
            alt="Mascote Neura Bot"
            style={{ width: 100, filter: "drop-shadow(0 0 30px rgba(63,216,255,0.4))" }}
          />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px,4vw,46px)",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Pronto para decolar?
        </h2>

        <p
          style={{
            color: "var(--text-dim)",
            fontSize: 16,
            marginBottom: 40,
            maxWidth: 500,
            margin: "0 auto 40px",
          }}
        >
          Junte-se a mais de 3.700 servidores que já transformaram sua experiência no Discord.
        </p>

        <div className="cta-buttons">
          <button
            className="btn-primary"
            style={{ fontSize: 14, padding: "14px 36px" }}
            onClick={() => window.open("https://discord.gg/mxGBvZQEZf", "_blank")}
          >
            Entrar no Discord
          </button>
        </div>
      </div>
    </section>
  );
}
