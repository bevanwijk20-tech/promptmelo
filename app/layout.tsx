import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promptmelo — AI Prompt Optimizer",
  description: "Paste any prompt and get an AI-optimized version with a quality score and explanation in seconds. Built by a 17-year-old from the Netherlands.",
  keywords: ["prompt optimizer", "AI prompts", "ChatGPT prompts", "prompt engineering", "better AI results"],
  authors: [{ name: "Berend van Wijk" }],
  openGraph: {
    title: "Promptmelo — AI Prompt Optimizer",
    description: "Transform your prompts. Get better AI results instantly.",
    url: "https://promptmelo.com",
    siteName: "Promptmelo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptmelo — AI Prompt Optimizer",
    description: "Transform your prompts. Get better AI results instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}