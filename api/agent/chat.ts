import { GoogleGenAI } from "@google/genai";

const ONBOARDING_AGENT_SYSTEM_INSTRUCTION = `You are the Official AI Video Onboarding Agent for MegniToo (megnitoo.com) - an AI, Machine Learning, and DevOps incubator dedicated to democratizing artificial intelligence education and empowering youth through hands-on technical incubation.

Key Knowledge Base regarding MegniToo:
1. Mission: Democratize AI & ML education, providing free and subsidized incubation pathways for aspiring developers, ML engineers, and DevOps professionals.
2. Core Incubation Tracks:
   - Generative AI & LLM Engineering (Prompt engineering, RAG with Vector DBs like Chroma/Pinecone, Fine-tuning, LangChain/LlamaIndex)
   - Deep Learning & Neural Networks (PyTorch, TensorFlow, Computer Vision, Transformers)
   - DevOps & Cloud Architecture (Docker, Kubernetes, CI/CD, Terraform, Cloud Run, AWS/GCP, GPU cluster provisioning)
   - Autonomous AI Agents & Multi-Agent Systems (CrewAI, AutoGen, tool calling, memory management)
3. Platform Core Features:
   - Cloud GPU Workspaces: Pre-configured Jupyter / VS Code cloud environments with allocated vGPU hardware for model training without requiring expensive local rigs.
   - Production Portfolio Deployments: Every scholar ships real production applications with public links, validated container images, and benchmark reports.
   - 1-on-1 Industry Mentorship: Weekly code reviews, architecture rubrics, and direct pairing with senior staff engineers.
   - Community & Hackathons: Collaborative sprints, pair programming squads, and direct recruitment pipelines with partner tech firms.
4. Tone & Persona:
   - Warm, inspiring, technically rigorous yet deeply approachable and encouraging.
   - Keep answers concise, high-impact, and easy to understand during an interactive walkthrough.
   - Include direct actionable steps when guiding scholars.`;

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
    const { message, currentWalkthroughStep, context } = req.body || {};

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGenAI();

    if (!ai) {
      // Fallback when GEMINI_API_KEY is not yet provided in Vercel environment variables
      const lower = message.toLowerCase();
      let fallbackReply = `Welcome to MegniToo! As your onboarding agent, I'm thrilled to guide you. `;
      if (lower.includes("gpu") || lower.includes("hardware")) {
        fallbackReply += "You do not need a high-end personal GPU. MegniToo provides dedicated Cloud GPU Workspaces with pre-installed PyTorch, CUDA, and Hugging Face environments directly inside your browser.";
      } else if (lower.includes("track") || lower.includes("course") || lower.includes("curriculum")) {
        fallbackReply += "MegniToo offers specialized incubation tracks in Generative AI & LLMs, Deep Learning, DevOps & Cloud, and Autonomous Multi-Agent Systems. Each track features hands-on milestones and production-ready deployments.";
      } else if (lower.includes("mentor") || lower.includes("review")) {
        fallbackReply += "Every enrolled scholar gets paired with senior technology mentors who provide weekly 1-on-1 code reviews, architecture rubrics, and guidance for your production portfolio.";
      } else if (lower.includes("vercel") || lower.includes("deploy") || lower.includes("github")) {
        fallbackReply += "MegniToo is 100% production-ready for automated Vercel deployment through GitHub! Connect your repository and push to deploy seamlessly.";
      } else {
        fallbackReply += "Feel free to step through our interactive walkthrough tabs above to explore the tracks, launch the GPU sandbox, and schedule your mentor review!";
      }

      res.status(200).json({
        reply: fallbackReply,
        source: "agent-engine-local",
      });
      return;
    }

    const promptText = `User is currently viewing the MegniToo interactive walkthrough.
Current Walkthrough Section: ${currentWalkthroughStep || "Overview"}
Context info: ${JSON.stringify(context || {})}
User question: "${message}"

Respond concisely (2-4 sentences max) as the video onboarding guide. Be helpful, clear, and action-oriented.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction: ONBOARDING_AGENT_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.status(200).json({
      reply: response.text?.trim() || "Let's continue our walkthrough! Feel free to ask more anytime.",
      source: "gemini-3.8-flash",
    });
  } catch (error) {
    console.error("Error in Vercel /api/agent/chat:", error);
    res.status(500).json({
      error: "Failed to generate response",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
