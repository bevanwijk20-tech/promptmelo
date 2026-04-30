import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Optimize AI Prompts for Better Results — Promptmelo",
  description: "Most people get mediocre AI results because their prompts are too vague. Here's how to fix that in 4 simple steps using prompt engineering techniques.",
  keywords: ["optimize AI prompts", "better ChatGPT prompts", "prompt engineering", "how to write better prompts", "prompt optimizer"],
};

export default function BlogPost() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6ff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px" }}>
        <Link href="/blog" style={{ fontSize: 13, color: "#6366f1", textDecoration: "none", fontFamily: "DM Mono, monospace" }}>← Back to blog</Link>

        <div style={{ marginTop: 24, marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>April 30, 2026</span>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>·</span>
            <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>5 min read</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 0 16px", fontFamily: "Fraunces, Georgia, serif", color: "#0f172a" }}>
            How to Optimize AI Prompts for Better Results
          </h1>
          <p style={{ fontSize: 18, color: "#7b8db5", fontWeight: 300, lineHeight: 1.7, margin: 0 }}>
            Most people get mediocre AI results because their prompts are too vague. Here's how to fix that in 4 simple steps.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

          <section>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300 }}>
              You've probably noticed it. You type something into ChatGPT or Claude, and the response is just... okay. Not bad, but not what you actually wanted. You tweak it, try again, still not right. Sound familiar?
            </p>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300, marginTop: 16 }}>
              The problem isn't the AI. The problem is the prompt. And the good news is — writing better prompts is a skill anyone can learn.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, color: "#0f172a" }}>Why most prompts fail</h2>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300 }}>
              AI models are incredibly powerful, but they need clear instructions. When you write "write me a blog post about AI," you're giving the model almost nothing to work with. Who is it for? How long? What tone? What angle?
            </p>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300, marginTop: 16 }}>
              The AI fills in the blanks with assumptions — and those assumptions are usually wrong.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, color: "#0f172a" }}>The 4-step framework for better prompts</h2>

            {[
              {
                num: "01",
                title: "Add a role",
                bad: "Write a marketing email",
                good: "Act as an experienced email marketer specializing in SaaS products",
                why: "Giving the AI a role frames its perspective and expertise level. You get more targeted, professional output instantly.",
              },
              {
                num: "02",
                title: "Specify your goal clearly",
                bad: "Help me with my code",
                good: "Debug this Python function and explain step by step what caused the error",
                why: "Vague goals produce vague results. The more specific your goal, the more useful the output.",
              },
              {
                num: "03",
                title: "Define the format",
                bad: "Summarize this article",
                good: "Summarize this article in 5 bullet points, each a maximum of one sentence",
                why: "Without a format, you get a wall of text. Specify exactly what you want — bullets, paragraphs, tables, code — and you'll get it.",
              },
              {
                num: "04",
                title: "Add constraints",
                bad: "Write a blog post about AI",
                good: "Write a 600-word blog post about AI for small business owners. Avoid technical jargon. Use a friendly, conversational tone.",
                why: "Constraints prevent generic output. Length, audience, tone, and style all shape the result significantly.",
              },
            ].map(step => (
              <div key={step.num} style={{ background: "#fff", border: "1px solid #dde2f5", borderRadius: 16, padding: "24px 24px", marginBottom: 16, boxShadow: "0 2px 12px rgba(99,102,241,0.06)" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#c7d2fe" }}>{step.num}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#0f172a", margin: 0 }}>{step.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#9f1239", fontFamily: "DM Mono, monospace" }}>
                    ❌ {step.bad}
                  </div>
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#166534", fontFamily: "DM Mono, monospace" }}>
                    ✅ {step.good}
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#7b8db5", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{step.why}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16, color: "#0f172a" }}>The result</h2>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300 }}>
              Apply all four steps and your prompt goes from this:
            </p>
            <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 10, padding: "12px 16px", margin: "12px 0", fontSize: 13, color: "#9f1239", fontFamily: "DM Mono, monospace" }}>
              ❌ "Write a blog post about AI"
            </div>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300 }}>To this:</p>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", margin: "12px 0", fontSize: 13, color: "#166534", fontFamily: "DM Mono, monospace" }}>
              ✅ "Act as a content writer for a tech blog. Write a 600-word blog post about how AI is changing small businesses in 2026. Use a friendly, non-technical tone. Structure it with an intro, 3 main points, and a conclusion with a call-to-action."
            </div>
            <p style={{ fontSize: 16, color: "#374980", lineHeight: 1.85, fontWeight: 300, marginTop: 12 }}>
              The second prompt gets you something you can actually publish. Every time.
            </p>
          </section>

          <section style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 20, padding: "32px 28px", textAlign: "center" }}>
            <span style={{ fontSize: 36, display: "block", marginBottom: 12 }}>🍉</span>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>Let Promptmelo do it for you</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 20, lineHeight: 1.7, fontWeight: 300 }}>
              Don't want to rewrite prompts manually? Paste any prompt into Promptmelo and get an optimized version instantly — with a quality score and explanation of every change.
            </p>
            <Link href="/" style={{ background: "#fff", color: "#6366f1", padding: "10px 24px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
              Try Promptmelo for free →
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}