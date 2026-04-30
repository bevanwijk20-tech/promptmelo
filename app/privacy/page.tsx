export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f172a", lineHeight: 1.8 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 24, display: "block", marginBottom: 16 }}>🍉</span>
        <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, fontFamily: "DM Mono, monospace", color: "#b0bdd8" }}>Last updated: April 2025</p>
      </div>

      {[
        {
          title: "1. Introduction",
          content: "Promptmelo ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use promptmelo.com and the Promptmelo Chrome Extension."
        },
        {
          title: "2. What data we collect",
          content: "We collect minimal data to provide our service. When you use the prompt optimizer, your prompt is sent to our API to generate an optimized version. We do not store the content of your prompts on our servers. If you create an account, we store your email address and saved prompts in our database (Supabase). We use Vercel Analytics to collect anonymous usage statistics such as page views and visits. No personally identifiable information is collected through analytics."
        },
        {
          title: "3. Chrome Extension",
          content: "The Promptmelo Chrome Extension sends your prompt to the Promptmelo API at promptmelo.com/api/optimize to generate an optimized version. The extension does not store any data locally except your dark/light mode preference. We do not collect, store, or share any data entered into the extension."
        },
        {
          title: "4. How we use your data",
          content: "We use your data solely to provide the prompt optimization service. We do not sell, trade, or transfer your data to third parties. We do not use your data for advertising purposes. We do not use your prompts to train AI models."
        },
        {
          title: "5. Data storage",
          content: "Account data and saved prompts are stored securely using Supabase, which is hosted in the EU. You can delete your account and all associated data at any time by contacting us."
        },
        {
          title: "6. Cookies",
          content: "We use only essential cookies required for authentication. We do not use tracking or advertising cookies."
        },
        {
          title: "7. Third-party services",
          content: "We use the following third-party services: Supabase (authentication and database), Vercel (hosting and analytics), DeepSeek API (prompt optimization). Each of these services has their own privacy policy."
        },
        {
          title: "8. Your rights",
          content: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at the email below."
        },
        {
          title: "9. Contact",
          content: "If you have any questions about this Privacy Policy, contact us at: berend@promptmelo.com"
        },
      ].map(({ title, content }) => (
        <div key={title} style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 10, color: "#0f172a" }}>{title}</h2>
          <p style={{ fontSize: 15, color: "#374980", fontWeight: 300 }}>{content}</p>
        </div>
      ))}
    </div>
  );
}