"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Prompt = {
  id: string;
  original_prompt: string;
  optimized_prompt: string;
  original_score: number;
  optimized_score: number;
  category: string;
  best_for: string;
  created_at: string;
};

const themes = {
  dark: {
    bg: "#080f1e", bgCard: "#0d1829", bgTag: "#0a1220",
    bgBadge: "#11173a", border: "#1a2540",
    textPrimary: "#eef2ff", textSecondary: "#8899bb", textMuted: "#4a5a7a",
    textTag: "#5a7aaa", textBadge: "#818cf8", textAccent: "#a5b4fc",
    headerBg: "rgba(8,15,30,0.92)", navActiveBg: "#0d1829",
    navActiveTxt: "#eef2ff", navInactiveTxt: "#3a4a6a",
    cardShadow: "none",
  },
  light: {
    bg: "#f4f6ff", bgCard: "#ffffff", bgTag: "#eef0ff",
    bgBadge: "#eef0ff", border: "#dde2f5",
    textPrimary: "#0f172a", textSecondary: "#374980", textMuted: "#7b8db5",
    textTag: "#4a5ea8", textBadge: "#4f46e5", textAccent: "#4f46e5",
    headerBg: "rgba(244,246,255,0.92)", navActiveBg: "#eef0ff",
    navActiveTxt: "#0f172a", navInactiveTxt: "#9aaad0",
    cardShadow: "0 1px 10px rgba(99,102,241,0.08)",
  },
};

export default function LibraryPage() {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const t = themes[mode];

  useEffect(() => {
    const saved = localStorage.getItem("pp-mode") as "dark" | "light" | null;
    if (saved) setMode(saved);
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("prompts").select("*").order("created_at", { ascending: false });
      setPrompts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  function toggleMode() {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem("pp-mode", next);
  }

  async function deletePrompt(id: string) {
    await supabase.from("prompts").delete().eq("id", id);
    setPrompts(p => p.filter(x => x.id !== id));
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'DM Sans', system-ui, sans-serif", color: t.textPrimary, transition: "background 0.25s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <header style={{ borderBottom: `1px solid ${t.border}`, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, background: t.headerBg, position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🍉</span>
          <span style={{ fontWeight: 600, fontSize: 15, color: t.textPrimary }}>Promptmelo</span>
          <span style={{ fontSize: 10, fontFamily: "DM Mono, monospace", background: t.bgBadge, color: t.textBadge, padding: "2px 7px", borderRadius: 4, border: `1px solid ${t.border}` }}>BETA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <nav style={{ display: "flex", gap: 2 }}>
            {([["Optimizer", "/"], ["Library", "/library"]] as [string, string][]).map(([label, href]) => (
              <button key={label} onClick={() => router.push(href)} style={{ background: label === "Library" ? t.navActiveBg : "transparent", border: "none", color: label === "Library" ? t.navActiveTxt : t.navInactiveTxt, padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>{label}</button>
            ))}
          </nav>
          <button onClick={toggleMode} style={{ background: t.bgTag, border: `1px solid ${t.border}`, color: t.textMuted, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 4 }}>
            {mode === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px 80px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px", color: t.textPrimary }}>Your prompt library</h1>
          <p style={{ color: t.textSecondary, fontSize: 14, margin: 0 }}>{prompts.length} saved {prompts.length === 1 ? "prompt" : "prompts"}</p>
        </div>

        {loading && <p style={{ color: t.textMuted, fontSize: 14 }}>Loading...</p>}

        {!loading && prompts.length === 0 && (
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "48px 24px", textAlign: "center", boxShadow: t.cardShadow }}>
            <p style={{ color: t.textMuted, fontSize: 14, margin: "0 0 16px" }}>No saved prompts yet.</p>
            <button onClick={() => router.push("/")} style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "#fff", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
              Optimize your first prompt →
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {prompts.map(prompt => (
            <div key={prompt.id} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "20px 24px", boxShadow: t.cardShadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 12 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, background: t.bgTag, border: `1px solid ${t.border}`, color: t.textAccent, padding: "2px 9px", borderRadius: 5, fontFamily: "DM Mono, monospace" }}>{prompt.category}</span>
                  <span style={{ fontSize: 11, background: t.bgTag, border: `1px solid ${t.border}`, color: t.textTag, padding: "2px 9px", borderRadius: 5, fontFamily: "DM Mono, monospace" }}>{prompt.best_for}</span>
                  <span style={{ fontSize: 11, color: "#22c55e", fontFamily: "DM Mono, monospace" }}>+{prompt.optimized_score - prompt.original_score} pts</span>
                </div>
                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: "DM Mono, monospace", whiteSpace: "nowrap" }}>
                  {new Date(prompt.created_at).toLocaleDateString()}
                </span>
              </div>
              <p style={{ fontSize: 13, color: t.textSecondary, margin: "0 0 16px", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as any}>
                {prompt.optimized_prompt}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => copyToClipboard(prompt.optimized_prompt, prompt.id)} style={{ background: copied === prompt.id ? "#0a1f10" : t.bgTag, border: `1px solid ${copied === prompt.id ? "#166534" : t.border}`, color: copied === prompt.id ? "#86efac" : t.textTag, padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace" }}>
                  {copied === prompt.id ? "✓ Copied" : "Copy"}
                </button>
                <button onClick={() => deletePrompt(prompt.id)} style={{ background: "transparent", border: `1px solid ${t.border}`, color: t.textMuted, padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontSize: 11, fontFamily: "DM Mono, monospace" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}