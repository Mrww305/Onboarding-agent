import { GoogleGenAI } from "@google/genai";

const ONBOARDING_AGENT_SYSTEM_INSTRUCTION = `You are the Official AI Video Onboarding Agent for MegniToo (megnitoo.com) - an AI, Machine Learning, and DevOps incubator dedicated to democratizing artificial intelligence education and empowering youth through hands-on technical incubation.`;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { experienceLevel, interests, primaryGoal } = req.body || {};
    const ai = getGenAI();

    if (!ai) {
      const track = interests?.includes("devops")
        ? "DevOps & Cloud Engineering"
        : interests?.includes("agent")
        ? "Autonomous AI Agents"
        : "Generative AI & LLM Engineering";

      res.status(200).json({
        recommendedTrack: track,
        rationale: "Based on your focus and current background, this track will give you the most immediate production exposure at MegniToo.",
        suggestedFirstStep: "Launch the Cloud GPU Workspace to run your baseline inference model.",
      });
      return;
    }

    const prompt = `Based on a new user's onboarding profile at MegniToo:
- Experience Level: ${experienceLevel || "Beginner"}
- Primary Interests: ${interests || "AI and Machine Learning"}
- Career / Learning Goal: ${primaryGoal || "Build production-ready projects"}

Select the best MegniToo Incubation Track from:
1. "Generative AI & LLM Engineering"
2. "Deep Learning & Neural Networks"
3. "DevOps & Cloud Infrastructure"
4. "Autonomous AI Agents & Multi-Agent Systems"

Return JSON with format:
{
  "recommendedTrack": "name of track",
  "rationale": "2-3 sentences explaining why",
  "suggestedFirstStep": "First hands-on milestone"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: ONBOARDING_AGENT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    res.status(200).json(parsed);
  } catch (err) {
    console.error("Error recommending track in Vercel handler:", err);
    res.status(200).json({
      recommendedTrack: "Generative AI & LLM Engineering",
      rationale: "Our flagship track offers a strong foundation in modern prompt engineering, vector retrieval, and deployment.",
      suggestedFirstStep: "Explore the curriculum syllabus and spin up your first GPU notebook.",
    });
  }
}
