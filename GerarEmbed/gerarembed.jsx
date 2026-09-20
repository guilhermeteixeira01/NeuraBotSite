import { useState, useRef, useCallback } from "react";
import "./gerarembed.css";
import botlogo from "../imgs/logoo.png";

// ── markdown parser ───────────────────────────────────────────────────────────
const mdRules = [
  [/^#### (.*)$/gm, "<span class='d-h4'>$1</span>"],
  [/^### (.*)$/gm, "<span class='d-h3'>$1</span>"],
  [/^## (.*)$/gm, "<span class='d-h2'>$1</span>"],
  [/^# (.*)$/gm, "<span class='d-h1'>$1</span>"],
  [/\*\*\*([^*]+)\*\*\*/g, "<b><i>$1</i></b>"],
  [/\*\*([^*]+)\*\*/g, "<b>$1</b>"],
  [/\*([^*]+)\*/g, "<i>$1</i>"],
  [/__([^_]+)__/g, "<u>$1</u>"],
  [/~~([^~]+)~~/g, "<s>$1</s>"],
  [/\|\|([^|]+)\|\|/g, "<span class='spoiler'>$1</span>"],
  [/```([\s\S]+?)```/g, "<pre><code>$1</code></pre>"],
  [/`([^`]+)`/g, "<code>$1</code>"],
  [/^> (.+)/gm, "<blockquote>$1</blockquote>"],
  [/([^\n]+\n?)/g, "<p>$1</p>"],
];
function fromMarkdown(str) {
  if (!str) return "";
  let out = str;
  mdRules.forEach(([r, t]) => { out = out.replace(r, t); });
  return out;
}

// ── defaults ──────────────────────────────────────────────────────────────────
const defaultEmbed = () => ({
  color: "#3fd8ff",
  title: "",
  url: "",
  author: { name: "", icon_url: "", url: "" },
  description: "",
  thumbnail: { url: "" },
  fields: [],
  image: { url: "" },
  timestamp: "",
  footer: { text: "™ Neura Bot © All rights reserved", icon_url: "" },
});

// ── sub-components ────────────────────────────────────────────────────────────
function InputRow({ label, children }) {
  return (
    <div className="input-row" style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
      <label style={{
        width: 108, minWidth: 108, color: "#6b7690", fontSize: 11, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: ".06em", paddingTop: 9, textAlign: "right",
        fontFamily: "'Sora',sans-serif",
      }}>
        {label}
      </label>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function NInput(props) {
  return (
    <input
      style={{
        width: "100%", background: "#0b0e17", border: "1px solid #3fd8ff22",
        color: "#eef2f8", padding: "8px 12px", fontSize: 13, outline: "none",
        borderRadius: 8, fontFamily: "'Sora',sans-serif", transition: "border-color .2s, box-shadow .2s",
      }}
      onFocus={e => { e.target.style.borderColor = "#3fd8ff88"; e.target.style.boxShadow = "0 0 0 3px #3fd8ff18"; }}
      onBlur={e => { e.target.style.borderColor = "#3fd8ff22"; e.target.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

function NTextarea(props) {
  return (
    <textarea
      style={{
        width: "100%", background: "#0b0e17", border: "1px solid #3fd8ff22",
        color: "#eef2f8", padding: "8px 12px", fontSize: 13, outline: "none",
        borderRadius: 8, fontFamily: "'Sora',sans-serif", resize: "vertical", minHeight: 80,
        transition: "border-color .2s, box-shadow .2s",
      }}
      onFocus={e => { e.target.style.borderColor = "#3fd8ff88"; e.target.style.boxShadow = "0 0 0 3px #3fd8ff18"; }}
      onBlur={e => { e.target.style.borderColor = "#3fd8ff22"; e.target.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #3fd8ff0e" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", background: "none", border: "none", color: "#eef2f8",
          padding: "13px 18px", textAlign: "left", fontSize: 13, fontWeight: 700,
          cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
          letterSpacing: ".05em", fontFamily: "'Sora',sans-serif", transition: "color .2s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#3fd8ff"}
        onMouseLeave={e => e.currentTarget.style.color = "#eef2f8"}
      >
        <span>{title}</span>
        <span style={{
          fontSize: 9, opacity: .4, display: "inline-block",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform .25s",
        }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: "4px 18px 18px" }}>{children}</div>
      )}
    </div>
  );
}

function Toast({ visible, message, type }) {
  return (
    <div style={{
      position: "fixed", top: 20, right: 20, zIndex: 9999,
      background: type === "success"
        ? "linear-gradient(135deg,#3fd8ff,#1a8fd1)"
        : "linear-gradient(135deg,#ff4466,#cc1133)",
      color: "#fff", padding: "12px 22px", borderRadius: 10,
      fontSize: 13, fontWeight: 700, fontFamily: "'Sora',sans-serif",
      boxShadow: "0 8px 30px rgba(63,216,255,.25)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-16px)",
      transition: "opacity .3s, transform .3s", pointerEvents: "none",
      letterSpacing: ".03em",
    }}>
      {message}
    </div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────────
export default function App() {
  console.log(
    "%cPARE SEU SAFADO !",
    "color: #ffcc00; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
  );

  console.log(
    "%cEsta é uma funcionalidade do navegador destinada a desenvolvedores. Se alguém te disse para copiar e colar algo aqui para ativar um recurso ou 'hackear' a conta de alguém, isso é uma fraude e pode dar a essa pessoa acesso à sua conta.",
    "color: #ff3333; font-size: 16px; font-weight: bold;"
  );

  console.log(
    "%cNunca cole código aqui que você não entende completamente.",
    "color: #ffffff; background: #cc0000; font-size: 14px; padding: 4px;"
  );
  const [embed, setEmbed] = useState(defaultEmbed());
  const [output, setOutput] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [dragOver, setDragOver] = useState(null);
  const [activeTab, setActiveTab] = useState("form"); // "form" | "preview"
  const descRef = useRef(null);

  const set = useCallback((path, value) => {
    setEmbed(prev => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  }, []);

  function showToast(message, type = "success") {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2500);
  }

  function toEmbedStr() {
    const e = JSON.parse(JSON.stringify(embed));
    if (!e.author.name && !e.author.icon_url && !e.author.url) delete e.author;
    if (!e.thumbnail.url) delete e.thumbnail;
    if (!e.image.url) delete e.image;
    if (!e.footer.text && !e.footer.icon_url) delete e.footer;
    if (!e.timestamp) delete e.timestamp;
    if (!e.url) delete e.url;
    if (!e.title) delete e.title;
    if (!e.description) delete e.description;
    e.fields = (e.fields || [])
      .filter(f => f.name || f.value)
      .map(f => ({ ...f, name: f.name || "\u200b", value: f.value || "\u200b" }));
    if (e.fields.length === 0) delete e.fields;
    const str = JSON.stringify(e);
    setOutput(str);
    return str;
  }

  function clearEmbed() { setEmbed(defaultEmbed()); setOutput(""); }

  function copyToClipboard() {
    const str = toEmbedStr();
    navigator.clipboard.writeText(str)
      .then(() => showToast("JSON copiado!"))
      .catch(() => showToast("Falha ao copiar.", "error"));
  }

  function copyCommand() {
    const str = toEmbedStr();
    navigator.clipboard.writeText(`!richembed post ${str}`)
      .then(() => showToast("Comando copiado!"))
      .catch(() => showToast("Falha ao copiar.", "error"));
  }

  function addField() {
    if (embed.fields.length >= 20) return;
    setEmbed(prev => ({ ...prev, fields: [...prev.fields, { name: "", value: "", inline: false }] }));
  }
  function deleteField(i) {
    setEmbed(prev => ({ ...prev, fields: prev.fields.filter((_, idx) => idx !== i) }));
  }
  function updateField(i, key, val) {
    setEmbed(prev => ({
      ...prev,
      fields: prev.fields.map((f, idx) => idx === i ? { ...f, [key]: val } : f),
    }));
  }

  function handleDescKeyDown(e) {
    const shortcuts = { b: "**", i: "*", u: "__", s: "~~" };
    const wrapper = e.key === "`" ? "`" : (e.ctrlKey && shortcuts[e.key.toLowerCase()]);
    if (!wrapper) return;
    e.preventDefault();
    const ta = descRef.current;
    const start = ta.selectionStart, end = ta.selectionEnd;
    const text = ta.value, sel = text.slice(start, end);
    let newText;
    if (sel.startsWith(wrapper) && sel.endsWith(wrapper)) {
      newText = text.slice(0, start) + sel.slice(wrapper.length, sel.length - wrapper.length) + text.slice(end);
    } else {
      newText = text.slice(0, start) + wrapper + sel + wrapper + text.slice(end);
    }
    set("description", newText);
    setTimeout(() => { ta.selectionStart = start + wrapper.length; ta.selectionEnd = end + wrapper.length; }, 0);
  }

  function onDragStart(e, i) { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", i); }
  function onDragOver(e, i) { e.preventDefault(); setDragOver(i); }
  function onDrop(e, i) {
    const from = parseInt(e.dataTransfer.getData("text/plain"));
    if (from === i) { setDragOver(null); return; }
    setEmbed(prev => {
      const fields = [...prev.fields];
      const [moved] = fields.splice(from, 1);
      fields.splice(i, 0, moved);
      return { ...prev, fields };
    });
    setDragOver(null);
  }

  const embedBorderColor = embed.color || "#3fd8ff";

  return (
    <>
      <div className="grid-bg" />
      <div className="scan-line" />
      <Toast {...toast} />

      {/* ══ HEADER ══════════════════════════════════════════════════════════════ */}
      <header className="app-header">
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent 0%,#3fd8ff 50%,transparent 100%)"
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", width: 44, height: 44, flexShrink: 0 }}>
            <img src={botlogo} alt="Bot Icon" style={{ width: 80, position: "relative", left: '-18px', top: '-8px', borderRadius: "50px" }} />
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 700,
              letterSpacing: ".1em", color: "#fff", lineHeight: 1.1,
            }}>
              NEURA<span style={{ color: "#3fd8ff" }}>BOT</span>
            </h1>
            <p style={{
              fontFamily: "'Sora',sans-serif", fontSize: 11, color: "#6b7690",
              marginTop: 3, letterSpacing: ".04em",
            }}>
              Discord Embed Generator
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 8,
            letterSpacing: ".14em", color: "#3fd8ff88", textTransform: "uppercase",
          }}>Preview ao vivo</span>
          <div style={{
            width: 7, height: 7, borderRadius: "50%", background: "#3fd8ff",
            boxShadow: "0 0 10px #3fd8ff",
            animation: "blink 2s ease-in-out infinite",
          }} />
        </div>
      </header>

      {/* ══ MOBILE TABS ═════════════════════════════════════════════════════════ */}
      <div className="mobile-tabs">
        <button
          className={`mobile-tab ${activeTab === "form" ? "active" : ""}`}
          onClick={() => setActiveTab("form")}
        >
          ⚙️ Editor
        </button>
        <button
          className={`mobile-tab ${activeTab === "preview" ? "active" : ""}`}
          onClick={() => setActiveTab("preview")}
        >
          👁 Preview
        </button>
      </div>

      {/* ══ BODY ════════════════════════════════════════════════════════════════ */}
      <div className="app-body">

        {/* ── LEFT: FORM ────────────────────────────────────────────────────── */}
        <div className={`form-panel ${activeTab === "form" ? "active" : ""}`}>
          <div style={{ padding: "14px 14px 8px" }}>
            <div className="nb-card">

              <Section title="⚙️  Basic" defaultOpen>
                {/* Color picker */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <label style={{
                    width: 108, minWidth: 108, color: "#6b7690", fontSize: 11, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: ".06em",
                    textAlign: "right", fontFamily: "'Sora',sans-serif",
                  }}>Color</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input type="color" value={embed.color} onChange={e => set("color", e.target.value)}
                      style={{
                        width: 42, height: 36, border: "1px solid #3fd8ff33",
                        borderRadius: 8, cursor: "pointer", background: "none", padding: 3,
                      }}
                    />
                    <span style={{ fontSize: 12, color: "#6b7690", fontFamily: "'IBM Plex Mono',monospace", letterSpacing: ".05em" }}>
                      {embed.color}
                    </span>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5,
                      background: embed.color,
                      boxShadow: `0 0 12px ${embed.color}99`,
                      transition: "background .2s, box-shadow .2s",
                    }} />
                  </div>
                </div>

                <InputRow label="Title">
                  <NInput value={embed.title} onChange={e => set("title", e.target.value)} placeholder="Este é o título" />
                </InputRow>
                <InputRow label="URL">
                  <NInput value={embed.url} onChange={e => set("url", e.target.value)} placeholder="https://discord.com" />
                </InputRow>
                <InputRow label="Description">
                  <NTextarea
                    ref={descRef}
                    value={embed.description}
                    onChange={e => set("description", e.target.value)}
                    onKeyDown={handleDescKeyDown}
                    placeholder={"Escreva com **markdown**...\n**negrito**  *itálico*  __sublinhado__"}
                    rows={5}
                  />
                </InputRow>
                <InputRow label="Thumbnail">
                  <NInput value={embed.thumbnail.url} onChange={e => set("thumbnail.url", e.target.value)} placeholder="https://i.imgur.com/..." />
                </InputRow>
                <InputRow label="Image">
                  <NInput value={embed.image.url} onChange={e => set("image.url", e.target.value)} placeholder="https://i.imgur.com/..." />
                </InputRow>
              </Section>

              <Section title="👤  Author">
                <InputRow label="Name">
                  <NInput value={embed.author.name} onChange={e => set("author.name", e.target.value)} placeholder="Neura Bot" />
                </InputRow>
                <InputRow label="Icon URL">
                  <NInput value={embed.author.icon_url} onChange={e => set("author.icon_url", e.target.value)} placeholder="https://..." />
                </InputRow>
                <InputRow label="URL">
                  <NInput value={embed.author.url} onChange={e => set("author.url", e.target.value)} placeholder="https://..." />
                </InputRow>
              </Section>

              <Section title="📋  Fields">
                {embed.fields.map((field, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={e => onDragStart(e, i)}
                    onDragOver={e => onDragOver(e, i)}
                    onDrop={e => onDrop(e, i)}
                    onDragLeave={() => setDragOver(null)}
                    style={{
                      background: dragOver === i ? "#3fd8ff08" : "#0e1220",
                      border: `1px ${dragOver === i ? "dashed" : "solid"} ${dragOver === i ? "#3fd8ff66" : "#3fd8ff18"}`,
                      borderRadius: 10, padding: "12px 12px 8px",
                      marginBottom: 10, cursor: "grab",
                      transition: "border-color .15s, background .15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <span style={{ color: "#3fd8ff33", fontSize: 13 }}>⠿</span>
                      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 8, letterSpacing: ".14em", color: "#3fd8ff66" }}>
                        FIELD {i + 1}
                      </span>
                    </div>
                    <InputRow label="Name">
                      <NInput value={field.name} onChange={e => updateField(i, "name", e.target.value)} placeholder="Nome do field" />
                    </InputRow>
                    <InputRow label="Value">
                      <NTextarea value={field.value} onChange={e => updateField(i, "value", e.target.value)} placeholder="Valor do field" rows={2} />
                    </InputRow>
                    <div className="field-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 118, marginTop: 6 }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7690", fontSize: 12, cursor: "pointer" }}>
                        <input type="checkbox" checked={field.inline} onChange={e => updateField(i, "inline", e.target.checked)}
                          style={{ accentColor: "#3fd8ff", width: 14, height: 14 }} />
                        Inline
                      </label>
                      <button
                        onClick={() => deleteField(i)}
                        style={{ background: "none", border: "none", color: "#ff446677", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "'Sora',sans-serif", transition: "color .2s" }}
                        onMouseEnter={e => e.target.style.color = "#ff4466"}
                        onMouseLeave={e => e.target.style.color = "#ff446677"}
                      >✕ Deletar</button>
                    </div>
                  </div>
                ))}
                {embed.fields.length < 20 && (
                  <button className="btn-outline" onClick={addField} style={{ width: "100%", marginTop: 4 }}>
                    + Adicionar Field
                  </button>
                )}
              </Section>

              <Section title="🔻  Footer">
                <InputRow label="Footer Text">
                  <NInput value={embed.footer.text} onChange={e => set("footer.text", e.target.value)} placeholder="Footer text..." />
                </InputRow>
                <InputRow label="Footer Icon">
                  <NInput value={embed.footer.icon_url} onChange={e => set("footer.icon_url", e.target.value)} placeholder="https://..." />
                </InputRow>
                <InputRow label="Timestamp">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={!!embed.timestamp}
                      onChange={e => set("timestamp", e.target.checked ? new Date().toISOString().slice(0, 16) : "")}
                      style={{ accentColor: "#3fd8ff", width: 15, height: 15, cursor: "pointer", flexShrink: 0 }}
                    />
                    <input
                      type="datetime-local"
                      value={embed.timestamp}
                      onChange={e => set("timestamp", e.target.value)}
                      disabled={!embed.timestamp}
                      style={{
                        flex: 1, background: "#0b0e17", border: "1px solid #3fd8ff22",
                        color: "#eef2f8", padding: "7px 10px", fontSize: 12, outline: "none",
                        borderRadius: 8, fontFamily: "'Sora',sans-serif",
                        opacity: embed.timestamp ? 1 : 0.35,
                      }}
                    />
                  </div>
                </InputRow>
              </Section>

            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="action-buttons" style={{ padding: "12px 14px 6px", display: "flex", gap: 8 }}>
            <button className="btn-primary" onClick={toEmbedStr} style={{ flex: 1 }}>
              ⚡ Gerar JSON
            </button>
            <button className="btn-danger-outline" onClick={clearEmbed}>
              🗑 Limpar
            </button>
          </div>
          <p style={{
            fontFamily: "'Sora',sans-serif", fontSize: 10, color: "#6b769044",
            textAlign: "center", letterSpacing: ".04em", marginLeft: 120, marginBottom: 12,
          }}>
            Antes de editar, aperte em <span style={{ color: "#ff446677" }}>Limpar</span>
          </p>

          {/* ── JSON Output ── */}
          {output && (
            <div style={{ padding: "0 14px 20px" }}>
              <span className="section-label">Output JSON</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 46px", gap: 8 }}>
                <textarea className="output-area" value={output} onChange={e => setOutput(e.target.value)} rows={5} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button className="btn-icon" onClick={copyToClipboard} title="Copiar JSON" style={{ flex: 1 }}>📋</button>
                  <button
                    className="btn-icon"
                    onClick={copyCommand}
                    title="Copiar !richembed post"
                    style={{ flex: 1, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700 }}
                  >!</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: PREVIEW ──────────────────────────────────────────────── */}
        <div className={`preview-panel ${activeTab === "preview" ? "active" : ""}`}>
          <span className="section-label preview-live-label">● Preview ao vivo</span>

          {/* Discord mock */}
          <div className="discord-mock" style={{
            background: "#36393e", borderRadius: 10,
            border: "1px solid rgba(255,255,255,.06)",
            padding: "8px 0", fontFamily: "Roboto,'Sora',sans-serif",
            fontSize: 16, lineHeight: "170%", maxWidth: 580,
            boxShadow: "0 24px 60px rgba(0,0,0,.6)",
          }}>
            <div style={{
              color: "#dcddde", display: "flex", flexDirection: "column",
              fontSize: ".9em", margin: "1em 0", padding: "0.25em 1em 0",
            }}>
              <div style={{ display: "flex", width: "100%", lineHeight: "160%", fontWeight: 400 }}>
                {/* bot avatar */}
                <div style={{ marginTop: 1, marginRight: 16, minWidth: 40 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "linear-gradient(135deg,#05060a,#1a8fd1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}><img src={botlogo} alt="Bot Icon" style={{ width: 60, position: "relative", borderRadius: "50px" }} /></div>
                </div>

                <div style={{ position: "relative", width: "100%" }}>
                  {/* message header */}
                  <div>
                    <span style={{ color: "#fff", display: "inline-flex", alignItems: "center", fontSize: 15 }}>
                      <span style={{ fontWeight: 700 }}>Neura Bot</span>
                      <span style={{
                        background: "#5865f2", fontSize: ".6em", marginLeft: 6,
                        padding: "3px 5px", borderRadius: 3, textTransform: "uppercase", letterSpacing: ".04em",
                      }}>BOT</span>
                    </span>
                    <span style={{ color: "#72767d", fontSize: 11, marginLeft: 8 }}>
                      {new Date().toDateString()}
                    </span>
                  </div>

                  {/* the embed itself */}
                  <div style={{ display: "flex", marginTop: 8, marginBottom: 8, fontSize: 13, lineHeight: "150%" }}>
                    <div style={{
                      background: embedBorderColor, flexShrink: 0, width: 4,
                      borderRadius: "4px 0 0 4px",
                      boxShadow: `0 0 14px ${embedBorderColor}66`,
                    }} />
                    <div style={{
                      background: "#2f3136", display: "flex", flexDirection: "column",
                      maxWidth: 520, padding: "8px 16px 16px",
                      border: "1px solid rgba(46,48,54,.6)",
                      borderRadius: "0 4px 4px 0", flex: 1,
                    }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ flex: 1 }}>
                          {embed.author.name && (
                            <div style={{ color: "#fff", display: "flex", alignItems: "center", fontWeight: 500, marginTop: 8 }}>
                              {embed.author.icon_url && (
                                <img src={embed.author.icon_url} alt="" style={{ width: 24, height: 24, marginRight: 8, borderRadius: "50%" }} />
                              )}
                              {embed.author.url
                                ? <a href={embed.author.url} style={{ color: "#fff" }} target="_blank" rel="noreferrer">{embed.author.name}</a>
                                : embed.author.name}
                            </div>
                          )}

                          {embed.title && (
                            <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginTop: 8 }}>
                              {embed.url
                                ? <a href={embed.url} style={{ color: "#00b0f4" }} target="_blank" rel="noreferrer">{embed.title}</a>
                                : embed.title}
                            </div>
                          )}

                          {embed.description && (
                            <div style={{ marginTop: 8, color: "#dcddde" }}
                              dangerouslySetInnerHTML={{ __html: fromMarkdown(embed.description) }}
                            />
                          )}

                          {embed.fields.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", marginTop: 8 }}>
                              {embed.fields.map((f, i) => (
                                <div key={i} style={{
                                  minWidth: f.inline ? 100 : "100%",
                                  flexGrow: f.inline ? 1 : 0,
                                  flexBasis: f.inline ? "auto" : undefined,
                                  marginTop: 5,
                                }}>
                                  {f.name && (
                                    <div style={{ color: "#fff", fontWeight: 600, marginBottom: 2 }}
                                      dangerouslySetInnerHTML={{ __html: fromMarkdown(f.name) }}
                                    />
                                  )}
                                  {f.value && (
                                    <div dangerouslySetInnerHTML={{ __html: fromMarkdown(f.value) }} />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {embed.image?.url && (
                            <img src={embed.image.url} alt="" style={{ maxWidth: "100%", marginTop: 16, borderRadius: 4 }} />
                          )}
                        </div>

                        {embed.thumbnail?.url && (
                          <img src={embed.thumbnail.url} alt="" style={{ maxWidth: 80, maxHeight: 80, marginLeft: 16, marginTop: 8, borderRadius: 4, objectFit: "contain" }} />
                        )}
                      </div>

                      {(embed.footer.text || embed.timestamp) && (
                        <div style={{ color: "#72767d", display: "flex", alignItems: "center", fontSize: ".83em", marginTop: 8 }}>
                          {embed.footer.icon_url && (
                            <img src={embed.footer.icon_url} alt="" style={{ width: 20, height: 20, marginRight: 8, borderRadius: "50%" }} />
                          )}
                          <span>
                            {embed.footer.text}
                            {embed.footer.text && embed.timestamp && " • "}
                            {embed.timestamp && new Date(embed.timestamp).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {!output && (
            <p style={{
              fontFamily: "'Sora',sans-serif", fontSize: 11,
              color: "#6b769044", marginTop: 20, letterSpacing: ".04em",
            }}>
              Clique em <span style={{ color: "#3fd8ff66" }}>⚡ Gerar JSON</span> para exportar.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
