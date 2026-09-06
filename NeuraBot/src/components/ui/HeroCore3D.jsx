import { useRef, useEffect } from "react";

/**
 * Núcleo 3D interativo construído só com transforms CSS reais (preserve-3d),
 * sem dependência de three.js. Três anéis em planos diferentes formam uma
 * espécie de giroscópio; o conjunto inclina de acordo com a posição do mouse
 * NA PÁGINA INTEIRA (não só quando o cursor está em cima dele) e gira sozinho
 * continuamente.
 */
export default function HeroCore3D({ image, imageAlt = "" }) {
  const rigRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      target.current = { x: py * -18, y: px * 30 };
    }

    function handleLeave() {
      target.current = { x: 0, y: 0 };
    }

    function tick() {
      // easing suave até o valor alvo, pra não "travar" no ponto do mouse
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;

      if (rigRef.current) {
        rigRef.current.style.transform =
          `rotateX(${current.current.x.toFixed(2)}deg) rotateY(${current.current.y.toFixed(2)}deg)`;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="core3d-scene">
      <style>{`
        .core3d-scene {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1;
          margin: 0 auto;
          perspective: 1200px;
        }
        .core3d-rig {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .core3d-autospin {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          animation: coreDrift 16s linear infinite;
        }
        .core3d-ring {
          position: absolute;
          inset: 6%;
          border-radius: 50%;
          border: 1px solid var(--cyan-soft);
          transform-style: preserve-3d;
        }
        .core3d-ring.r1 { transform: rotateX(72deg); border-color: rgba(63,216,255,0.55); }
        .core3d-ring.r2 { transform: rotateX(20deg) rotateY(60deg); border-color: rgba(139,123,255,0.4); }
        .core3d-ring.r3 { inset: 16%; transform: rotateX(50deg) rotateY(-40deg); border-color: rgba(63,216,255,0.25); }

        .core3d-node {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 10px 2px var(--cyan-soft);
        }

        .core3d-core {
          position: absolute;
          inset: 30%;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 32%, rgba(63,216,255,0.16), rgba(5,6,10,0.9) 70%);
          border: 1px solid var(--line-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          box-shadow: 0 0 60px rgba(63,216,255,0.15), inset 0 0 30px rgba(0,0,0,0.5);
        }
        .core3d-core img {
          position: absolute;
          width: 120%;
          height: 120%;
          left: -20px;
          object-fit: contain;
          filter: drop-shadow(0 0 20px rgba(63,216,255,0.45));
          animation: float 5s ease-in-out infinite;
        }

        @keyframes coreDrift {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @media (max-width: 768px) {
          .core3d-scene { max-width: 240px; }
          .core3d-core img { width: 130%; height: 140%; left: -18px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .core3d-autospin { animation: none; }
        }
      `}</style>

      <div ref={rigRef} className="core3d-rig">
        <div className="core3d-autospin">
          <div className="core3d-ring r1" />
          <div className="core3d-ring r2" />
          <div className="core3d-ring r3" />
          <div className="core3d-node" style={{ top: "6%", left: "50%" }} />
          <div className="core3d-node" style={{ bottom: "8%", right: "18%" }} />
          <div className="core3d-node" style={{ top: "40%", left: "4%" }} />
        </div>
        <div className="core3d-core">
          {image && <img src={image} alt={imageAlt} />}
        </div>
      </div>
    </div>
  );
}
