const TEMPLATES = {
  modern:    { headerBg: "#1A1A2E", headerColor: "#fff", accent: "#2D6BE4", sidebar: "#F8F7F4", sidebarBorder: "#E8E8F0", font: "'Fraunces',serif", layout: "sidebar" },
  classic:   { headerBg: "#1E3A5F", headerColor: "#fff", accent: "#1E3A5F", font: "'Fraunces',serif", layout: "full", align: "center" },
  minimal:   { headerBg: "transparent", headerColor: "#1A1A2E", accent: "#0EAD69", font: "'Plus Jakarta Sans',sans-serif", layout: "full", borderBottom: "2px solid #1A1A2E" },
  executive: { headerBg: "#3A2E5C", headerColor: "#fff", accent: "#8B6FD4", font: "'Fraunces',serif", layout: "full" },
};

function fmt(text) {
  if (!text) return null;
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (!lines.length) return null;
  if (lines.length === 1) return <p style={{ fontSize: "8.5pt", color: "#404055", margin: 0, lineHeight: 1.55 }}>{lines[0]}</p>;
  return <ul style={{ paddingLeft: "13px", fontSize: "8.5pt", color: "#404055", margin: 0, lineHeight: 1.55 }}>{lines.map((l, i) => <li key={i} style={{ marginBottom: "2px" }}>{l.replace(/^[•\-*]\s*/, "")}</li>)}</ul>;
}

function Contact({ resume, color, center }) {
  const items = [resume.email && "✉ "+resume.email, resume.phone && "✆ "+resume.phone, resume.city && "⌖ "+resume.city, resume.linkedin && "in "+resume.linkedin].filter(Boolean);
  if (!items.length) return null;
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "7.5pt", color: color||"rgba(255,255,255,0.8)", justifyContent: center?"center":"flex-start" }}>{items.map((x,i)=><span key={i}>{x}</span>)}</div>;
}

function Sec({ label, accent, style: extra }) {
  return <div style={{ fontSize: "7pt", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: accent, marginTop: "16px", marginBottom: "9px", borderBottom: "1.5px solid "+accent, paddingBottom: "3px", ...extra }}>{label}</div>;
}

function Exp({ experience }) {
  const f = experience.filter(e => e.company||e.role);
  if (!f.length) return <p style={{ fontSize: "8.5pt", color: "#AAA", fontStyle: "italic" }}>Add your work experience...</p>;
  return f.map((e,i) => (
    <div key={i} style={{ marginBottom: "11px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontWeight: 700, fontSize: "9.5pt", color: "#1A1A2E" }}>{e.company}</span>
        <span style={{ fontSize: "7.5pt", color: "#8888A0", whiteSpace: "nowrap", marginLeft: "6px", flexShrink: 0 }}>{[e.startDate,e.endDate].filter(Boolean).join(" – ")}</span>
      </div>
      {e.role && <div style={{ fontSize: "8.5pt", color: "#606070", marginBottom: "3px", fontStyle: "italic" }}>{e.role}</div>}
      {fmt(e.description)}
    </div>
  ));
}

function Edu({ education }) {
  const f = education.filter(e => e.institution||e.degree);
  if (!f.length) return <p style={{ fontSize: "8.5pt", color: "#AAA", fontStyle: "italic" }}>Add your education...</p>;
  return f.map((e,i) => (
    <div key={i} style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: "9.5pt", color: "#1A1A2E" }}>{e.institution}</span>
        <span style={{ fontSize: "7.5pt", color: "#8888A0", whiteSpace: "nowrap", marginLeft: "6px", flexShrink: 0 }}>{[e.startYear,e.endYear].filter(Boolean).join(" – ")}</span>
      </div>
      <div style={{ fontSize: "8.5pt", color: "#606070" }}>{[e.degree,e.field].filter(Boolean).join(", ")}{e.grade?" · "+e.grade:""}</div>
    </div>
  ));
}

function Skills({ skills }) {
  if (!skills.length) return <p style={{ fontSize: "8.5pt", color: "#AAA", fontStyle: "italic" }}>Add skills...</p>;
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>{skills.map((s,i)=><span key={i} style={{ background: "#F0EEF8", border: "1px solid #E0DEEE", borderRadius: "3px", padding: "2px 7px", fontSize: "7.5pt", color: "#404055" }}>{s}</span>)}</div>;
}

function Certs({ certs }) {
  return certs.filter(c=>c.name).map((c,i)=>(
    <div key={i} style={{ marginBottom: "7px" }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontWeight:700, fontSize:"9pt", color:"#1A1A2E" }}>{c.name}</span>
        <span style={{ fontSize:"7.5pt", color:"#8888A0" }}>{c.year}</span>
      </div>
      {c.issuer && <div style={{ fontSize:"8pt", color:"#606070" }}>{c.issuer}</div>}
    </div>
  ));
}

function Summary({ text }) {
  return text
    ? <p style={{ fontSize: "8.5pt", color: "#404055", lineHeight: 1.65, margin: 0 }}>{text}</p>
    : <p style={{ fontSize: "8.5pt", color: "#AAA", fontStyle: "italic", margin: 0 }}>Add a professional summary in Contact Info...</p>;
}

function ModernLayout({ resume, tpl }) {
  return <>
    <div style={{ background: tpl.headerBg, color: tpl.headerColor, padding: "26px 28px 20px" }}>
      <div style={{ fontFamily: tpl.font, fontSize: "24pt", fontWeight: 700, lineHeight: 1.1, marginBottom: "2px" }}>{resume.name||<span style={{opacity:.3}}>Your Name</span>}</div>
      <div style={{ fontSize: "10pt", opacity: .75, fontWeight: 300, marginBottom: "12px" }}>{resume.title||<span style={{opacity:.5}}>Job Title</span>}</div>
      <Contact resume={resume} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
      <div style={{ padding: "20px 22px" }}>
        <Sec label="Profile" accent={tpl.accent} />
        <Summary text={resume.summary} />
        <Sec label="Experience" accent={tpl.accent} />
        <Exp experience={resume.experience} />
        <Sec label="Education" accent={tpl.accent} />
        <Edu education={resume.education} />
      </div>
      <div style={{ padding: "20px 16px", background: tpl.sidebar, borderLeft: "1px solid "+tpl.sidebarBorder }}>
        <Sec label="Skills" accent={tpl.accent} style={{ marginTop: 0 }} />
        <Skills skills={resume.skills} />
        {resume.certifications.length > 0 && <><Sec label="Certifications" accent={tpl.accent} /><Certs certs={resume.certifications} /></>}
      </div>
    </div>
  </>;
}

function FullLayout({ resume, tpl }) {
  const min = !tpl.headerBg || tpl.headerBg === "transparent";
  return <>
    <div style={{ background: tpl.headerBg, color: tpl.headerColor, padding: min ? "26px 28px 18px" : "22px 28px", textAlign: tpl.align||"left", borderBottom: tpl.borderBottom }}>
      <div style={{ fontFamily: tpl.font, fontSize: min ? "22pt" : "26pt", fontWeight: 700, lineHeight: 1.1, marginBottom: "2px", letterSpacing: min ? "-0.02em" : "0" }}>{resume.name||<span style={{opacity:.3}}>Your Name</span>}</div>
      <div style={{ fontSize: "10pt", opacity: min?1:.8, color: min?"#606070":"inherit", fontWeight: 300, marginBottom: "10px" }}>{resume.title||<span style={{opacity:.4}}>Job Title</span>}</div>
      <Contact resume={resume} color={min?"#8888A0":"rgba(255,255,255,0.8)"} center={tpl.align==="center"} />
    </div>
    <div style={{ padding: "18px 28px" }}>
      <Sec label="Profile" accent={tpl.accent} style={{ marginTop: 0 }} /><Summary text={resume.summary} />
      <Sec label="Experience" accent={tpl.accent} /><Exp experience={resume.experience} />
      <Sec label="Education" accent={tpl.accent} /><Edu education={resume.education} />
      <Sec label="Skills" accent={tpl.accent} /><Skills skills={resume.skills} />
      {resume.certifications.length > 0 && <><Sec label="Certifications" accent={tpl.accent} /><Certs certs={resume.certifications} /></>}
    </div>
  </>;
}

export default function ResumePreview({ resume, previewRef }) {
  const tpl = TEMPLATES[resume.template] || TEMPLATES.modern;
  return (
    <div ref={previewRef} style={{ width: "210mm", minHeight: "297mm", background: "white", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "10pt", lineHeight: 1.5, borderRadius: "2px", overflow: "hidden", boxShadow: "0 8px 40px rgba(26,26,46,0.2)" }}>
      {tpl.layout === "sidebar" ? <ModernLayout resume={resume} tpl={tpl} /> : <FullLayout resume={resume} tpl={tpl} />}
    </div>
  );
}
