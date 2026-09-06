import { useEffect, useRef, useState } from "react";

/**
 * Envolve uma seção da landing page para dar dois efeitos:
 *
 * 1) Entrada 3D — na primeira vez que a seção entra na tela, ela gira e
 *    sobe de um leve ângulo em perspectiva até se acomodar (IntersectionObserver,
 *    dispara uma vez só).
 *
 * 2) Empilhamento — a seção fica "grudada" (position: sticky) no topo da tela.
 *    Quando a próxima seção começa a subir por cima dela, ela reduz levemente
 *    de escala e escurece, como se estivesse ficando para trás na pilha.
 *    Isso é feito com scroll + requestAnimationFrame, sem nenhuma lib externa.
 */
export default function StackSection({ children, zIndex = 1, plain = false }) {
  const sectionRef = useRef(null);
  const scaleRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // Entrada 3D (uma vez)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Empilhamento contínuo ligado ao scroll
  useEffect(() => {
    let raf = null;

    function measure() {
      const el = sectionRef.current;
      const inner = scaleRef.current;
      if (!el || !inner) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 = ainda não está sendo coberta · 1 = totalmente coberta pela próxima
      const covered = Math.min(Math.max(-rect.top / vh, 0), 1);
      inner.style.transform = `scale(${1 - covered * 0.055})`;
      inner.style.filter = `brightness(${1 - covered * 0.3})`;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        measure();
        raf = null;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sectionRef} className="stack-section" style={{ zIndex }}>
      <div className={`stack-reveal${revealed ? " is-in" : ""}`}>
        <div
          ref={scaleRef}
          className={`stack-scale${plain ? " stack-scale-plain" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
