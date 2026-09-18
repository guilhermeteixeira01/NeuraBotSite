// src/components/ui/BlockScreen.jsx
export default function BlockScreen() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 24,
        textAlign: 'center',
        background: 'var(--bg1, #0a0a0f)',
        color: 'var(--text1, #fff)',
      }}
    >
      <div style={{ fontSize: 40 }}>🔒</div>
      <h1 style={{ fontSize: 20, margin: 0 }}>
        Ferramentas de desenvolvedor detectadas
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text3, #9a9aab)', maxWidth: 380, margin: 0 }}>
        Feche o DevTools do navegador para continuar usando o dashboard.
      </p>
    </div>
  );
}
