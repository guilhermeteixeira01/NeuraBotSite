import SectionLabel from "../ui/SectionLabel";
import { FEATURES } from "../../data/site";
import { Icon } from "../../components/ui/Icons";

export default function FeaturesSection() {
  return (
    <section
      id="recursos"
      style={{
        padding: "80px 40px",
        background: "rgba(11,14,23,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .features-grid {
            grid-template-columns: 1fr !important;
          }
          #recursos {
            padding: 60px 20px !important;
          }
        }
        .feature-card:hover {
          border-color: color-mix(in srgb, var(--fc, var(--cyan)) 55%, transparent) !important;
          box-shadow: 0 12px 40px color-mix(in srgb, var(--fc, var(--cyan)) 12%, transparent) !important;
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: -200,
          top: "50%",
          transform: "translateY(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,123,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -200,
          top: "20%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(63,216,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <SectionLabel text="Tecnologia" color="var(--violet)" />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px,4vw,42px)",
              fontWeight: 600,
            }}
          >
            Infraestrutura de nível enterprise
          </h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature: f }) {
  return (
    <div
      className="panel bracket feature-card"
      style={{
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
        "--fc": f.color,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `color-mix(in srgb, ${f.color} 12%, transparent)`,
          marginBottom: 16,
        }}
      >
        <Icon name={f.icon} size={22} color={f.color} strokeWidth={1.6} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 500,
          color: f.color,
          marginBottom: 10,
        }}
      >
        {f.title}
      </h3>
      <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
    </div>
  );
}
