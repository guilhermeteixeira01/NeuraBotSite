export default function NotFoundPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@300;400;600;700&display=swap');

        .nf-body {
          background: #05060a;
          color: #eef2f8;
          font-family: 'Sora', 'Segoe UI', sans-serif;
          overflow-x: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .nf-grid-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(63,216,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(63,216,255,0.04) 1px, transparent 1px);
          background-size: 56px 56px;
          animation: nfGridFade 1.2s ease forwards;
        }

        .nf-glow-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .nf-glow-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #3fd8ff18, transparent 70%);
          top: -100px;
          left: -100px;
        }

        .nf-glow-orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #8b7bff14, transparent 70%);
          bottom: -60px;
          right: -60px;
        }

        .nf-scan-line {
          position: fixed;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3fd8ff33, transparent);
          z-index: 1;
          pointer-events: none;
          animation: nfScan 6s linear infinite;
        }

        .nf-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid #1b213033;
        }

        .nf-nav-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #eef2f8;
          text-decoration: none;
        }

        .nf-nav-logo span { color: #3fd8ff; }

        .nf-section {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .nf-inner {
          max-width: 640px;
          width: 100%;
          animation: nfFadeUp 0.7s ease both;
        }

        .nf-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #3fd8ff0d;
          border: 1px solid #3fd8ff22;
          border-radius: 4px;
          padding: 6px 14px;
          font-size: 12px;
          font-family: 'IBM Plex Mono', monospace;
          color: #3fd8ff;
          margin-bottom: 24px;
        }

        .nf-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3fd8ff;
          animation: nfBlink 1.4s ease-in-out infinite;
          display: inline-block;
        }

        .nf-code {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(90px, 18vw, 160px);
          line-height: 1;
          letter-spacing: -4px;
          background: linear-gradient(135deg, #3fd8ff, #1a8fd1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }

        .nf-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(20px, 4.5vw, 32px);
          color: #eef2f8;
          margin: 16px 0 12px;
        }

        .nf-desc {
          font-size: 15px;
          color: #6b7690;
          line-height: 1.8;
          margin-bottom: 36px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .nf-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3fd8ff, #1a8fd1);
          color: #04141c;
          border: none;
          border-radius: 4px;
          padding: 13px 28px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          transition: all 0.2s;
          text-decoration: none;
          text-align: center;
        }

        .nf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px #3fd8ff33;
        }

        .nf-footer {
          position: relative;
          z-index: 2;
          padding: 20px 40px;
          border-top: 1px solid #1b213033;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .nf-footer-copy { font-size: 12px; color: #3d4457; font-family: 'IBM Plex Mono', monospace; }

        .nf-footer-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #3d4457;
          font-family: 'IBM Plex Mono', monospace;
        }

        .nf-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #35e08a;
        }

        @keyframes nfGridFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nfScan { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes nfFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes nfBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

        @media (max-width: 768px) {
          .nf-nav { padding: 14px 20px; }
          .nf-footer { flex-direction: column; align-items: center; text-align: center; padding: 20px; }
          .nf-buttons { flex-direction: column; align-items: center; }
          .nf-btn-primary { width: 100%; max-width: 320px; justify-content: center; }
          .nf-glow-orb, .nf-grid-bg, .nf-scan-line { display: none !important; }
        }

        @media (hover: none) {
          .nf-btn-primary:hover { transform: none; box-shadow: none; }
        }
      `}</style>

      <div className="nf-body">
        <div className="nf-grid-bg" />
        <div className="nf-glow-orb nf-glow-orb-1" />
        <div className="nf-glow-orb nf-glow-orb-2" />
        <div className="nf-scan-line" />

        <nav className="nf-nav">
          <a href="/" className="nf-nav-logo">NEURA<span>BOT</span></a>
        </nav>

        <section className="nf-section">
          <div className="nf-inner">

            <div className="nf-badge">
              <span className="nf-badge-dot" />
              Página não encontrada
            </div>

            <div className="nf-code">404</div>

            <h1 className="nf-title">Rota desconhecida</h1>
            <p className="nf-desc">
              A página que você está procurando não existe, foi movida ou está
              temporariamente indisponível. Verifique o endereço ou volte para o início.
            </p>

            <div className="nf-buttons">
              <a href="/GerarEmbed/" className="nf-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12L12 3l9 9" />
                  <path d="M9 21V12h6v9" />
                </svg>
                Voltar ao início
              </a>
            </div>

          </div>
        </section>

        <footer className="nf-footer">
          <span className="nf-footer-copy">© 2025 Neurabot. Todos os direitos reservados.</span>
          <div className="nf-footer-status">
            <span className="nf-status-dot" />
            Todos os sistemas operacionais
          </div>
        </footer>
      </div>
    </>
  );
}
