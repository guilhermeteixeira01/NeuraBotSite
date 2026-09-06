import { STATS } from "../../data/site";
import { Icon } from "../ui/Icons";

export default function StatsBar() {
  return (
    <div
      style={{
        background: "rgba(11,14,23,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "28px 40px",
      }}
    >
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .stats-item {
          text-align: center;
          padding: 16px;
          border-radius: 8px;
          background: rgba(63,216,255,0.02);
          border: 1px solid var(--line);
          transition: border-color 0.25s, background 0.25s;
        }
        .stats-item:hover {
          border-color: var(--cyan-soft);
          background: rgba(63,216,255,0.05);
        }
        @media (max-width: 700px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
        }
        @media (max-width: 360px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stats-item bracket">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <Icon name={s.icon} size={22} color="var(--cyan)" strokeWidth={1.5} />
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 22,
                color: "var(--cyan)",
                marginTop: 6,
                textShadow: "0 0 20px rgba(63,216,255,0.35)",
              }}
            >
              {s.value}
            </div>
            <div style={{ color: "var(--text-faint)", fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
