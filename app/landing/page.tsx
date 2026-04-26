"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-observe]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visible.has(id);

  const features = [
    {
      icon: "✦",
      title: "AI-Powered Optimization",
      desc: "Our AI analyzes your prompt on clarity, context, specificity, and tone — then rewrites it to get you dramatically better results from any AI model.",
    },
    {
      icon: "◎",
      title: "Before & After Score",
      desc: "Every optimization comes with a quality score from 0–100, so you can see exactly how much your prompt improved and track your progress over time.",
    },
    {
      icon: "⊞",
      title: "Personal Prompt Library",
      desc: "Save your best optimized prompts in one place. Search, copy, and reuse them anytime — no more losing great prompts in chat history.",
    },
    {
      icon: "⟡",
      title: "Open your optimized prompt directly in ChatGPT, Claude, Gemini or DeepSeek with one click — no copy-pasting needed.",
      desc: "Whether you use ChatGPT, Claude, Gemini, or any other model — Promptmelo optimizes your prompts for maximum effectiveness across all platforms.",
    },
    {
      icon: "↗",
      title: "Learn As You Go",
      desc: "Every optimization comes with a clear explanation of what changed and why. Over time, you'll naturally write better prompts yourself.",
    },
    {
      icon: "⚡",
      title: "Instant Results",
      desc: "No waiting, no setup. Paste your prompt, click optimize, and get a better version in seconds. It's that simple.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Paste your prompt",
      desc: "Copy any prompt you've been struggling with — whether it's for writing, coding, analysis, or creativity — and paste it into Promptmelo.",
      detail: "Works with any prompt, any length, any topic.",
    },
    {
      num: "02",
      title: "AI analyzes & rewrites",
      desc: "Our AI instantly identifies what's weak about your prompt: missing context, vague instructions, wrong tone, unclear goals — and fixes all of it.",
      detail: "Powered by state-of-the-art language models.",
    },
    {
      num: "03",
      title: "Review the improvements",
      desc: "See exactly what changed and why. You get a quality score, a list of improvements, and the best AI model to use your new prompt with.",
      detail: "Transparent explanations, no black box.",
    },
    {
      num: "04",
      title: "Copy, use & save",
      desc: "Copy your optimized prompt with one click and use it immediately. Save it to your personal library to reuse anytime in the future.",
      detail: "Build your own library of high-quality prompts.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6ff", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f172a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700&family=DM+Mono:wght@400;500&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }
        .reveal-delay-5 { transition-delay: 0.5s; }
        .reveal-delay-6 { transition-delay: 0.6s; }
        .feature-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(99,102,241,0.12); }
        .cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,0.35); }
        .nav-link:hover { color: #6366f1 !important; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 20 ? "rgba(244,246,255,0.92)" : "transparent",
        backdropFilter: scrollY > 20 ? "blur(12px)" : "none",
        borderBottom: scrollY > 20 ? "1px solid #dde2f5" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🍉</span>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a", letterSpacing: "-0.02em" }}>Promptmelo</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {["Features", "How it works", "About"].map(item => (
            <button key={item} className="nav-link" style={{ background: "none", border: "none", color: "#7b8db5", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "DM Sans, system-ui", transition: "color 0.2s" }}
              onClick={() => {
  const id = item === "How it works" ? "how-it-works" : item.toLowerCase();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}}>
              {item}
            </button>
          ))}
          <button className="cta-btn" onClick={() => router.push("/login")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "DM Sans, system-ui" }}>
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", animation: "pulse 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", animation: "pulse 8s ease-in-out infinite 2s" }} />

        <div style={{ animation: "fadeIn 0.6s ease forwards", marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", background: "#eef0ff", color: "#6366f1", border: "1px solid #c7d2fe", padding: "5px 14px", borderRadius: 20, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            ✦ AI Prompt Optimizer
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.08, textAlign: "center", maxWidth: 800, marginBottom: 24, animation: "fadeUp 0.8s ease 0.1s both", fontFamily: "Fraunces, Georgia, serif", color: "#0f172a" }}>
          Better prompts,<br />
          <em style={{ fontStyle: "italic", backgroundImage: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>better results.</em>
        </h1>

        <p style={{ fontSize: 18, fontWeight: 300, color: "#374980", textAlign: "center", maxWidth: 520, lineHeight: 1.7, marginBottom: 40, animation: "fadeUp 0.8s ease 0.2s both" }}>
          Paste any prompt and get an AI-optimized version with a quality score and explanation — in seconds.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.8s ease 0.3s both", marginBottom: 64 }}>
          <button className="cta-btn" onClick={() => router.push("/login")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", padding: "13px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 500, fontFamily: "DM Sans, system-ui" }}>
            Start optimizing for free →
          </button>
          <button onClick={() => router.push("/")} style={{ background: "#fff", border: "1px solid #dde2f5", color: "#374980", padding: "13px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 500, fontFamily: "DM Sans, system-ui" }}>
            Try the optimizer
          </button>
        </div>

        {/* Hero mockup */}
        <div style={{ animation: "fadeUp 0.9s ease 0.4s both, float 6s ease-in-out 1s infinite", width: "100%", maxWidth: 680 }}>
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #dde2f5", boxShadow: "0 32px 80px rgba(99,102,241,0.12), 0 8px 24px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f2ff", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fca5a5" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fcd34d" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#86efac" }} />
              <div style={{ flex: 1, height: 24, background: "#f4f6ff", borderRadius: 6, marginLeft: 8, display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <span style={{ fontSize: 11, color: "#b0bdd8", fontFamily: "DM Mono, monospace" }}>promptmelo.com</span>
              </div>
            </div>
            <div style={{ padding: "28px 28px 24px" }}>
              <div style={{ background: "#f4f6ff", borderRadius: 12, border: "1px solid #eef0ff", padding: "14px 16px", marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your prompt</div>
                <div style={{ fontSize: 13, color: "#7b8db5", lineHeight: 1.6 }}>Write a blog post about artificial intelligence and how it affects businesses.</div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", padding: "8px 20px", borderRadius: 8, fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>✦</span> Optimizing...
                  <span style={{ width: 10, height: 10, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin-slow 0.7s linear infinite" }} />
                </div>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0", padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontFamily: "DM Mono, monospace", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#166534" }}>Optimized prompt</span>
                  <span style={{ color: "#22c55e" }}>+42 pts ↑</span>
                </div>
                <div style={{ fontSize: 13, color: "#374980", lineHeight: 1.6 }}>Act as a business strategist and content writer. Write a 1200-word blog post exploring how AI is transforming business operations in 2025, covering automation, decision-making, and customer experience. Include 3 real-world examples and end with actionable steps for business leaders.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <div id="features-header" data-observe className={`reveal ${isVisible("features-header") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>Features</span>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, letterSpacing: "-0.03em", margin: "12px 0 16px", fontFamily: "Fraunces, Georgia, serif" }}>
            Everything you need to<br /><em style={{ fontStyle: "italic", color: "#6366f1" }}>prompt better</em>
          </h2>
          <p style={{ color: "#7b8db5", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontWeight: 300 }}>
            A complete toolkit for anyone who uses AI daily and wants to get consistently better results.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} id={`feat-${i}`} data-observe className={`feature-card reveal reveal-delay-${(i % 3) + 1} ${isVisible(`feat-${i}`) ? "visible" : ""}`}
              style={{ background: "#fff", border: "1px solid #dde2f5", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 12px rgba(99,102,241,0.06)" }}>
              <div style={{ fontSize: 20, marginBottom: 16, width: 48, height: 48, background: "#eef0ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1" }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em", color: "#0f172a" }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#7b8db5", lineHeight: 1.75, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: "100px 24px", background: "#fff", borderTop: "1px solid #eef0ff", borderBottom: "1px solid #eef0ff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div id="how-header" data-observe className={`reveal ${isVisible("how-header") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>How it works</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, letterSpacing: "-0.03em", margin: "12px 0", fontFamily: "Fraunces, Georgia, serif" }}>
              From weak prompt to<br /><em style={{ fontStyle: "italic", color: "#6366f1" }}>powerful result</em>
            </h2>
            <p style={{ color: "#7b8db5", fontSize: 16, maxWidth: 480, margin: "16px auto 0", lineHeight: 1.7, fontWeight: 300 }}>
              Four simple steps to transform any prompt into something that actually works.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <div key={i} id={`step-${i}`} data-observe className={`reveal reveal-delay-${i + 1} ${isVisible(`step-${i}`) ? "visible" : ""}`}
                style={{ display: "flex", gap: 32, padding: "36px 0", borderBottom: i < steps.length - 1 ? "1px solid #eef0ff" : "none", alignItems: "flex-start" }}>
                <div style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#c7d2fe", fontWeight: 500, minWidth: 32, paddingTop: 3 }}>{step.num}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 10, color: "#0f172a" }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "#374980", lineHeight: 1.75, fontWeight: 300, marginBottom: 8 }}>{step.desc}</p>
                  <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>{step.detail}</span>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, flexShrink: 0 }}>
                  {["⌥", "⟡", "◎", "⊞"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div id="about-header" data-observe className={`reveal ${isVisible("about-header") ? "visible" : ""}`} style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#6366f1", letterSpacing: "0.1em", textTransform: "uppercase" }}>About</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 300, letterSpacing: "-0.03em", margin: "12px 0", fontFamily: "Fraunces, Georgia, serif" }}>
              Built out of<br /><em style={{ fontStyle: "italic", color: "#6366f1" }}>frustration.</em>
            </h2>
          </div>
          <div id="about-content" data-observe className={`reveal reveal-delay-1 ${isVisible("about-content") ? "visible" : ""}`}>
            <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <p style={{ fontSize: 18, color: "#374980", lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
                  "I kept writing prompts that were just not good enough to get the AI results I wanted. I'd spend more time tweaking my prompt than actually doing the work."
                </p>
                <p style={{ fontSize: 15, color: "#7b8db5", lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
                  Hi, I'm Berend — a 17-year-old student from the Netherlands. I built Promptmelo because I got frustrated with writing prompts that never quite hit the mark. I'd know what I wanted, but the AI kept missing it.
                </p>
                <p style={{ fontSize: 15, color: "#7b8db5", lineHeight: 1.8, fontWeight: 300 }}>
                  So I built the tool I wished existed: something that takes your rough prompt and turns it into exactly what you meant. Simple, fast, and free to use.
                </p>
              </div>
              <div style={{ width: 240, flexShrink: 0 }}>
                <div style={{ background: "#fff", border: "1px solid #dde2f5", borderRadius: 20, padding: "28px 24px", boxShadow: "0 2px 12px rgba(99,102,241,0.06)" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #eef0ff, #c7d2fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>👋</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>Berend van Wijk</h3>
                  <p style={{ fontSize: 12, fontFamily: "DM Mono, monospace", color: "#b0bdd8", marginBottom: 16 }}>17 · Student · Netherlands</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {["Built Promptmelo at 17", "Frustrated AI user → builder", "Based in the Netherlands"].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "#7b8db5" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", background: "#fff", borderTop: "1px solid #eef0ff" }}>
        <div id="cta" data-observe className={`reveal ${isVisible("cta") ? "visible" : ""}`}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <span style={{ fontSize: 56, display: "block", marginBottom: 24 }}>🍉</span>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, letterSpacing: "-0.03em", marginBottom: 16, fontFamily: "Fraunces, Georgia, serif", lineHeight: 1.15 }}>
              Start getting better<br /><em style={{ fontStyle: "italic", color: "#6366f1" }}>AI results today</em>
            </h2>
            <p style={{ color: "#7b8db5", fontSize: 16, marginBottom: 36, lineHeight: 1.7, fontWeight: 300 }}>
              Join people who use Promptmelo to get more out of every AI interaction.
            </p>
            <button className="cta-btn" onClick={() => router.push("/login")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", padding: "15px 36px", borderRadius: 12, cursor: "pointer", fontSize: 16, fontWeight: 500, fontFamily: "DM Sans, system-ui" }}>
              Get started for free →
            </button>
            <p style={{ color: "#b0bdd8", fontSize: 12, marginTop: 16, fontFamily: "DM Mono, monospace" }}>No credit card required · Free to use</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #eef0ff", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🍉</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Promptmelo</span>
        </div>
        <p style={{ fontSize: 12, color: "#b0bdd8", fontFamily: "DM Mono, monospace" }}>© 2025 Promptmelo · Built by Berend van Wijk</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy", "Terms", "Contact"].map(item => (
            <button key={item} style={{ background: "none", border: "none", color: "#b0bdd8", fontSize: 12, cursor: "pointer", fontFamily: "DM Sans, system-ui" }}>{item}</button>
          ))}
        </div>
      </footer>
    </div>
  );
}