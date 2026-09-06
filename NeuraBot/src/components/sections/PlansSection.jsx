import SectionLabel from "../ui/SectionLabel";
import { PLANS } from "../../data/plans";

export default function PlansSection() {
  return (
    <section id="planos" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <style>{`
        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .plans-grid {
            grid-template-columns: 1fr !important;
            max-width: 420px;
            margin: 0 auto;
          }
          .plan-card-popular {
            transform: none !important;
          }
        }
        @media (max-width: 480px) {
          #planos {
            padding: 60px 20px !important;
          }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <SectionLabel text="Preços" color="var(--green)" />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px,4vw,42px)",
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          Planos sem surpresa
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 16 }}>
          Sem taxas ocultas. Cancele quando quiser.
        </p>
      </div>

      <div className="plans-grid">
        {PLANS.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function PlanCard({ plan }) {
  return (
    <div
      className={`plan-card panel${plan.popular ? " plan-card-popular bracket" : ""}`}
      style={{
        background: plan.popular ? "rgba(63,216,255,0.05)" : "var(--panel)",
        border: `1px solid ${plan.popular ? plan.color : "var(--line)"}`,
        borderRadius: 14,
        padding: "36px 28px",
        position: "relative",
        transform: plan.popular ? "scale(1.05)" : "none",
        boxShadow: plan.popular ? `0 0 50px ${plan.color}18` : "none",
        opacity: plan.comingSoon ? 0.6 : 1,
      }}
    >
      {plan.popular && (
        <div
          style={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, var(--cyan), #1a8fd1)",
            color: "#04141c",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            padding: "4px 18px",
            borderRadius: "0 0 6px 6px",
            letterSpacing: 1,
            whiteSpace: "nowrap",
          }}
        >
          MAIS POPULAR
        </div>
      )}

      {plan.comingSoon && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--line-strong)",
            color: "var(--text-faint)",
            fontSize: 10,
            fontFamily: "var(--font-mono)",
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          Em breve
        </div>
      )}

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 500,
          color: plan.color,
          marginBottom: 8,
        }}
      >
        {plan.name}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 28 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 30 }}>
          {plan.price}
        </span>
        {plan.period && (
          <span style={{ color: "var(--text-faint)", fontSize: 14 }}>{plan.period}</span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {plan.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: `${plan.color}18`,
                border: `1px solid ${plan.color}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ color: plan.color, fontSize: 10 }}>✓</span>
            </div>
            <span style={{ color: "var(--text-dim)", fontSize: 14 }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        disabled={plan.comingSoon}
        onClick={() => window.open("https://discord.com/channels/1396934712102097127/1396934712609476620", "_blank")}
        className={plan.popular ? "btn-primary" : "btn-outline"}
        style={{
          width: "100%",
          justifyContent: "center",
          cursor: plan.comingSoon ? "not-allowed" : "pointer",
          borderColor: !plan.popular ? `${plan.color}55` : undefined,
          color: !plan.popular ? plan.color : undefined,
        }}
      >
        {plan.cta}
      </button>
    </div>
  );
}
