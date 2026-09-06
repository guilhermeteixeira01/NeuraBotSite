export default function NotFoundPage() {
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Sora:wght@300;400;600;700&display=swap');

        .nf-body {
          background: #07070f;
          color: #fff;
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
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
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
          background: radial-gradient(circle, #00d4ff18, transparent 70%);
          top: -100px;
          left: -100px;
        }

        .nf-glow-orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #0088ff12, transparent 70%);
          bottom: -60px;
          right: -60px;
        }

        .nf-scan-line {
          position: fixed;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff33, transparent);
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
          border-bottom: 1px solid #00d4ff0f;
        }

        .nf-nav-logo {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 20px;
          letter-spacing: 2px;
          color: #fff;
          text-decoration: none;
        }

        .nf-nav-logo span { color: #00d4ff; }

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
          background: #00d4ff0d;
          border: 1px solid #00d4ff22;
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #00d4ff;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .nf-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00d4ff;
          animation: nfBlink 1.4s ease-in-out infinite;
          display: inline-block;
        }

        .nf-code {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: clamp(100px, 20vw, 180px);
          line-height: 1;
          letter-spacing: -4px;
          background: linear-gradient(135deg, #00d4ff, #0088ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }

        .nf-code::after {
          content: '404';
          position: absolute;
          inset: 0;
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: inherit;
          line-height: 1;
          letter-spacing: -4px;
          -webkit-text-fill-color: transparent;
          background: linear-gradient(135deg, #00d4ff22, #0088ff11);
          -webkit-background-clip: text;
          background-clip: text;
          filter: blur(20px);
          z-index: -1;
          transform: translateY(8px);
        }

        .nf-title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 5vw, 36px);
          color: #fff;
          margin: 16px 0 12px;
          letter-spacing: 1px;
        }

        .nf-desc {
          font-size: 15px;
          color: #8888aa;
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
          background: linear-gradient(135deg, #00d4ff, #0088ff);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Sora', sans-serif;
          transition: all 0.2s;
          letter-spacing: 0.5px;
          text-decoration: none;
          text-align: center;
        }

        .nf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px #00d4ff44;
        }

        .nf-footer {
          position: relative;
          z-index: 2;
          padding: 20px 40px;
          border-top: 1px solid #00d4ff0f;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .nf-footer-copy { font-size: 12px; color: #444466; }

        .nf-footer-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #444466;
        }

        .nf-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00ff88;
        }

        @keyframes nfGridFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nfScan { 0% { top: -10%; } 100% { top: 110%; } }
        @keyframes nfFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        @keyframes nfBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

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

                        <h1 className="nf-title">Oops! Rota desconhecida</h1>
                        <p className="nf-desc">
                            A página que você está procurando não existe, foi movida ou está
                            temporariamente indisponível. Verifique o endereço ou volte para o início.
                        </p>

                        <div className="nf-buttons">
                            <a href="/DashBoard/" className="nf-btn-primary">
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