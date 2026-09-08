import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Google GenAI
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

// System instruction for the MegniToo Onboarding Agent
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

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    service: "megnitoo-onboarding-agent",
    timestamp: Date.now(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Live Telemetry & Latency Diagnostic Endpoint
app.get("/api/telemetry/latency", (req, res) => {
  const startHr = process.hrtime();
  const mem = process.memoryUsage();
  const [sec, nano] = process.hrtime(startHr);
  const serverProcessingTimeMs = (sec * 1000 + nano / 1e6).toFixed(3);

  res.json({
    status: "live",
    serverTimestamp: Date.now(),
    serverProcessingMs: parseFloat(serverProcessingTimeMs),
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    memory: {
      rssMb: Math.round((mem.rss / 1024 / 1024) * 100) / 100,
      heapUsedMb: Math.round((mem.heapUsed / 1024 / 1024) * 100) / 100,
      heapTotalMb: Math.round((mem.heapTotal / 1024 / 1024) * 100) / 100,
    },
    cloudRegion: process.env.K_REVISION ? "cloud-run-asia-southeast1" : "edge-local",
    geminiModel: "gemini-3.8-flash",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Interactive Agent Q&A during video walkthrough
app.post("/api/agent/chat", async (req, res) => {
  try {
    const { message, currentWalkthroughStep, context } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGenAI();

    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not yet attached
      const lower = message.toLowerCase();
      let fallbackReply = `Welcome to MegniToo! As your onboarding agent, I'm thrilled to guide you. `;
      if (lower.includes("gpu") || lower.includes("hardware")) {
        fallbackReply += "You do not need a high-end personal GPU. MegniToo provides dedicated Cloud GPU Workspaces with pre-installed PyTorch, CUDA, and Hugging Face environments directly inside your browser.";
      } else if (lower.includes("track") || lower.includes("course") || lower.includes("curriculum")) {
        fallbackReply += "MegniToo offers specialized incubation tracks in Generative AI & LLMs, Deep Learning, DevOps & Cloud, and Autonomous Multi-Agent Systems. Each track features hands-on milestones and production-ready deployments.";
      } else if (lower.includes("mentor") || lower.includes("review")) {
        fallbackReply += "Every enrolled scholar gets paired with senior technology mentors who provide weekly 1-on-1 code reviews, architecture rubrics, and guidance for your production portfolio.";
      } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("free") || lower.includes("scholarship")) {
        fallbackReply += "MegniToo is committed to accessibility with fully subsidized and merit-based incubation pathways to eliminate financial barriers for underprivileged youth.";
      } else {
        fallbackReply += "Feel free to step through our interactive walkthrough tabs above to explore the tracks, launch the GPU sandbox, and schedule your mentor review!";
      }

      res.json({
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

    res.json({
      reply: response.text?.trim() || "Let's continue our walkthrough! Feel free to ask more anytime.",
      source: "gemini-3.8-flash",
    });
  } catch (error) {
    console.error("Error in /api/agent/chat:", error);
    res.status(500).json({
      error: "Failed to generate response",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Track recommendation based on user background
app.post("/api/agent/recommend-track", async (req, res) => {
  try {
    const { experienceLevel, interests, primaryGoal } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Deterministic recommendation fallback
      const track = interests?.includes("devops")
        ? "DevOps & Cloud Engineering"
        : interests?.includes("agent")
        ? "Autonomous AI Agents"
        : "Generative AI & LLM Engineering";

      res.json({
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
    res.json(parsed);
  } catch (err) {
    console.error("Error recommending track:", err);
    res.json({
      recommendedTrack: "Generative AI & LLM Engineering",
      rationale: "Our flagship track offers a strong foundation in modern prompt engineering, vector retrieval, and deployment.",
      suggestedFirstStep: "Explore the curriculum syllabus and spin up your first GPU notebook.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MegniToo Onboarding Agent server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
