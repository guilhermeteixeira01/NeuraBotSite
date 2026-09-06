import { Icon } from "./Icons";

export default function BotCard({ bot, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={active ? "bracket" : ""}
      style={{
        background: active ? `${bot.color}0d` : "var(--panel-2)",
        border: `1px solid ${active ? bot.color : "var(--line)"}`,
        borderRadius: 10,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: active ? "translateY(-3px)" : "none",
        boxShadow: active ? `0 8px 36px ${bot.glow}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: `${bot.color}18`,
            border: `1px solid ${bot.color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon name={bot.icon} size={20} color={bot.color} strokeWidth={1.6} />
        </div>
        <div>
          <div
            style={{
              color: "var(--text)",
              fontWeight: 600,
              fontSize: 15,
              fontFamily: "var(--font-display)",
            }}
          >
            {bot.name}
          </div>
          <div
            style={{
              display: "inline-block",
              color: bot.color,
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginTop: 3,
              opacity: 0.85,
            }}
          >
            {bot.tag}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
        {bot.desc}
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
        {bot.stats.map((s) => (
          <div key={s.label} style={{ flex: 1 }}>
            <div
              style={{
                color: bot.color,
                fontWeight: 600,
                fontSize: 15,
                fontFamily: "var(--font-mono)",
              }}
            >
              {s.value}
            </div>
            <div style={{ color: "var(--text-faint)", fontSize: 10, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
