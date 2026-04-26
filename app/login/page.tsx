"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Check your email to confirm your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080f1e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span style={{ fontSize: 52, display: "block", marginBottom: 12 }}>🍉</span>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: "#eef2ff", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Promptmelo</h1>
          <p style={{ color: "#4a5a7a", fontSize: 13, margin: 0 }}>{isSignUp ? "Create your account" : "Welcome back"}</p>
        </div>

        <div style={{ background: "#0d1829", border: "1px solid #1a2540", borderRadius: 16, padding: "28px 24px" }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 11, fontFamily: "DM Mono, monospace", color: "#4a5a7a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: "100%", background: "#0a1220", border: "1px solid #1a2540", borderRadius: 8, padding: "10px 14px", color: "#eef2ff", fontSize: 14, outline: "none", fontFamily: "DM Sans, system-ui", boxSizing: "border-box" }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontFamily: "DM Mono, monospace", color: "#4a5a7a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: "100%", background: "#0a1220", border: "1px solid #1a2540", borderRadius: 8, padding: "10px 14px", color: "#eef2ff", fontSize: 14, outline: "none", fontFamily: "DM Sans, system-ui", boxSizing: "border-box" }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {error && (
            <div style={{ background: "#1a0808", border: "1px solid #7f1d1d", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#fca5a5", fontSize: 13 }}>{error}</div>
          )}
          {message && (
            <div style={{ background: "#0a1f10", border: "1px solid #166534", borderRadius: 8, padding: "10px 14px", marginBottom: 16, color: "#86efac", fontSize: 13 }}>{message}</div>
          )}

          <button onClick={handleSubmit} disabled={loading || !email || !password}
            style={{ width: "100%", background: loading || !email || !password ? "#111f33" : "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: loading || !email || !password ? "#3a4a6a" : "#fff", padding: "11px", borderRadius: 8, cursor: loading || !email || !password ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 500, fontFamily: "DM Sans, system-ui" }}>
            {loading ? "Loading..." : isSignUp ? "Create account" : "Sign in"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#4a5a7a" }}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
            style={{ background: "none", border: "none", color: "#818cf8", cursor: "pointer", fontSize: 13, fontFamily: "DM Sans, system-ui" }}>
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}