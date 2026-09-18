// src/hooks/useDevToolsBlocker.js
import { useEffect, useRef } from 'react';

// Diferença de pixels entre outerWidth/innerWidth (ou altura) que indica
// um painel de DevTools ancorado (docked) aberto dentro da própria janela.
const SIZE_THRESHOLD = 160;

/**
 * Bloqueia os atalhos de teclado que abrem o DevTools (F12, Ctrl+Shift+I,
 * Ctrl+Shift+J, Ctrl+Shift+C — e os equivalentes com Cmd no Mac) e, como
 * reforço, detecta quando o DevTools está aberto ancorado na janela (ex.:
 * aberto pelo menu do navegador em vez de atalho) pra chamar onOpen/onClose.
 *
 * Limitações honestas: preventDefault no keydown não impede 100% dos
 * navegadores/atalhos, e DevTools aberto em janela separada (undocked) não
 * altera outerWidth/innerWidth — não existe bloqueio nem detecção 100%
 * confiável de DevTools via JavaScript puro.
 */
export function useDevToolsBlocker({ onOpen, onClose, intervalMs = 1000 } = {}) {
  const isOpenRef = useRef(false);

  // ── Bloqueio de atalhos de teclado ──
  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key?.toLowerCase();

      // F12
      if (key === 'f12') {
        e.preventDefault();
        return;
      }

      // Ctrl/Cmd + Shift + I / J / C  (Elements, Console, seletor de elemento)
      const ctrlOrCmd = e.ctrlKey || e.metaKey;
      if (ctrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
        e.preventDefault();
        return;
      }

      // Ctrl/Cmd + U (ver código-fonte)
      if (ctrlOrCmd && key === 'u') {
        e.preventDefault();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Bloqueio do menu de botão direito ──
  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault();
    }

    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  // ── Detecção por tamanho de janela (fallback pra abrir pelo menu) ──
  useEffect(() => {
    function check() {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const isOpen = widthDiff > SIZE_THRESHOLD || heightDiff > SIZE_THRESHOLD;

      if (isOpen && !isOpenRef.current) {
        isOpenRef.current = true;
        onOpen?.();
      } else if (!isOpen && isOpenRef.current) {
        isOpenRef.current = false;
        onClose?.();
      }
    }

    check();
    const interval = setInterval(check, intervalMs);
    window.addEventListener('resize', check);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', check);
    };
  }, [onOpen, onClose, intervalMs]);
}