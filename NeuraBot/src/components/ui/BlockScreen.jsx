export default function BlockScreen() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#05060a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#eef2f8',
            fontFamily: "'Sora', sans-serif",
            userSelect: 'none',
            textAlign: 'center',
            padding: 24,
        }}>
            <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: '#f5a623',
                letterSpacing: 1,
                marginBottom: 20,
                border: '1px solid #f5a62344',
                borderRadius: 4,
                padding: '6px 14px',
            }}>
                ACESSO SUSPENSO
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 600, margin: '0 0 8px' }}>
                Ferramentas de desenvolvedor detectadas
            </h1>
            <p style={{ fontSize: 14, color: '#6b7690', margin: 0, maxWidth: 340, lineHeight: 1.7 }}>
                Feche o DevTools para voltar a usar o Neura Bot.
            </p>
        </div>
    );
}
