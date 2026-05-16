import { useState } from "react";
import { Field, Row2, EntryCard, AddButton, TipBox } from "../ui";
import { certTemplate } from "../../data/defaultState";

export default function SkillsTab({ resume, updateNested, addEntry, removeEntry, addSkill, removeSkill }) {
  const [input, setInput] = useState("");
  const handle = () => { if (!input.trim()) return; addSkill(input); setInput(""); };

  return (
    <div>
      <TipBox emoji="⚡">Add skills relevant to your target role. You can type multiple at once separated by commas.</TipBox>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px", minHeight: "40px" }}>
        {resume.skills.map((s, i) => (
          <span key={i} style={{ background: "var(--blue)", color: "white", fontSize: "13px", padding: "5px 12px", borderRadius: "99px", display: "flex", alignItems: "center", gap: "6px", fontWeight: 500 }}>
            {s}
            <button onClick={() => removeSkill(i)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: 1, padding: 0, cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "white"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
            >×</button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} placeholder="e.g. Python, React, SQL — or add multiple with commas" style={{ flex: 1 }} />
        <button onClick={handle} style={{ padding: "10px 18px", background: "var(--blue)", color: "white", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 700, fontFamily: "var(--jakarta)", whiteSpace: "nowrap", transition: "background 0.15s" }}
          onMouseEnter={e => e.target.style.background = "var(--blue-dark)"}
          onMouseLeave={e => e.target.style.background = "var(--blue)"}
        >Add</button>
      </div>

      <div style={{ fontFamily: "var(--fraunces)", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "14px", paddingBottom: "10px", borderBottom: "2px solid var(--border)" }}>Certifications</div>
      <TipBox emoji="🏆">Indian recruiters value certifications — AWS, PMP, Google Analytics, Six Sigma, CA.</TipBox>
      {resume.certifications.map((cert, i) => (
        <EntryCard key={i} title={"Certification " + (i + 1)} onRemove={() => removeEntry("certifications", i)}>
          <Field label="Certificate Name"><input value={cert.name} onChange={e => updateNested("certifications", i, "name", e.target.value)} placeholder="AWS Solutions Architect, PMP, Google Analytics..." /></Field>
          <Row2>
            <Field label="Issuer"><input value={cert.issuer} onChange={e => updateNested("certifications", i, "issuer", e.target.value)} placeholder="Amazon, PMI, Google..." /></Field>
            <Field label="Year"><input value={cert.year} onChange={e => updateNested("certifications", i, "year", e.target.value)} placeholder="2024" /></Field>
          </Row2>
        </EntryCard>
      ))}
      <AddButton onClick={() => addEntry("certifications", certTemplate)}>+ Add Certification</AddButton>
    </div>
  );
}
