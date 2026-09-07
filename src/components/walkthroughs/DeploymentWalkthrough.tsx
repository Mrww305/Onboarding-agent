import React, { useState } from "react";
import {
  Rocket,
  CheckCircle2,
  Package,
  Globe,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  Github,
  ExternalLink,
} from "lucide-react";
import { OrgRole } from "../../types";

interface DeploymentWalkthroughProps {
  onCompleteDeployment: () => void;
  isDeploymentCompleted: boolean;
  onNextWalkthrough: () => void;
  activeRole?: OrgRole;
  onOpenVercelModal?: () => void;
}

export const DeploymentWalkthrough: React.FC<DeploymentWalkthroughProps> = ({
  onCompleteDeployment,
  isDeploymentCompleted,
  onNextWalkthrough,
  activeRole,
  onOpenVercelModal,
}) => {
  const [pipelineState, setPipelineState] = useState<
    "idle" | "building" | "testing" | "indexing" | "deployed"
  >(isDeploymentCompleted ? "deployed" : "idle");
  const [testQuery, setTestQuery] = useState<string>("What are MegniToo's incubation core principles?");
  const [appOutput, setAppOutput] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);

  const stages = [
    { name: "Lint & Unit Tests", status: pipelineState === "idle" ? "pending" : "done", icon: ShieldCheck },
    { name: "Docker Image Build", status: pipelineState === "building" ? "active" : pipelineState === "idle" ? "pending" : "done", icon: Package },
    { name: "Vector DB Embedding Sync", status: pipelineState === "indexing" ? "active" : ["deployed"].includes(pipelineState) ? "done" : "pending", icon: Sparkles },
    { name: "Live Production Endpoint", status: pipelineState === "deployed" ? "done" : "pending", icon: Globe },
  ];

  const handleTriggerDeploy = () => {
    setPipelineState("building");
    setTimeout(() => {
      setPipelineState("indexing");
      setTimeout(() => {
        setPipelineState("deployed");
        onCompleteDeployment();
      }, 1000);
    }, 1200);
  };

  const handleTestDeployedApp = () => {
    setIsQuerying(true);
    setTimeout(() => {
      setAppOutput(
        "MegniToo Core Principles: 1) Radical Accessibility through subsidized incubation, 2) Applied Engineering with zero mock projects, 3) Relentless mentorship from senior tech industry leads."
      );
      setIsQuerying(false);
    }, 600);
  };

  return (
    <div className="space-y-6" id="walkthrough-deployment-container">
      {/* Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500">
                Interactive Walkthrough 04 of 06
              </span>
              {activeRole && (
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-emerald-400 border border-emerald-500/20">
                  {activeRole.shortTitle} Deployment & Delivery
                </span>
              )}
            </div>
            <h2 className="text-xl font-serif italic text-white mt-0.5">
              Production Portfolio & Deployment Engine
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
              {activeRole
                ? activeRole.roleSpecificFocus.deployment
                : "At Megnitoo, scholars do not build isolated notebooks. You ship containerized microservices, configure continuous integration, and publish verifiable live URLs."}
            </p>
          </div>

          {isDeploymentCompleted && (
            <span className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Deployment Verified
            </span>
          )}
        </div>
      </div>

      {/* CI/CD Pipeline Visualizer */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-serif italic text-white flex items-center gap-2">
              <Rocket className="h-4 w-4 text-emerald-400" />
              Automated MLOps Rollout Pipeline
            </h3>
            <p className="text-xs text-white/50 mt-1 font-mono text-[11px]">
              Target: Cloud Run / K8s GPU Ingress • Region: asia-south
            </p>
          </div>

          <button
            onClick={handleTriggerDeploy}
            disabled={pipelineState === "building" || pipelineState === "indexing"}
            id="trigger-pipeline-btn"
            className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 transition-all disabled:opacity-40"
          >
            <Rocket className={`h-3.5 w-3.5 ${pipelineState === "building" ? "animate-bounce" : ""}`} />
            <span>
              {pipelineState === "building"
                ? "Compiling Container..."
                : pipelineState === "indexing"
                ? "Syncing Vector Store..."
                : pipelineState === "deployed"
                ? "Re-Deploy Container"
                : "Trigger Production Deploy"}
            </span>
          </button>
        </div>

        {/* Pipeline Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = stage.status === "done";
            const isActive = stage.status === "active";
            return (
              <div
                key={idx}
                className={`rounded-2xl p-4 border transition-all ${
                  isDone
                    ? "border-emerald-500/50 bg-emerald-950/20 ring-1 ring-emerald-500/30"
                    : isActive
                    ? "border-white/40 bg-white/10 animate-pulse"
                    : "border-white/10 bg-white/[0.02] opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`rounded-xl p-2 border ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : isActive
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-white/5 text-white/40 border-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Step 0{idx + 1}</span>
                </div>

                <div className="text-xs font-serif italic text-white">{stage.name}</div>
                <div
                  className={`text-[10px] uppercase tracking-[0.15em] font-medium mt-1.5 ${
                    isDone ? "text-emerald-400" : isActive ? "text-white" : "text-white/40"
                  }`}
                >
                  {isDone ? "Passed / Verified" : isActive ? "Running..." : "Pending Trigger"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Deployed Service Mockup */}
      {pipelineState === "deployed" && (
        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4">
            <div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold text-emerald-400 border border-emerald-500/30">
                LIVE PRODUCTION CONTAINER
              </span>
              <h4 className="text-base font-serif italic text-white mt-1.5">
                Megnitoo Scholar RAG Microservice
              </h4>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-black px-3.5 py-1.5 rounded-xl border border-white/10">
              <Globe className="h-3.5 w-3.5" />
              <span>https://scholar-rag-demo.megnitoo.app</span>
            </div>
          </div>

          <p className="text-xs text-white/60 mb-3.5 leading-relaxed">
            Test the live deployed container API directly through this preview gateway:
          </p>

          <div className="flex gap-2.5">
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              className="flex-1 rounded-xl bg-black px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-emerald-500 focus:outline-none"
              placeholder="Ask the deployed model API..."
              id="deployed-app-query-input"
            />
            <button
              onClick={handleTestDeployedApp}
              disabled={isQuerying}
              id="test-deployed-app-btn"
              className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isQuerying ? "Calling API..." : "Send Request"}</span>
            </button>
          </div>

          {appOutput && (
            <div className="mt-3.5 rounded-xl bg-emerald-950/20 p-4 border border-emerald-900/30 text-xs">
              <span className="text-emerald-400 font-semibold font-mono block mb-1 text-[10px] uppercase tracking-wider">
                200 OK • Latency: 38ms • Status: Verified
              </span>
              <p className="text-white/80 leading-relaxed">{appOutput}</p>
            </div>
          )}
        </div>
      )}

      {/* Vercel & GitHub Continuous Deployment Card */}
      <div className="rounded-2xl border border-white/10 bg-[#080808] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-2 text-black shadow-lg">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L24 22H0L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-serif italic text-white">
                  Continuous Deployment on Vercel through GitHub
                </h4>
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-emerald-400">
                  Ready
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Zero-config Git push with automated edge builds and serverless Gemini API endpoints
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenVercelModal && (
              <button
                onClick={onOpenVercelModal}
                id="open-vercel-modal-from-walkthrough"
                className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-lg"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Open Deploy Center</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Config Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
            <span className="text-[10px] uppercase font-mono text-white/40 block">Vercel Root Config:</span>
            <span className="text-emerald-400 font-mono font-medium text-[11px] mt-0.5 block">
              vercel.json (rewrites + Vite framework)
            </span>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
            <span className="text-[10px] uppercase font-mono text-white/40 block">Serverless API:</span>
            <span className="text-white font-mono text-[11px] mt-0.5 block">
              /api/health & /api/agent/chat
            </span>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3">
            <span className="text-[10px] uppercase font-mono text-white/40 block">UI Architecture:</span>
            <span className="text-emerald-300 font-mono text-[11px] mt-0.5 block">
              Flutter M3 Adaptive (Mobile/Tab/Laptop)
            </span>
          </div>
        </div>
      </div>

      {/* Next Step Nav */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextWalkthrough}
          id="proceed-to-step-4-btn"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Proceed to Step 04: 1-on-1 Senior Industry Mentorship</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
