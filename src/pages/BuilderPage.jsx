import { useState, useRef, useCallback } from "react";
import { defaultState } from "../data/defaultState";
import ResumePreview from "../components/ResumePreview";
import BasicsTab from "../components/tabs/BasicsTab";
import ExperienceTab from "../components/tabs/ExperienceTab";
import EducationTab from "../components/tabs/EducationTab";
import SkillsTab from "../components/tabs/SkillsTab";
import DesignTab from "../components/tabs/DesignTab";

const STEPS = [
  { id: "basics",     label: "Contact Info",  icon: "👤", desc: "Your personal details" },
  { id: "experience", label: "Experience",    icon: "💼", desc: "Work history" },
  { id: "education",  label: "Education",     icon: "🎓", desc: "Degrees & courses" },
  { id: "skills",     label: "Skills",        icon: "⚡", desc: "Skills & certifications" },
  { id: "design",     label: "Design",        icon: "🎨", desc: "Choose your template" },
];

function loadScript(src, key) {
  return new Promise((resolve, reject) => {
    if (window[key]) { resolve(window[key]); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = () => resolve(window[key]);
    s.onerror = () => reject(new Error("Failed: " + src));
    document.head.appendChild(s);
  });
}

export default function BuilderPage({ onBack }) {
  const [resume, setResume] = useState(defaultState);
  const [step, setStep]     = useState("basics");
  const [dlOpen, setDlOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const previewRef = useRef(null);

  const update = useCallback((k, v) => setResume(p => ({ ...p, [k]: v })), []);
  const updateNested = useCallback((sec, idx, field, val) => {
    setResume(p => { const a = [...p[sec]]; a[idx] = { ...a[idx], [field]: val }; return { ...p, [sec]: a }; });
  }, []);
  const addEntry    = useCallback((sec, tmpl) => setResume(p => ({ ...p, [sec]: [...p[sec], { ...tmpl }] })), []);
  const removeEntry = useCallback((sec, idx)  => setResume(p => ({ ...p, [sec]: p[sec].filter((_, i) => i !== idx) })), []);
  const addSkill    = useCallback((raw) => { const sk = raw.split(",").map(s => s.trim()).filter(Boolean); setResume(p => ({ ...p, skills: [...p.skills, ...sk] })); }, []);
  const removeSkill = useCallback((idx) => setResume(p => ({ ...p, skills: p.skills.filter((_, i) => i !== idx) })), []);

  const stepIdx = STEPS.findIndex(s => s.id === step);

  const downloadPDF = async () => {
    const el = previewRef.current; if (!el) return;
    const h = await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", "html2pdf");
    h().set({ margin: 0, filename: (resume.name || "Resume").replace(/\s+/g, "_") + "_Resume.pdf", image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } }).from(el).save();
  };
  const printResume = () => {
    const el = previewRef.current; if (!el) return;
    const w = window.open("", "_blank");
    w.document.write('<!DOCTYPE html><html><head><title>' + (resume.name || "Resume") + '</title><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,600;1,400&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:"Plus Jakarta Sans",sans-serif}@page{size:A4;margin:0}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>' + el.outerHTML + '</body></html>');
    w.document.close(); w.focus(); setTimeout(() => { w.print(); w.close(); }, 600);
  };
  const downloadImage = async () => {
    const el = previewRef.current; if (!el) return;
    const h = await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", "html2canvas");
    const canvas = await h(el, { scale: 2, useCORS: true });
    const a = document.createElement("a");
    a.download = (resume.name || "Resume").replace(/\s+/g, "_") + "_Resume.jpg";
    a.href = canvas.toDataURL("image/jpeg", 0.95); a.click();
  };

  const handle = async (id) => {
    setDlOpen(false); setLoading(id);
    if (id === "pdf")   await downloadPDF();
    if (id === "print") printResume();
    if (id === "img")   await downloadImage();
    setTimeout(() => setLoading(null), 2500);
  };

  const tabProps = { resume, update, updateNested, addEntry, removeEntry, addSkill, removeSkill };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "var(--off)" }}>
      {/* ── TOP BAR ── */}
      <header style={{
        height: "var(--nav-h)", background: "white", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", flexShrink: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--ink3)", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", padding: "6px 10px", borderRadius: "6px", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--off)"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            ← Back
          </button>
          <div style={{ width: "1px", height: "20px", background: "var(--border)" }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
            <span style={{ fontFamily: "var(--fraunces)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", fontStyle: "italic" }}>Banao</span>
            <span style={{ fontFamily: "var(--jakarta)", fontSize: "1.25rem", fontWeight: 800, color: "var(--blue)" }}>Resume</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button onClick={() => setStep(s.id)} style={{
                width: "28px", height: "28px", borderRadius: "50%", border: "none",
                background: i < stepIdx ? "var(--green)" : i === stepIdx ? "var(--blue)" : "var(--border)",
                color: i <= stepIdx ? "white" : "var(--ink3)",
                fontSize: "11px", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}>
                {i < stepIdx ? "✓" : i + 1}
              </button>
              {i < STEPS.length - 1 && <div style={{ width: "20px", height: "2px", background: i < stepIdx ? "var(--green)" : "var(--border)", borderRadius: "1px", transition: "background 0.3s" }} />}
            </div>
          ))}
        </div>

        {/* Download button */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden" }}>
            <button onClick={() => handle("pdf")} disabled={!!loading} style={{
              background: "var(--blue)", color: "white", border: "none",
              padding: "10px 18px", fontSize: "14px", fontWeight: 700,
              borderRadius: "8px 0 0 8px", display: "flex", alignItems: "center", gap: "7px",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--blue)"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              {loading === "pdf" ? "Generating..." : "Download PDF"}
            </button>
            <div style={{ width: "1px", background: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
            <button onClick={() => setDlOpen(o => !o)} style={{
              background: "var(--blue)", color: "white", border: "none",
              padding: "10px 10px", borderRadius: "0 8px 8px 0", cursor: "pointer",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--blue)"}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: dlOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
          {dlOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "white", border: "1px solid var(--border)", borderRadius: "10px", boxShadow: "var(--shadow-lg)", minWidth: "220px", overflow: "hidden", zIndex: 200 }}>
              <div style={{ padding: "8px 14px 6px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink3)", borderBottom: "1px solid var(--off)" }}>Export options</div>
              {[
                { id: "pdf", emoji: "📄", label: "Download PDF", sub: "Best for job applications" },
                { id: "print", emoji: "🖨️", label: "Print / Save as PDF", sub: "Browser print dialog" },
                { id: "img", emoji: "🖼️", label: "Download Image", sub: "JPG snapshot" },
              ].map(o => (
                <button key={o.id} onClick={() => handle(o.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "11px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left", borderBottom: o.id !== "img" ? "1px solid var(--off)" : "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--blue-light)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <span style={{ fontSize: "18px", width: "28px", textAlign: "center" }}>{o.emoji}</span>
                  <span>
                    <span style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>{o.label}</span>
                    <span style={{ display: "block", fontSize: "11px", color: "var(--ink3)" }}>{o.sub}</span>
                  </span>
                  {loading === o.id && <span style={{ fontSize: "11px", color: "var(--blue)", fontWeight: 700, marginLeft: "auto" }}>...</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN BODY ── */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 1fr", flex: 1, overflow: "hidden" }}>

        {/* Left sidebar - step nav */}
        <aside style={{ background: "white", borderRight: "1px solid var(--border)", overflowY: "auto", padding: "20px 12px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 12px", marginBottom: "8px" }}>Sections</div>
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const done   = i < stepIdx;
            return (
              <button key={s.id} onClick={() => setStep(s.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 14px", borderRadius: "10px", border: "none",
                background: active ? "var(--blue-light)" : "none",
                cursor: "pointer", textAlign: "left", marginBottom: "4px",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => !active && (e.currentTarget.style.background = "var(--off)")}
                onMouseLeave={e => !active && (e.currentTarget.style.background = "none")}
              >
                <div style={{
                  width: "36px", height: "36px", borderRadius: "8px", flexShrink: 0,
                  background: done ? "var(--green-light)" : active ? "var(--blue)" : "var(--off)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: done ? "14px" : "16px",
                  color: done ? "var(--green)" : active ? "white" : "var(--ink3)",
                  fontWeight: done ? 700 : 400,
                }}>
                  {done ? "✓" : s.icon}
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: active ? "var(--blue)" : done ? "var(--ink)" : "var(--ink2)" }}>{s.label}</div>
                  <div style={{ fontSize: "11px", color: "var(--ink3)" }}>{s.desc}</div>
                </div>
              </button>
            );
          })}

          {/* Nav buttons */}
          <div style={{ margin: "20px 0", padding: "0 2px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {stepIdx > 0 && (
              <button onClick={() => setStep(STEPS[stepIdx - 1].id)} style={{ padding: "10px", border: "1.5px solid var(--border)", borderRadius: "8px", background: "none", fontSize: "13px", fontWeight: 600, color: "var(--ink2)", transition: "all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >← Previous</button>
            )}
            {stepIdx < STEPS.length - 1 && (
              <button onClick={() => setStep(STEPS[stepIdx + 1].id)} style={{ padding: "10px", border: "none", borderRadius: "8px", background: "var(--blue)", color: "white", fontSize: "13px", fontWeight: 700, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--blue)"}
              >Next: {STEPS[stepIdx + 1].label} →</button>
            )}
          </div>
        </aside>

        {/* Centre - form */}
        <div style={{ overflowY: "auto", background: "var(--off)", borderRight: "1px solid var(--border)" }}>
          <div style={{ padding: "28px 28px 40px" }}>
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "var(--fraunces)", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>
                {STEPS[stepIdx].icon} {STEPS[stepIdx].label}
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink3)" }}>Step {stepIdx + 1} of {STEPS.length} — {STEPS[stepIdx].desc}</p>
            </div>
            {step === "basics"     && <BasicsTab     {...tabProps} />}
            {step === "experience" && <ExperienceTab {...tabProps} />}
            {step === "education"  && <EducationTab  {...tabProps} />}
            {step === "skills"     && <SkillsTab     {...tabProps} />}
            {step === "design"     && <DesignTab     {...tabProps} />}
          </div>
        </div>

        {/* Right - live preview */}
        <div style={{ overflowY: "auto", background: "#E8EAF0", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px", alignSelf: "flex-start" }}>
            Live Preview
          </div>
          <ResumePreview resume={resume} previewRef={previewRef} />
        </div>
      </div>
    </div>
  );
}
