import { useEffect, useRef } from 'react';

// Diferença de tamanho (px) que indica DevTools aberto na lateral
const THRESHOLD = 160;

/**
 * useDevToolsBlocker
 *
 * Técnicas combinadas:
 *  1. Detector de tamanho de janela (DevTools na lateral/embaixo)
 *  2. Trap via debugger statement (pausa = DevTools ativo)
 *  3. Bloqueio de atalhos: F12, Ctrl+Shift+I/J/C, Ctrl+U, Cmd equivalentes
 *  4. Bloqueio do menu de contexto (botão direito)
 *
 * @param {object} options
 * @param {function} options.onOpen  — chamado quando DevTools é detectado
 * @param {function} options.onClose — chamado quando DevTools é fechado
 */
export function useDevToolsBlocker({ onOpen, onClose } = {}) {
    const isOpen = useRef(false);

    useEffect(() => {
        // ── 1. Detector por tamanho de janela ──────────────────────────────────
        function checkSize() {
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            const opened = widthDiff > THRESHOLD || heightDiff > THRESHOLD;

            if (opened !== isOpen.current) {
                isOpen.current = opened;
                if (opened) onOpen?.();
                else onClose?.();
            }
        }

        // ── 2. Trap via debugger (se DevTools estiver aberto, há pausa > 100ms) ─
        function debuggerTrap() {
            const start = performance.now();
            // eslint-disable-next-line no-debugger
            debugger;
            const elapsed = performance.now() - start;
            if (elapsed > 100 && !isOpen.current) {
                isOpen.current = true;
                onOpen?.();
            }
        }

        // ── 3. Bloquear atalhos de teclado ─────────────────────────────────────
        function blockShortcuts(e) {
            const { key, ctrlKey, shiftKey, metaKey } = e;

            const blocked =
                key === 'F12' ||
                ((ctrlKey || metaKey) && shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(key)) ||
                ((ctrlKey || metaKey) && ['u', 'U'].includes(key));

            if (blocked) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }

        // ── 4. Bloquear menu de contexto (botão direito) ───────────────────────
        function blockContext(e) {
            e.preventDefault();
            return false;
        }

        // Inicia os intervalos
        const sizeInterval = setInterval(checkSize, 500);
        const debuggerInterval = setInterval(debuggerTrap, 3000);

        window.addEventListener('keydown', blockShortcuts, true);
        document.addEventListener('contextmenu', blockContext);

        return () => {
            clearInterval(sizeInterval);
            clearInterval(debuggerInterval);
            window.removeEventListener('keydown', blockShortcuts, true);
            document.removeEventListener('contextmenu', blockContext);
        };
    }, [onOpen, onClose]);
}