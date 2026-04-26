import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

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

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (prompt.length > 4000) {
      return NextResponse.json(
        { error: "Prompt too long (max 4000 characters)" },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Optimize this prompt:\n\n${prompt}` },
      ],
      response_format: { type: "json_object" },
    });

    const text = response.choices[0].message.content || "";
    console.log("API response:", text);
    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Optimize error:", JSON.stringify(error, null, 2));
    if (error instanceof Error) console.error("Message:", error.message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
console.log("API KEY:", process.env.DEEPSEEK_API_KEY);