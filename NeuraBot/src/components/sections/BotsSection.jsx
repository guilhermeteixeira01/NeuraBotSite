import { useState } from "react";
import BotCard from "../ui/BotCard";
import Console3D from "../ui/Console3D";
import SectionLabel from "../ui/SectionLabel";
import { BOTS } from "../../data/bots";
import { Icon } from "../ui/Icons";

const TAGS = ["Servidores Gamers", "E-sports", "Comunidades", "Educação", "Negócios"];

export default function BotsSection() {
  const [activeBot, setActiveBot] = useState(0);
  const bot = BOTS[activeBot];

  return (
    <section id="bots" style={{ padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <style>{`
        .bots-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .bots-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .bot-feature-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 14px 16px;
          background: var(--panel-2);
          border: 1px solid var(--line);
          border-radius: 10px;
          transition: border-color 0.25s, background 0.25s;
        }
        .bot-feature-item:hover {
          border-color: var(--cyan-soft);
          background: rgba(63,216,255,0.03);
        }
        .bot-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 7px;
          background: color-mix(in srgb, var(--bot-color, #3fd8ff) 12%, transparent);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .console-3d-scene {
          perspective: 1000px;
          perspective-origin: 70% 50%;
        }

        @media (max-width: 900px) {
          .bots-layout {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .console-3d-scene {
            perspective: none !important;
          }
        }
        @media (max-width: 480px) {
          #bots {
            padding: 60px 20px !important;
          }
          .bots-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <SectionLabel text="Nossa suíte" />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px,4vw,42px)",
            fontWeight: 600,
          }}
        >
          Cada bot, uma função clara
        </h2>
        <p style={{ color: "var(--text-dim)", fontSize: 16, maxWidth: 500 }}>
          Bots desenvolvidos com tecnologia de ponta para elevar sua comunidade Discord.
        </p>
      </div>

      <div className="bots-layout">
        {/* Left: Bot cards + Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div className="bots-cards-grid">
            {BOTS.map((b, i) => (
              <BotCard
                key={b.id}
                bot={b}
                active={activeBot === i}
                onClick={() => setActiveBot(i)}
              />
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
              Funcionalidades
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {bot.features.map((feature) => (
                <div
                  key={feature.label}
                  className="bot-feature-item"
                  style={{ "--bot-color": bot.color }}
                >
                  <div className="bot-feature-icon">
                    <Icon
                      name={feature.icon}
                      size={17}
                      color={bot.color}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <div style={{ color: "var(--text)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                      {feature.label}
                    </div>
                    <div style={{ color: "var(--text-dim)", fontSize: 12, lineHeight: 1.5 }}>
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: Console + Tags */}
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
              Console interativo
            </div>
            <div style={{ color: "var(--text-dim)", fontSize: 13 }}>
              Clique nos comandos abaixo para testá-los, ou digite o seu próprio.
            </div>
          </div>

          <div className="console-3d-scene">
            <Console3D botName={bot.name} commands={bot.commands} color={bot.color} />
          </div>

          <div
            className="panel"
            style={{
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: 11 }}>
              Disponível em:
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(63,216,255,0.04)",
                    border: "1px solid var(--line-strong)",
                    color: "var(--text-dim)",
                    fontSize: 11,
                    padding: "4px 12px",
                    borderRadius: 20,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
