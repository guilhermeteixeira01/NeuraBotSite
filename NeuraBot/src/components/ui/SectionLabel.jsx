export default function SectionLabel({ text, index, color = "var(--cyan)" }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color,
        marginBottom: 14,
      }}
    >
      <span style={{ width: 14, height: 1, background: color, opacity: 0.6 }} />
      {index && <span style={{ opacity: 0.6 }}>{index}</span>}
      <span>{text}</span>
    </div>
  );
}
