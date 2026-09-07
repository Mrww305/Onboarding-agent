import React, { useState } from "react";
import {
  Cpu,
  Terminal,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Gauge,
  Activity,
  HardDrive,
} from "lucide-react";
import { OrgRole } from "../../types";

interface GpuWorkspaceWalkthroughProps {
  onCompleteBenchmark: () => void;
  isBenchmarkCompleted: boolean;
  onNextWalkthrough: () => void;
  activeRole?: OrgRole;
}

export const GpuWorkspaceWalkthrough: React.FC<GpuWorkspaceWalkthroughProps> = ({
  onCompleteBenchmark,
  isBenchmarkCompleted,
  onNextWalkthrough,
  activeRole,
}) => {
  const [vramUsed, setVramUsed] = useState<number>(1.4);
  const [gpuLoad, setGpuLoad] = useState<number>(4);
  const [tempC, setTempC] = useState<number>(41);
  const [isRunningInference, setIsRunningInference] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("Llama-3.1-8B-Instruct");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "megnitoo-gpu-node-04:~$ nvidia-smi",
    "+-----------------------------------------------------------------------------+",
    "| NVIDIA-SMI 550.54.14              Driver Version: 550.54.14   CUDA: 12.4     |",
    "| GPU  Name        Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |",
    "|   0  NVIDIA L4             On  | 00000000:00:04.0   Off |                    0 |",
    "| 41C    P8             16W /  72W |   1433MiB / 24576MiB |      4%      Default |",
    "+-----------------------------------------------------------------------------+",
    "megnitoo-gpu-node-04:~$ echo 'PyTorch 2.3 & FlashAttention-2 initialized.'",
    "PyTorch 2.3 & FlashAttention-2 initialized.",
    "Ready for workload. Click 'Run Inference Test' below.",
  ]);

  const handleRunInference = () => {
    setIsRunningInference(true);
    setVramUsed(14.2);
    setGpuLoad(94);
    setTempC(62);

    const newLogs = [
      ...consoleLogs,
      `megnitoo-gpu-node-04:~$ python -m vllm.entrypoints.api_server --model meta-llama/${selectedModel}`,
      `[INFO] Allocating KV cache tensor memory on GPU: 12.8 GB allocated.`,
      `[PROMPT] "Explain how MegniToo incubator trains future AI engineers in 3 concise points:"`,
      `[GENERATING TOKENS...]`,
      `> 1. Hands-on incubation paths with subsidized NVIDIA cloud GPU hardware.`,
      `> 2. Direct 1-on-1 mentorship and line-by-line code reviews by senior staff.`,
      `> 3. Production container deployments built for real industry portfolios.`,
      `[BENCHMARK RESULT] Latency: 18.4 ms/token | Throughput: 54.3 tokens/sec | Output Tokens: 72`,
      `[STATUS] Benchmark passed with 0 memory fragmentation.`,
    ];

    setTimeout(() => {
      setConsoleLogs(newLogs);
      setIsRunningInference(false);
      setGpuLoad(12);
      setTempC(48);
      onCompleteBenchmark();
    }, 1200);
  };

  const handleResetWorkspace = () => {
    setVramUsed(1.4);
    setGpuLoad(4);
    setTempC(41);
    setConsoleLogs([
      "megnitoo-gpu-node-04:~$ torch.cuda.empty_cache()",
      "VRAM cleared. GPU memory released back to pool.",
      "Ready for new benchmark run.",
    ]);
  };

  return (
    <div className="space-y-6" id="walkthrough-gpu-container">
      {/* Intro Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500">
                Interactive Walkthrough 03 of 06
              </span>
              {activeRole && (
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-emerald-400 border border-emerald-500/20">
                  {activeRole.shortTitle} GPU Sandbox
                </span>
              )}
            </div>
            <h2 className="text-xl font-serif italic text-white mt-0.5">
              Cloud GPU Workspaces & Sandboxes
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
              {activeRole
                ? activeRole.roleSpecificFocus.gpuWorkspace
                : "Megnitoo equips every scholar with dedicated cloud compute. No local workstation GPU required—develop, fine-tune, and benchmark directly in browser."}
            </p>
          </div>

          {isBenchmarkCompleted && (
            <span className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              GPU Sandbox Tested
            </span>
          )}
        </div>
      </div>

      {/* GPU Hardware Telemetry Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xl">
          <div className="flex items-center justify-between text-white/40 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium">
              <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              GPU Compute
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">L4 24GB</span>
          </div>
          <div className="text-sm font-serif italic text-white mt-1">NVIDIA L4 Tensor</div>
          <div className="text-[10px] text-white/40 font-mono mt-1">CUDA 12.4 • FP16/BF16</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xl">
          <div className="flex items-center justify-between text-white/40 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium">
              <HardDrive className="h-3.5 w-3.5 text-emerald-400" />
              vRAM Usage
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">
              {vramUsed.toFixed(1)} / 24.0 GB
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mt-3">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(vramUsed / 24) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-white/40 font-mono mt-1.5">
            {Math.round((vramUsed / 24) * 100)}% Memory Allocated
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xl">
          <div className="flex items-center justify-between text-white/40 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium">
              <Gauge className="h-3.5 w-3.5 text-emerald-400" />
              Compute Load
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">{gpuLoad}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mt-3">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                gpuLoad > 80 ? "bg-amber-400" : "bg-emerald-500"
              }`}
              style={{ width: `${gpuLoad}%` }}
            />
          </div>
          <div className="text-[10px] text-white/40 font-mono mt-1.5">
            {gpuLoad > 50 ? "Active Tensor Execution" : "Idle / Standby"}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-2xl">
          <div className="flex items-center justify-between text-white/40 text-xs mb-1">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Thermal Status
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">{tempC}°C</span>
          </div>
          <div className="text-sm font-serif italic text-white mt-1">{tempC}°C Core Temp</div>
          <div className="text-[10px] text-emerald-400/80 font-mono mt-1">Optimal Acoustic Cooling</div>
        </div>
      </div>

      {/* Interactive Terminal Sandbox */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-white/[0.02] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <span className="text-xs font-mono text-white/50 flex items-center gap-2 ml-3">
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              scholar-sandbox@megnitoo-gpu: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="rounded-xl bg-black px-3 py-1.5 text-[10px] font-mono text-white/80 border border-white/10 focus:outline-none"
              id="gpu-model-select"
            >
              <option value="Llama-3.1-8B-Instruct">Meta Llama 3.1 (8B)</option>
              <option value="Mistral-7B-v0.3">Mistral 7B v0.3</option>
              <option value="Qwen2.5-Coder-7B">Qwen 2.5 Coder (7B)</option>
              <option value="Gemma-2-9B">Google Gemma 2 (9B)</option>
            </select>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 font-mono text-xs text-white/70 h-64 overflow-y-auto space-y-1.5 bg-[#050505] selection:bg-emerald-500/20 selection:text-emerald-300">
          {consoleLogs.map((log, index) => {
            const isCommand = log.startsWith("megnitoo-gpu");
            const isBenchmark = log.startsWith("[BENCHMARK");
            const isPrompt = log.startsWith("[PROMPT]");
            return (
              <div
                key={index}
                className={`${
                  isCommand
                    ? "text-emerald-400 font-semibold"
                    : isBenchmark
                    ? "text-emerald-300 font-bold bg-emerald-950/20 border border-emerald-900/30 p-2 rounded-xl"
                    : isPrompt
                    ? "text-white font-medium"
                    : "text-white/60"
                }`}
              >
                {log}
              </div>
            );
          })}
          {isRunningInference && (
            <div className="flex items-center gap-2 text-emerald-400 animate-pulse">
              <span>Streaming tokens via vLLM inference engine...</span>
            </div>
          )}
        </div>

        {/* Action Trigger Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#0A0A0A] border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunInference}
              disabled={isRunningInference}
              id="run-inference-test-btn"
              className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 transition-all disabled:opacity-40"
            >
              {isRunningInference ? (
                <>
                  <Zap className="h-3.5 w-3.5 animate-spin" />
                  <span>Benchmarking Model...</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-black" />
                  <span>Run Inference Test (vLLM)</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetWorkspace}
              id="clear-vram-btn"
              className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-[10px] uppercase tracking-[0.15em] font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Flush VRAM Cache</span>
            </button>
          </div>

          <div className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono">
            Hardware: <span className="text-emerald-400 font-mono">NVIDIA L4 24GB</span> • Subsidized by Megnitoo
          </div>
        </div>
      </div>

      {/* Next Step Nav */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextWalkthrough}
          id="proceed-to-step-3-btn"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Proceed to Step 03: Production Portfolio & Deployments</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
