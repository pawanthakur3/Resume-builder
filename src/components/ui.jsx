export function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {hint && <p style={{ fontSize: "12px", color: "var(--ink3)", marginBottom: "6px" }}>{hint}</p>}
      {children}
    </div>
  );
}

export function Row2({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>{children}</div>;
}

export function SectionHeading({ children }) {
  return (
    <div style={{ fontFamily: "var(--fraunces)", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "18px", paddingBottom: "10px", borderBottom: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {children}
    </div>
  );
}

export function EntryCard({ title, onRemove, children }) {
  return (
    <div style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: "12px", padding: "18px", marginBottom: "12px", transition: "border-color 0.15s, box-shadow 0.15s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(45,107,228,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink2)" }}>{title}</span>
        <button onClick={onRemove} style={{ background: "none", border: "none", color: "var(--ink3)", fontSize: "18px", cursor: "pointer", padding: "2px 6px", borderRadius: "4px", lineHeight: 1, transition: "color 0.15s, background 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#E53E3E"; e.currentTarget.style.background = "#FFF5F5"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--ink3)"; e.currentTarget.style.background = "none"; }}
        >×</button>
      </div>
      {children}
    </div>
  );
}

export function AddButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "12px", border: "2px dashed var(--border)", borderRadius: "10px", background: "none", color: "var(--ink3)", fontSize: "13px", fontWeight: 700, fontFamily: "var(--jakarta)", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--blue)"; e.currentTarget.style.color = "var(--blue)"; e.currentTarget.style.background = "var(--blue-light)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--ink3)"; e.currentTarget.style.background = "none"; }}
    >{children}</button>
  );
}

export function TipBox({ emoji, children }) {
  return (
    <div style={{ background: "var(--blue-light)", border: "1px solid rgba(45,107,228,0.2)", borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: "var(--blue-dark)", marginBottom: "16px", lineHeight: 1.6, display: "flex", gap: "8px" }}>
      <span style={{ flexShrink: 0 }}>{emoji || "💡"}</span>
      <span>{children}</span>
    </div>
  );
}
