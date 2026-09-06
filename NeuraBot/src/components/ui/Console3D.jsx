import { useState, useEffect, useRef, useCallback } from "react";
import { useCursorBlink } from "../../hooks/useCursorBlink";

export default function Console3D({ botName, commands, color }) {
  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState([]);
  const [tilt, setTilt] = useState({ x: 3, y: -8 });
  const cursor = useCursorBlink(500);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    setLines([
      { text: `> neura-bot console v2.4.1`, c: "var(--cyan)" },
      { text: `> conectado ao bot: ${botName}`, c: color },
      { text: `> status: online`, c: "var(--green)" },
      { text: `> aguardando comando...`, c: "var(--text-dim)" },
    ]);
    setTyped("");
  }, [botName, color]);

  const handleMove = useCallback((e) => {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: 3 + py * -6, y: -8 + px * 10 });
  }, []);

  const resetTilt = useCallback(() => setTilt({ x: 3, y: -8 }), []);

  function handleKey(e) {
    if (e.key !== "Enter" || !typed.trim()) return;

    const cmd = typed.trim();
    const isValid = commands.some((c) =>
      c.toLowerCase().includes(cmd.toLowerCase().replace("/", ""))
    );

    setLines((prev) => [
      ...prev.slice(-8),
      { text: `$ ${cmd}`, c: "var(--text)" },
      isValid
        ? { text: `✓ comando executado com sucesso`, c: "var(--green)" }
        : { text: `⚠ comando não encontrado — use ${commands[0]}`, c: "var(--amber)" },
    ]);
    setTyped("");
  }

  return (
    <div
      ref={boxRef}
      onClick={() => inputRef.current?.focus()}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{
        background: "#080a10",
        border: `1px solid ${color}55`,
        borderRadius: 10,
        padding: "20px 24px",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.7,
        boxShadow: `0 0 40px ${color}1e, inset 0 0 20px rgba(0,0,0,0.5)`,
        transform: `perspective(900px) rotateY(${tilt.y}deg) rotateX(${tilt.x}deg)`,
        transformOrigin: "left center",
        transition: "transform 0.2s ease-out",
        cursor: "text",
        minHeight: 220,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          borderBottom: `1px solid ${color}33`,
          paddingBottom: 10,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28ca41" }} />
        <span style={{ color: "var(--text-faint)", fontSize: 11, marginLeft: 8 }}>
          neura-bot-console — {botName.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>

      {/* Output lines */}
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.c, opacity: i === lines.length - 1 ? 1 : 0.7 }}>
          {l.text}
        </div>
      ))}

      {/* Input row */}
      <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
        <span style={{ color }}>$</span>
        <span style={{ color: "var(--text)", marginLeft: 6 }}>{typed}</span>
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 14,
            background: cursor ? "var(--text)" : "transparent",
            marginLeft: 2,
          }}
        />
      </div>

      {/* Hidden real input */}
      <input
        ref={inputRef}
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        onKeyDown={handleKey}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        autoComplete="off"
      />

      {/* Command pills */}
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
        {commands.map((cmd) => (
          <span
            key={cmd}
            onClick={() => setTyped(cmd)}
            style={{
              background: `${color}15`,
              border: `1px solid ${color}44`,
              color,
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: 11,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cmd}
          </span>
        ))}
      </div>
    </div>
  );
}
