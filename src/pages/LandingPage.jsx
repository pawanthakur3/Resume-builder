import { useState, useEffect } from "react";

const STATS = [
  { n: "2.4L+", label: "Resumes created" },
  { n: "98%", label: "ATS pass rate" },
  { n: "4.8★", label: "User rating" },
  { n: "100%", label: "Free to download" },
];

const FEATURES = [
  { icon: "⚡", title: "Build in 5 minutes", desc: "Step-by-step guided sections. Fill, preview, download — done." },
  { icon: "🎯", title: "ATS Optimised", desc: "Every template passes Naukri, LinkedIn, Taleo & Workday scans." },
  { icon: "🎨", title: "4 Pro Templates", desc: "Designed by HR experts. Modern, Classic, Minimal & Executive." },
  { icon: "📄", title: "Free PDF Download", desc: "No signup. No watermark. No hidden charges. Ever." },
  { icon: "🇮🇳", title: "Made for India", desc: "Indian formats, city fields, CGPA support & Indian job portals." },
  { icon: "🤖", title: "AI Coming Soon", desc: "Smart bullet point writer & summary generator — launching soon." },
];

const TEMPLATES = [
  { id: "modern",    name: "Modern",    color: "#1A1A2E", accent: "#2D6BE4", tag: "Most Popular" },
  { id: "classic",   name: "Classic",   color: "#1E3A5F", accent: "#4A90D9", tag: "ATS Best" },
  { id: "minimal",   name: "Minimal",   color: "#0EAD69", accent: "#0EAD69", tag: "Clean" },
  { id: "executive", name: "Executive", color: "#3A2E5C", accent: "#8B6FD4", tag: "Senior Roles" },
];

const STEPS = [
  { n: "01", title: "Choose a template", desc: "Pick from 4 ATS-friendly designs" },
  { n: "02", title: "Fill your details", desc: "Guided sections with smart tips" },
  { n: "03", title: "Preview live", desc: "See changes update in real time" },
  { n: "04", title: "Download free", desc: "PDF, Print or Image — no cost" },
];

export default function LandingPage({ onStart }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "var(--white)" }}>
      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "var(--nav-h)",
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%",
        transition: "all 0.25s",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <span style={{ fontFamily: "var(--fraunces)", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", fontStyle: "italic" }}>Banao</span>
          <span style={{ fontFamily: "var(--jakarta)", fontSize: "1.5rem", fontWeight: 800, color: "var(--blue)", letterSpacing: "-0.02em" }}>Resume</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "13px", color: "var(--ink3)", fontWeight: 500 }}>banaoresume.in</span>
          <button onClick={onStart} style={{
            background: "var(--blue)", color: "white", border: "none",
            padding: "10px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 700,
            transition: "background 0.15s, transform 0.1s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--blue-dark)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--blue)"}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Build My Resume
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F0F4FF 0%, #FAFAFA 50%, #FFF5F0 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "calc(var(--nav-h) + 40px) 5% 80px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(45,107,228,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "var(--green-light)", color: "var(--green)",
          padding: "6px 16px", borderRadius: "99px", fontSize: "13px", fontWeight: 600,
          marginBottom: "24px", border: "1px solid rgba(14,173,105,0.2)",
        }}>
          <span>🇮🇳</span> India's Free Resume Builder — No Signup Required
        </div>

        <h1 className="fade-up-2" style={{
          fontFamily: "var(--fraunces)", fontSize: "clamp(2.4rem, 5vw, 4rem)",
          fontWeight: 700, lineHeight: 1.15, color: "var(--ink)",
          maxWidth: "780px", marginBottom: "20px",
        }}>
          Create a Resume That Gets You{" "}
          <span style={{ color: "var(--blue)", fontStyle: "italic" }}>Hired in India</span>
        </h1>

        <p className="fade-up-3" style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--ink2)",
          maxWidth: "560px", marginBottom: "36px", lineHeight: 1.7,
        }}>
          ATS-friendly templates, live preview, free PDF download. Built for Naukri, LinkedIn & Indian MNC hiring. No watermarks. No hidden fees.
        </p>

        <div className="fade-up-4" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={onStart} style={{
            background: "var(--blue)", color: "white", border: "none",
            padding: "16px 36px", borderRadius: "10px", fontSize: "16px", fontWeight: 700,
            boxShadow: "0 4px 20px rgba(45,107,228,0.35)",
            transition: "all 0.15s", display: "flex", alignItems: "center", gap: "8px",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--blue-dark)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--blue)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Build My Resume Free
            <span style={{ fontSize: "18px" }}>→</span>
          </button>
          <button onClick={onStart} style={{
            background: "white", color: "var(--ink)", border: "1.5px solid var(--border)",
            padding: "16px 32px", borderRadius: "10px", fontSize: "16px", fontWeight: 600,
            transition: "all 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--blue)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            View Templates
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center",
          marginTop: "60px",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--fraunces)", fontSize: "2rem", fontWeight: 700, color: "var(--blue)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "13px", color: "var(--ink3)", fontWeight: 500, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Floating resume mockup */}
        <div style={{
          marginTop: "60px", background: "white", borderRadius: "16px",
          boxShadow: "var(--shadow-xl)", overflow: "hidden",
          width: "min(560px, 90vw)", border: "1px solid var(--border)",
          animation: "fadeUp 0.7s 0.4s ease both",
        }}>
          <div style={{ background: "var(--ink)", padding: "18px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ display: "flex", gap: "6px" }}>
              {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
            </div>
            <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "200px" }}>
            <div style={{ background: "#F8F7F4", padding: "20px", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>EDITOR</div>
              {["Full Name", "Job Title", "Email", "Experience"].map((f,i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <div style={{ fontSize: "9px", color: "var(--ink3)", marginBottom: "3px", fontWeight: 600 }}>{f.toUpperCase()}</div>
                  <div style={{ height: "26px", background: "white", borderRadius: "5px", border: "1px solid var(--border)" }} />
                </div>
              ))}
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "12px" }}>LIVE PREVIEW</div>
              <div style={{ background: "var(--blue)", height: "40px", borderRadius: "5px 5px 0 0", marginBottom: "8px", display: "flex", alignItems: "center", padding: "0 10px" }}>
                <div style={{ width: "60%", height: "8px", background: "rgba(255,255,255,0.6)", borderRadius: "4px" }} />
              </div>
              {[80,60,70,50,65].map((w,i) => <div key={i} style={{ height: "7px", background: "#F0EEF8", borderRadius: "4px", marginBottom: "5px", width: w+"%" }} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 5%", background: "var(--white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Simple Process</div>
            <h2 style={{ fontFamily: "var(--fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "var(--ink)" }}>Resume ready in 4 steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ position: "relative", padding: "28px 24px", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--border)", background: "var(--white)", transition: "box-shadow 0.2s, border-color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--blue)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div style={{ fontFamily: "var(--fraunces)", fontSize: "3rem", fontWeight: 700, color: "var(--blue-light)", lineHeight: 1, marginBottom: "12px" }}>{s.n}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>{s.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--ink3)", lineHeight: 1.6 }}>{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <div style={{ position: "absolute", right: "-13px", top: "50%", transform: "translateY(-50%)", fontSize: "20px", color: "var(--border)", display: window.innerWidth < 600 ? "none" : "block", zIndex: 1 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section style={{ padding: "80px 5%", background: "var(--off)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Templates</div>
            <h2 style={{ fontFamily: "var(--fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "var(--ink)" }}>ATS-friendly designs that get noticed</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {TEMPLATES.map((t, i) => (
              <div key={i} onClick={onStart} style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1.5px solid var(--border)", cursor: "pointer", background: "white", transition: "all 0.2s", boxShadow: "var(--shadow-sm)" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
              >
                <div style={{ background: t.color, padding: "28px 20px 20px", position: "relative" }}>
                  {t.tag && <div style={{ position: "absolute", top: "10px", right: "10px", background: t.accent, color: "white", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "99px" }}>{t.tag}</div>}
                  <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "6px", padding: "12px" }}>
                    <div style={{ width: "50%", height: "4px", background: t.accent, borderRadius: "2px", marginBottom: "8px" }} />
                    {[85, 65, 75, 55, 70].map((w, j) => <div key={j} style={{ width: w+"%", height: "5px", background: "rgba(255,255,255,0.18)", borderRadius: "2px", marginBottom: "5px" }} />)}
                  </div>
                </div>
                <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
                  <span style={{ fontSize: "12px", color: "var(--blue)", fontWeight: 600 }}>Use this →</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <button onClick={onStart} style={{ background: "var(--blue)", color: "white", border: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, cursor: "pointer" }}>
              Start Building Free →
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 5%", background: "var(--white)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>Why BanaoResume</div>
            <h2 style={{ fontFamily: "var(--fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "var(--ink)" }}>Everything you need to land the job</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ padding: "28px", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--border)", background: "var(--white)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--blue-light)"; e.currentTarget.style.borderColor = "var(--blue)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--white)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                <div style={{ fontSize: "28px", marginBottom: "14px" }}>{f.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "14px", color: "var(--ink2)", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 5%", background: "var(--ink)", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--fraunces)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, color: "white", marginBottom: "16px", fontStyle: "italic" }}>
            Your dream job is one resume away
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", marginBottom: "36px", lineHeight: 1.7 }}>
            Join lakhs of Indian job seekers who built their resume on BanaoResume. Free, fast, and ATS-ready.
          </p>
          <button onClick={onStart} style={{
            background: "var(--blue)", color: "white", border: "none",
            padding: "18px 44px", borderRadius: "10px", fontSize: "17px", fontWeight: 700,
            boxShadow: "0 4px 24px rgba(45,107,228,0.5)", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--blue-dark)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--blue)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Build My Resume — It's Free →
          </button>
          <p style={{ marginTop: "16px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>No signup · No credit card · Download PDF free</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F0F1A", padding: "28px 5%", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <span style={{ fontFamily: "var(--fraunces)", fontSize: "1.1rem", fontWeight: 700, color: "white", fontStyle: "italic" }}>Banao</span>
          <span style={{ fontFamily: "var(--jakarta)", fontSize: "1.1rem", fontWeight: 800, color: "var(--blue)" }}>Resume</span>
        </div>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>© 2026 banaoresume.in · Made with ❤️ in India</span>
      </footer>
    </div>
  );
}
