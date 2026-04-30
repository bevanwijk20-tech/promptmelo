import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Promptmelo",
  description: "Learn how to write better AI prompts. Tips, guides and tutorials on prompt engineering for ChatGPT, Claude, Gemini and more.",
};

const posts = [
  {
    slug: "how-to-optimize-ai-prompts",
    title: "How to Optimize AI Prompts for Better Results",
    description: "Most people get mediocre AI results because their prompts are too vague. Here's how to fix that in 4 simple steps.",
    date: "April 30, 2026",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f6ff", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&display=swap');`}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: 48 }}>
          <Link href="/landing" style={{ fontSize: 13, color: "#6366f1", textDecoration: "none", fontFamily: "DM Mono, monospace" }}>← Back to home</Link>
          <h1 style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.03em", margin: "16px 0 8px", fontFamily: "Fraunces, Georgia, serif", color: "#0f172a" }}>Blog</h1>
          <p style={{ fontSize: 15, color: "#7b8db5", fontWeight: 300 }}>Guides and tips on writing better AI prompts.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", border: "1px solid #dde2f5", borderRadius: 16, padding: "28px 28px", boxShadow: "0 2px 12px rgba(99,102,241,0.06)", transition: "transform 0.2s", cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>{post.date}</span>
                  <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>·</span>
                  <span style={{ fontSize: 11, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 10, color: "#0f172a" }}>{post.title}</h2>
                <p style={{ fontSize: 14, color: "#7b8db5", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{post.description}</p>
                <div style={{ marginTop: 16, fontSize: 13, color: "#6366f1", fontWeight: 500 }}>Read more →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}