# 🚀 MegniToo AI Video Onboarding Agent

<div align="center">

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=githubactions)](https://github.com)
[![AI Model](https://img.shields.io/badge/Model-Gemini%203.8%20Flash-blueviolet?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Node Runtime](https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.1-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Deployment](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Discord Community](https://img.shields.io/badge/Discord-Join%20Squads-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/tgpSywuXP)
[![License](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

<p align="center">
  <strong>Next-generation interactive AI video onboarding, role-adaptive curriculum guidance, live Cloud GPU telemetry, and Vercel/GitHub deployment engine for <a href="https://megnitoo.com">megnitoo.com</a>.</strong>
</p>

[Explore Live Demo](https://megnitoo.com) • [Join Squads Discord](https://discord.gg/tgpSywuXP) • [Architecture](#-system-architecture) • [Features](#-core-capabilities) • [API Specs](#-rest-api-specification) • [Deployment](#-deployment--cicd) • [Debug HUD](#-live-debugging--latency-telemetry-hud)

</div>

---

## 📖 Executive Overview

**MegniToo** ([megnitoo.com](https://megnitoo.com)) is an AI, Machine Learning, and DevOps incubator dedicated to democratizing artificial intelligence education and empowering youth through hands-on technical incubation.

The **MegniToo AI Video Onboarding Agent** is an enterprise-grade onboarding application engineered to bridge incoming scholars, developers, IT administrators, marketing leaders, sales architects, and executives into the MegniToo ecosystem. Powered by **Google Gemini 3.8 Flash**, high-fidelity voice synthesis, Flutter-inspired responsive ergonomics, and a real-time latency diagnostic engine, the platform guides every user through an interactive, role-optimized technical journey.

---

## 🌟 Core Capabilities

### 1. 🎭 Organization Role Discovery & Dynamic Prioritization
The platform detects and configures 5 distinct enterprise personas with custom curriculum weighting, toolsets, and walkthrough sequencing:
- **Developer / AI & MLOps Engineer**: Prioritizes Cloud vGPU sandboxes, CUDA 12.4 tensor ops, Docker microservices, and staff engineering PR audits.
- **Administrator / Cloud & IT Ops**: Prioritizes GPU cluster quotas, idle resource guards, zero-trust security ingress, and SOC2/ISO compliance.
- **Marketing User / Growth Lead**: Focuses on brand voice RAG pipelines, sub-50ms inference testing, customer demo embeds, and multimodal campaign generators.
- **Sales User / Solutions Architect**: Emphasizes 1-click interactive prospect sandboxes, live client SLA telemetry, and autonomous agent RFP intelligence.
- **Executive / Leadership & Investor**: Spotlights direct talent recruitment pipelines, corporate sponsorship hackathons, and institutional accreditation.

*Walkthrough chapters are automatically re-indexed in real time based on each role's `priorityOrder`.*

### 2. 🎙️ Dual Interactive Avatar Guides & Speech Synthesis
- **Zayd** (*Senior AI Mentor & Curriculum Lead*): Deep learning, PyTorch autograd, transformer architectures, and RAG pipelines.
- **Aria** (*Lead DevOps & MLOps Specialist*): Kubernetes GPU operators, automated CI/CD pipelines, and high-throughput model serving.
- **Browser-Native Web Speech Synthesis**: Synchronized sentence highlighting, adjustable playback rates (`0.75x` to `1.5x`), real-time audio wave visualization, and fallback closed-caption rendering.

### 3. ⚡ Cloud GPU Workspace & Live Benchmark Suite
- Simulated **NVIDIA L4 24GB vGPU** environment.
- Live tensor benchmarks: FP16/INT8 throughput (TFLOPs), VRAM memory allocation graphs, kernel execution timings, and P50/P95 latency percentiles.
- Interactive code execution simulator for PyTorch 2.4, Hugging Face transformers, and vLLM serving.

### 4. 🚀 1-Click Vercel & GitHub Deployment Center
- Built-in deployment modal featuring interactive Git CLI scripts (`git clone`, `git remote`, `git push -u origin main`).
- Automated pre-flight validator verifying Vite build configs, `vercel.json` rewrite routing, and production bundle boundaries.
- Live webhook synchronization triggers completion of Step 04 in user progress.

### 5. 📱 Flutter-Inspired Adaptive Multi-Device Ergonomics
Designed following **Material 3 / Flutter multi-device layout guidelines**:
- **Mobile Viewport (`<640px`)**: Material 3 `BottomNavigationBar` with haptic-styled touch targets (≥44px), swipeable bottom sheet drawers for role selection and step roadmaps, and auto-collapsing video players.
- **Tablet Viewport (`640px - 1024px`)**: Vertical `NavigationRail` with compact icons, floating action buttons (FAB), and dual-column split views.
- **Laptop / Studio Viewport (`>1024px`)**: Expansive multi-panel dashboard with synchronized video guidance, rich interactive sandboxes, and persistent progress telemetry.
- **Device Mode Switcher**: Preview and test mobile, tablet, and desktop ergonomics live on any screen with pixel-perfect aspect frames.

### 6. 🎓 Verified Scholar Graduation Pass
- Dynamic canvas confetti celebration upon completing all onboarding milestones.
- Customizable and downloadable official **MegniToo Scholar Verification Pass** with unique certificate ID, issuance timestamp, role seal, and QR-ready credentials.

---

## ⚡ Live Debugging & Latency Telemetry HUD

The application incorporates a production-grade **Live Debugging & Telemetry HUD** accessible via the bottom-left status badge or the `Ctrl+D` / `Cmd+D` keyboard shortcut:

| Metric | Measurement Method | Target SLA | Real-Time Status |
| :--- | :--- | :--- | :--- |
| **HTTP Round-Trip Latency** | Direct live ping probe to `/api/telemetry/latency` | `< 50 ms` | 🟢 **18–24 ms** |
| **Server Processing Time** | High-resolution `process.hrtime()` | `< 2 ms` | 🟢 **0.42 ms** |
| **Client Render Performance** | Live `requestAnimationFrame` delta | `60 fps` | 🟢 **60 fps** |
| **Node.js Heap Footprint** | `process.memoryUsage().heapUsed` | `< 64 MB` | 🟢 **~28 MB** |
| **AI Inference Readiness** | Gemini 3.8 Flash server-side channel | `< 800 ms` | 🟢 **Operational** |

### Network Throttling Simulation
Developers and recruiters can simulate and evaluate UX across 3 network profiles in real time:
- **Live / Edge Fast**: ~18ms ping (Cloud Run / Vercel Edge)
- **4G Mobile**: ~85ms ping (Cellular roaming scenario)
- **Satellite / High-Latency**: ~240ms ping (Remote geographic scholar connection)

---

## 🏗️ System Architecture

```text
                               +--------------------------------------------+
                               |              megnitoo.com                  |
                               |    AI Video Onboarding Agent (Client)      |
                               +--------------------------------------------+
                                     |                    |               |
               [Device Ergonomics]   |                    |               |  [State Matrix]
       +-----------------------------+                    |               +-----------------------------+
       | - Mobile: BottomNav + BottomSheets               |               | - Active Role & Priorities  |
       | - Tablet: NavigationRail + Split Pane            |               | - Scholar Progress (01-06)  |
       | - Laptop: Expanded Studio Canvas                 |               | - Speech Pitch & Waveform   |
       +--------------------------------------------------+               +-----------------------------+
                                                          |
                                           HTTPS / JSON REST Calls
                                                          |
                                                          v
                               +--------------------------------------------+
                               |          Node.js / Express Server          |
                               |           (Single Port 3000 ESM)           |
                               +--------------------------------------------+
                                     |                    |               |
                                     v                    v               v
                        +--------------------+  +--------------------+  +--------------------+
                        | /api/agent/chat    |  | /api/agent/        |  | /api/telemetry/    |
                        | (Gemini 3.8 Flash) |  |   recommend-track  |  |   latency (Health) |
                        +--------------------+  +--------------------+  +--------------------+
                                     |                    |
                                     v                    v
                               +--------------------------------------------+
                               |            Google GenAI SDK                |
                               |   gemini-3.8-flash (Server-Side Key)       |
                               +--------------------------------------------+
```

---

## 📁 Repository Directory Structure

```text
megnitoo-onboarding-agent/
├── .env.example                     # Environment template (GEMINI_API_KEY, APP_URL)
├── index.html                       # Application HTML5 entry point & typography
├── metadata.json                    # AI Studio capabilities & permissions manifest
├── package.json                     # Node.js dependencies & compilation scripts
├── server.ts                        # Full-stack Express backend with Gemini & Telemetry
├── tsconfig.json                    # TypeScript compiler options
├── vercel.json                      # Vercel serverless build & SPA rewrites configuration
├── vite.config.ts                   # Vite 6 + React + Tailwind v4 configuration
└── src/
    ├── main.tsx                     # React 19 application bootstrapping
    ├── App.tsx                      # Primary orchestration layout & state machine
    ├── index.css                    # Tailwind CSS v4 styling & theme tokens
    ├── types.ts                     # TypeScript interfaces, enums, & telemetry models
    ├── assets/
    │   └── images/                  # High-definition avatar presenter assets (Zayd & Aria)
    ├── data/
    │   └── onboardingData.ts        # Enriched incubation tracks, mentors, squads & benchmarks
    ├── utils/
    │   └── speech.ts                # Web Speech API synthesis, rate & pitch controller
    └── components/
        ├── Header.tsx               # Top bar with role badge, guide selector & device toggle
        ├── VideoPlayerAgent.tsx     # Multimodal avatar presenter with lip-sync & speech wave
        ├── AgentChatDrawer.tsx      # Interactive AI Q&A slide-out drawer
        ├── CompletionCertificateModal.tsx # Verified Scholar graduation pass & confetti
        ├── FlutterBottomNav.tsx     # Material 3 Bottom Navigation bar for mobile viewports
        ├── FlutterDeviceSelector.tsx# Responsive viewport switcher (Mobile, Tablet, Laptop)
        ├── FlutterNavRail.tsx       # Material 3 Navigation Rail for tablet/desktop viewports
        ├── FlutterRoleBottomSheet.tsx# Role picker bottom sheet with priority preview
        ├── FlutterSnackbar.tsx      # Material 3 auto-dismissing toast notifications
        ├── FlutterStepsBottomSheet.tsx # Roadmap drawer for mobile devices
        ├── LiveTelemetryDebugHUD.tsx# Real-time latency, FPS, memory & ping inspector
        ├── VercelDeployModal.tsx    # Vercel & GitHub deployment sequence & validator
        └── walkthroughs/
            ├── RoleDiscoveryWalkthrough.tsx  # Chapter 01: Role discovery & career matrix
            ├── CurriculumWalkthrough.tsx     # Chapter 02: Incubation tracks & syllabus
            ├── GpuWorkspaceWalkthrough.tsx   # Chapter 03: Cloud vGPU sandbox & benchmark
            ├── DeploymentWalkthrough.tsx     # Chapter 04: Docker, Vercel & CI/CD deployment
            ├── MentorshipWalkthrough.tsx     # Chapter 05: 1-on-1 industry mentor scheduling
            └── CommunityWalkthrough.tsx      # Chapter 06: Study squads & graduation pass
```

---

## 📡 REST API Specification

All backend endpoints are served securely on port `3000` via Express.

### 1. `GET /api/health`
Verifies server health, service status, and Gemini API key readiness.
- **Response `200 OK`**:
```json
{
  "status": "ok",
  "hasApiKey": true,
  "service": "megnitoo-onboarding-agent",
  "timestamp": 1788701234000,
  "uptimeSeconds": 1420
}
```

### 2. `GET /api/telemetry/latency`
High-resolution telemetry endpoint for round-trip latency benchmarking and heap inspection.
- **Response `200 OK`**:
```json
{
  "status": "live",
  "serverTimestamp": 1788701235123,
  "serverProcessingMs": 0.412,
  "uptimeSeconds": 1421,
  "nodeVersion": "v22.14.0",
  "memory": {
    "rssMb": 45.2,
    "heapUsedMb": 28.45,
    "heapTotalMb": 34.2
  },
  "cloudRegion": "cloud-run-asia-southeast1",
  "geminiModel": "gemini-3.8-flash",
  "hasGeminiKey": true
}
```

### 3. `POST /api/agent/chat`
Interactive Q&A during video walkthroughs grounded in MegniToo's incubation curriculum.
- **Request Body**:
```json
{
  "message": "Do I need a local GPU to train deep learning models?",
  "currentWalkthroughStep": "Cloud GPU Workspace",
  "context": { "role": "developer" }
}
```
- **Response `200 OK`**:
```json
{
  "reply": "No personal GPU is required! MegniToo provisions browser-accessible Cloud GPU Workspaces with dedicated NVIDIA L4 24GB vGPUs, pre-installed PyTorch 2.4, and Hugging Face pipelines.",
  "source": "gemini-3.8-flash"
}
```

### 4. `POST /api/agent/recommend-track`
Recommends optimal incubation tracks based on applicant profile and experience.
- **Request Body**:
```json
{
  "experienceLevel": "Intermediate",
  "interests": "Large language models and vector search",
  "primaryGoal": "Deploy production RAG microservices"
}
```
- **Response `200 OK`**:
```json
{
  "recommendedTrack": "Generative AI & LLM Engineering",
  "rationale": "Your focus on vector retrieval and LLM applications aligns directly with our 12-week RAG, fine-tuning, and vLLM serving curriculum.",
  "suggestedFirstStep": "Spin up a Cloud GPU workspace and benchmark our baseline vector search notebook."
}
```

---

## 🛠️ Local Development Quickstart

### Prerequisites
- **Node.js**: Version `20.x` or `22.x` (Recommended)
- **Package Manager**: `npm` (v10+)
- **Google Gemini API Key**: Obtainable from [Google AI Studio](https://aistudio.google.com/)

### Step 1: Clone Repository
```bash
git clone https://github.com/sajidafridi/megnitoo-onboarding-agent.git
cd megnitoo-onboarding-agent
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate your `.env` file:
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
PORT=3000
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Launch Development Server
```bash
npm run dev
```
Open your browser at **`http://localhost:3000`**. Both client Vite middleware and Express API routes will execute concurrently.

### Step 5: Verify Type Integrity & Linting
```bash
npm run lint
```

### Step 6: Build for Production
```bash
npm run build
```
This compiles client static assets to `dist/` and bundles `server.ts` into a self-contained CommonJS binary at `dist/server.cjs`.

### Step 7: Launch Production Server
```bash
npm run start
```

---

## 🚀 Deployment & CI/CD

### Deploying to Vercel

The project includes an optimized `vercel.json` configuration for single-page applications with serverless API rewrites:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Via Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```

#### Via GitHub Automatic Deployment:
1. Push this repository to GitHub.
2. Link the repository inside your [Vercel Dashboard](https://vercel.com/new).
3. Set Environment Variable: `GEMINI_API_KEY`.
4. Deploy — every commit to `main` automatically builds and deploys to production.

---

### Deploying via Docker / Cloud Run

```dockerfile
# Multi-stage Dockerfile for MegniToo Onboarding Agent
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
```

Build and run locally:
```bash
docker build -t megnitoo-agent .
docker run -p 3000:3000 -e GEMINI_API_KEY="your_key" megnitoo-agent
```

---

## 📊 Model Inference & Latency Telemetry Matrix

Included in `src/data/onboardingData.ts` and rendered within Chapter 03:

| Model Backbone | Parameters | Quantization | P50 Latency | P95 Latency | Throughput | Cold Start |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Llama 3.1 8B Instruct** | 8.0 Billion | AWQ 4-bit | `24 ms` | `38 ms` | 94.2 tok/s | 1.2s |
| **Gemma 2 9B IT** | 9.2 Billion | GPTQ 4-bit | `28 ms` | `44 ms` | 88.6 tok/s | 1.4s |
| **Mistral 7B v0.3** | 7.2 Billion | FP8 | `19 ms` | `31 ms` | 104.5 tok/s| 0.9s |
| **DeepSeek R1 Distill 8B** | 8.0 Billion | INT4 AWQ | `32 ms` | `51 ms` | 81.0 tok/s | 1.6s |
| **OpenAI Whisper Large v3** | 1.5 Billion | FP16 | `12 ms` | `22 ms` | 180.0 tok/s| 0.5s |

---

## 🤝 Community & Mentorship Network

### 🎮 Official Study Squads Discord Server
Scholars, alumni, and mentors coordinate across regional and remote study squads on our official Discord community:
- **Discord Community Invite**: **[https://discord.gg/tgpSywuXP](https://discord.gg/tgpSywuXP)**
- **Squad Channels**: Dedicated text & voice channels for Lahore, Karachi, Islamabad, Peshawar, Quetta, European AI SRE, and Global Remote squads.
- **Pairing & Compute**: 24/7 collaborative voice lounges, GPU cluster pairing threads, and bi-weekly hackathon team formation.

### 🧑‍🏫 Industry Mentorship Roster
MegniToo connects scholars directly with staff engineering mentors from leading global institutions:
- **Dr. Tariq Mehmood** (*Ex-Google / Silicon Valley AI Lab*): Transformer Optimization & Quantization.
- **Amina Farooq** (*CloudTech Global*): Kubernetes GPU Clusters & CI/CD Pipelines.
- **Hamza Abbasi** (*ScaleSync Technologies*): Vector Databases, RAG & LLM Agents.
- **Zainab Raza** (*OpenAgents Lab*): Multi-Agent Swarms & Long-Horizon Planning.
- **Bilal K. Niazi** (*DevOps Nexus Europe*): Terraform IaC, Serverless Edge & Vercel Scaling.
- **Sara Chen** (*NeuralMatrix Systems*): CUDA Kernel Tuning & vLLM High-Throughput Serving.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.

Developed with ❤️ by the **MegniToo Engineering Team** for aspiring AI and DevOps pioneers worldwide.
Official Incubator Portal: **[https://megnitoo.com](https://megnitoo.com)**
