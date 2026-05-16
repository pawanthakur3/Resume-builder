import { TipBox } from "../ui";

const TEMPLATES = [
  { id: "modern",    name: "Modern",    color: "#1A1A2E", accent: "#2D6BE4", tag: "Most Popular" },
  { id: "classic",   name: "Classic",   color: "#1E3A5F", accent: "#4A90D9", tag: "ATS Best" },
  { id: "minimal",   name: "Minimal",   color: "#0EAD69", accent: "#0EAD69", tag: "Clean" },
  { id: "executive", name: "Executive", color: "#3A2E5C", accent: "#8B6FD4", tag: "Senior" },
];

export default function DesignTab({ resume, update }) {
  return (
    <div>
      <TipBox emoji="🎨">Switch templates anytime — your data stays the same.</TipBox>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px" }}>
        {TEMPLATES.map(t => {
          const active = resume.template === t.id;
          return (
            <div key={t.id} onClick={() => update("template", t.id)} style={{
              border: active ? "2.5px solid var(--blue)" : "1.5px solid var(--border)",
              borderRadius: "12px", overflow: "hidden", cursor: "pointer",
              boxShadow: active ? "0 0 0 3px rgba(45,107,228,0.15)" : "none",
              transform: active ? "scale(1.02)" : "scale(1)",
              transition: "all 0.15s", background: "white",
            }}>
              <div style={{ background: t.color, padding: "20px 16px 16px", position: "relative" }}>
                {t.tag && <div style={{ position: "absolute", top: "8px", right: "8px", background: t.accent, color: "white", fontSize: "9px", fontWeight: 700, padding: "2px 7px", borderRadius: "99px" }}>{t.tag}</div>}
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "5px", padding: "10px" }}>
                  <div style={{ width: "50%", height: "3px", background: t.accent, borderRadius: "2px", marginBottom: "7px" }} />
                  {[80, 60, 70, 50].map((w, i) => <div key={i} style={{ width: w+"%", height: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "2px", marginBottom: "4px" }} />)}
                </div>
              </div>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: active ? "var(--blue)" : "var(--ink)" }}>{t.name}</span>
                {active && <span style={{ fontSize: "11px", color: "var(--blue)", fontWeight: 700 }}>✓ Selected</span>}
              </div>
            </div>
          );
        })}
      </div>
      <TipBox emoji="✅"><strong>ATS Tip:</strong> Use <strong>Modern</strong> or <strong>Classic</strong> for Naukri, LinkedIn, Taleo & Workday — they parse these cleanest.</TipBox>
    </div>
  );
}
