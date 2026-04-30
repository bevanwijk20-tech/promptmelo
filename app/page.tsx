"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const SYSTEM_PROMPT = `You are an expert prompt engineer. Your job is to optimize user prompts to get better results from AI models.

When given a prompt, you will:
1. Analyze its weaknesses (vagueness, missing context, unclear goal, wrong format, etc.)
2. Return an improved version
3. Give a quality score from 0-100 for the original
4. Give a quality score from 0-100 for the optimized version
5. List exactly what you changed and why (max 4 bullet points)
6. Identify which AI model this prompt is best suited for

Respond ONLY with valid JSON in this exact format:
{
  "original_score": 42,
  "optimized_score": 87,
  "optimized_prompt": "The full improved prompt here...",
  "changes": [
    "Added role context so the AI knows what perspective to take",
    "Specified output format to avoid ambiguous responses",
    "Added constraints to keep the response focused"
  ],
  "best_for": "Claude / ChatGPT / Any model",
  "category": "Writing / Coding / Analysis / Creative / Business"
}`;

const themes = {
  dark: {
    bg: "#080f1e", bgCard: "#0d1829", bgTag: "#0a1220", bgTagHover: "#0f1a2e",
    bgBadge: "#11173a", bgSuccess: "#0a1f10", bgError: "#1a0808",
    border: "#1a2540", borderStrong: "#243050", borderSuccess: "#166534", borderError: "#7f1d1d",
    textPrimary: "#eef2ff", textSecondary: "#8899bb", textMuted: "#4a5a7a",
    textPlaceholder: "#2a3a55", textTag: "#5a7aaa",
    textBadge: "#818cf8", textSuccess: "#86efac", textError: "#fca5a5", textAccent: "#a5b4fc",
    scrollThumb: "#1a2540", ringTrack: "#1a2540", arrow: "#2a3a55",
    headerBg: "rgba(8,15,30,0.92)", navActive: "#0d1829", navActiveTxt: "#eef2ff",
    navInactiveTxt: "#3a4a6a", gradient: "linear-gradient(135deg, #eef2ff 20%, #818cf8)",
    btnDisabledBg: "#111f33", btnDisabledTxt: "#3a4a6a", spinnerTrack: "#3a4a6a", cardShadow: "none",
  },
  light: {
    bg: "#f4f6ff", bgCard: "#ffffff", bgTag: "#eef0ff", bgTagHover: "#e4e8ff",
    bgBadge: "#eef0ff", bgSuccess: "#f0fdf4", bgError: "#fff1f2",
    border: "#dde2f5", borderStrong: "#c5cce8", borderSuccess: "#bbf7d0", borderError: "#fecdd3",
    textPrimary: "#0f172a", textSecondary: "#374980", textMuted: "#7b8db5",
    textPlaceholder: "#b0bdd8", textTag: "#4a5ea8",
    textBadge: "#4f46e5", textSuccess: "#166534", textError: "#9f1239", textAccent: "#4f46e5",
    scrollThumb: "#dde2f5", ringTrack: "#e2e8f0", arrow: "#c5cce8",
    headerBg: "rgba(244,246,255,0.92)", navActive: "#eef0ff", navActiveTxt: "#0f172a",
    navInactiveTxt: "#9aaad0", gradient: "linear-gradient(135deg, #1e1b4b 20%, #6366f1)",
    btnDisabledBg: "#eef0ff", btnDisabledTxt: "#b0bdd8", spinnerTrack: "#c5cce8",
    cardShadow: "0 1px 10px rgba(99,102,241,0.08)",
  },
};

export default function PromptOptimizer() {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("optimized");
  const [user, setUser] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const supabase = createClient();
  const t = themes[mode];

  useEffect(() => {
    const saved = localStorage.getItem("pp-mode") as "dark" | "light" | null;
    if (saved) setMode(saved);
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  function toggleMode() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("pp-mode", next);
  }

  async function optimize() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);
    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function savePrompt() {
    if (!user) { router.push("/login"); return; }
    await supabase.from("prompts").insert({
      user_id: user.id,
      original_prompt: input,
      optimized_prompt: result.optimized_prompt,
      original_score: result.original_score,
      optimized_score: result.optimized_score,
      category: result.category,
      best_for: result.best_for,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openInAI() {
    const prompt = encodeURIComponent(result.optimized_prompt);
    const model = result.best_for?.toLowerCase() || "";
    let url = `https://chatgpt.com/?q=${prompt}`;
    if (model.includes("claude")) url = `https://claude.ai/new?q=${prompt}`;
    else if (model.includes("gemini")) url = `https://gemini.google.com/app?q=${prompt}`;
    else if (model.includes("deepseek")) url = `https://chat.deepseek.com/?q=${prompt}`;
    window.open(url, "_blank");
  }

  const ScoreRing = ({ score, label }: { score: number; label: string }) => {
    const size = 76, r = size / 2 - 7;
    const circ = 2 * Math.PI * r;
    const dash = (score / 100) * circ;
    const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.ringTrack} strokeWidth={5} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
          <text x={size / 2} y={size / 2 + 6} textAnchor="middle" fill={t.textPrimary}
            fontSize={17} fontWeight="600"
            style={{ transform: `rotate(90deg)`, transformOrigin: `${size / 2}px ${size / 2}px`, fontFamily: "monospace" }}>
            {score}
          </text>
        </svg>
        <span style={{ fontSize: 10, color: t.textMuted, fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
      </div>
    );
  };

  const examplePrompts = ["Write a blog post about AI", "Help me with my email", "Explain machine learning", "Python script for data analysis"];
  const isDisabled = loading || !input.trim();
  const card = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, boxShadow: t.cardShadow, transition: "background 0.25s, border-color 0.25s" };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'DM Sans', system-ui, sans-serif", color: t.textPrimary, transition: "background 0.25s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        textarea { caret-color: #6366f1; }
        textarea::placeholder { color: ${t.textPlaceholder}; }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 2px; }
      `}</style>

      <header style={{ borderBottom: `1px solid ${t.border}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, background: t.headerBg, position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(10px)", transition: "background 0.25s, border-color 0.25s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🍉</span>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: "-0.02em", color: t.textPrimary }}>Promptmelo</span>
          <span style={{ fontSize: 10, fontFamily: "DM Mono, monospace", background: t.bgBadge, color: t.textBadge, padding: "2px 7px", borderRadius: 4, border: `1px solid ${t.border}` }}>BETA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <nav style={{ display: "flex", gap: 2 }}>
            {([["Optimizer", "/"], ["Library", "/library"], ["Blog", "/blog"]] as [string, string][]).map(([label, href]) => (
              <button key={label} onClick={() => router.push(href)} style={{ background: label === "Optimizer" ? t.navActive : "transparent", border: "none", color: label === "Optimizer" ? t.navActiveTxt : t.navInactiveTxt, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>{label}</button>
            ))}
          </nav>
          {user ? (
            <button onClick={signOut} style={{ background: t.bgTag, border: `1px solid ${t.border}`, color: t.textMuted, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "DM Mono, monospace", marginLeft: 4 }}>Sign out</button>
          ) : (
            <button onClick={() => router.push("/login")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", padding: "5px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 500, marginLeft: 4 }}>Sign in</button>
          )}
          <button onClick={toggleMode} style={{ background: t.bgTag, border: `1px solid ${t.border}`, color: t.textMuted, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}>
            {mode === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h1 style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 12px", backgroundImage: t.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "inline-block", paddingBottom: 4, lineHeight: 1.2 }}>
            Transform your prompts
          </h1>
          <p style={{ color: t.textSecondary, fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Paste any prompt. Get an AI-optimized version with a quality score and explanation.
          </p>
        </div>

        <div style={{ ...card, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ padding: "10px 16px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Your prompt</span>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: t.textMuted }}>{input.length} chars</span>
          </div>
          <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your prompt here..."
            style={{ width: "100%", minHeight: 140, background: "transparent", border: "none", outline: "none", color: t.textPrimary, fontSize: 14, lineHeight: 1.75, padding: "16px 20px", resize: "none", fontFamily: "DM Sans, system-ui", boxSizing: "border-box" }}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") optimize(); }} />
          <div style={{ padding: "10px 16px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {examplePrompts.map(ex => (
                <button key={ex} onClick={() => setInput(ex)} style={{ background: t.bgTag, border: `1px solid ${t.border}`, color: t.textTag, padding: "3px 10px", borderRadius: 20, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace" }}>{ex}</button>
              ))}
            </div>
            <button onClick={optimize} disabled={isDisabled} style={{ background: isDisabled ? t.btnDisabledBg : "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: isDisabled ? t.btnDisabledTxt : "#fff", padding: "8px 20px", borderRadius: 8, cursor: isDisabled ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 7 }}>
              {loading ? (<><span style={{ width: 12, height: 12, border: `2px solid ${t.spinnerTrack}`, borderTopColor: "#6366f1", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Optimizing...</>) : (<>✦ Optimize <span style={{ fontSize: 10, opacity: 0.5 }}>⌘↵</span></>)}
            </button>
          </div>
        </div>

        {error && <div style={{ background: t.bgError, border: `1px solid ${t.borderError}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20, color: t.textError, fontSize: 13 }}>{error}</div>}

        {result && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ ...card, padding: "22px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <ScoreRing score={result.original_score} label="Before" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ color: t.arrow, fontSize: 20 }}>→</span>
                  <span style={{ fontSize: 11, color: "#22c55e", fontFamily: "DM Mono, monospace", fontWeight: 500 }}>+{result.optimized_score - result.original_score}</span>
                </div>
                <ScoreRing score={result.optimized_score} label="After" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {([["BEST FOR", result.best_for, t.textAccent], ["CATEGORY", result.category, t.textSecondary]] as [string, string, string][]).map(([label, val, col]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: t.textMuted, fontFamily: "DM Mono, monospace", minWidth: 64 }}>{label}</span>
                    <span style={{ fontSize: 11, background: t.bgTag, border: `1px solid ${t.border}`, color: col, padding: "2px 9px", borderRadius: 5, fontFamily: "DM Mono, monospace" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...card, overflow: "hidden", marginBottom: 14 }}>
              <div style={{ display: "flex", borderBottom: `1px solid ${t.border}`, padding: "0 4px" }}>
                {["optimized", "changes"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent", color: activeTab === tab ? t.textPrimary : t.textMuted, padding: "12px 16px", cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: -1 }}>
                    {tab === "optimized" ? "Optimized prompt" : "What changed"}
                  </button>
                ))}
              </div>
              {activeTab === "optimized" && (
                <div style={{ padding: "20px" }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: t.textSecondary, margin: "0 0 16px", whiteSpace: "pre-wrap" }}>{result.optimized_prompt}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={() => copyToClipboard(result.optimized_prompt)} style={{ background: copied ? t.bgSuccess : t.bgTag, border: `1px solid ${copied ? t.borderSuccess : t.border}`, color: copied ? t.textSuccess : t.textTag, padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace" }}>
                      {copied ? "✓ Copied" : "Copy prompt"}
                    </button>
                    <button onClick={savePrompt} style={{ background: saved ? t.bgSuccess : t.bgTag, border: `1px solid ${saved ? t.borderSuccess : t.border}`, color: saved ? t.textSuccess : t.textTag, padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace" }}>
                      {saved ? "✓ Saved" : "Save to library"}
                    </button>
                    <button onClick={openInAI} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace", display: "flex", alignItems: "center", gap: 5 }}>
                      Open in {result.best_for?.split("/")[0].trim() || "AI"} ↗
                    </button>
                  </div>
                </div>
              )}
              {activeTab === "changes" && (
                <div style={{ padding: "8px 20px 20px" }}>
                  {result.changes.map((change: string, i: number) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 0", borderBottom: i < result.changes.length - 1 ? `1px solid ${t.border}` : "none" }}>
                      <div style={{ width: 22, height: 22, minWidth: 22, background: t.bgBadge, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: t.textBadge, fontFamily: "DM Mono, monospace", fontWeight: 500 }}>{i + 1}</div>
                      <p style={{ margin: 0, fontSize: 13, color: t.textSecondary, lineHeight: 1.65 }}>{change}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <button onClick={() => { setInput(result.optimized_prompt); setResult(null); }} style={{ background: "transparent", border: `1px solid ${t.border}`, color: t.textMuted, padding: "7px 18px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace" }}>
                ↺ Optimize again
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
