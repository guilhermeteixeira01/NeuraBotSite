import { useEffect, useRef } from "react";

/**
 * Faz uma section "empilhar" sobre a anterior ao rolar a página:
 * - Enquanto a section ainda está entrando (abaixo da viewport), ela
 *   desliza e inclina levemente em 3D até ficar "flat" no topo.
 * - Depois que a próxima section começa a cobri-la, ela encolhe, ganha
 *   cantos arredondados e escurece um pouco — como um cartão empurrado
 *   para trás na pilha.
 *
 * Tudo calculado a partir de getBoundingClientRect() dentro de um loop de
 * requestAnimationFrame (sem re-render do React a cada scroll).
 */
export function useStackReveal() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let rafId = null;

    function clamp01(n) {
      return Math.min(1, Math.max(0, n));
    }

    function update() {
      const wrap = wrapRef.current;
      const card = cardRef.current;
      if (wrap && card) {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        if (rect.top > 0) {
          // fase de entrada: ainda deslizando para o lugar
          const entry = clamp01(1 - rect.top / vh);
          const rotate = (1 - entry) * 6;
          const translate = (1 - entry) * 50;
          card.style.transform = `perspective(1400px) rotateX(${rotate.toFixed(2)}deg) translateY(${translate.toFixed(1)}px) scale(1)`;
          card.style.borderRadius = "0px";
          card.style.filter = `brightness(${(0.85 + entry * 0.15).toFixed(3)})`;
        } else {
          // fase de saída: sendo coberta pela próxima section
          const cover = clamp01(-rect.top / vh);
          const scale = 1 - cover * 0.08;
          const rotate = cover * -6;
          const translate = cover * -30;
          card.style.transform = `perspective(1400px) rotateX(${rotate.toFixed(2)}deg) translateY(${translate.toFixed(1)}px) scale(${scale.toFixed(3)})`;
          card.style.borderRadius = `${(cover * 28).toFixed(1)}px`;
          card.style.filter = `brightness(${(1 - cover * 0.35).toFixed(3)})`;
        }
      }
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return { wrapRef, cardRef };
}
