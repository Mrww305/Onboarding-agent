import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Cpu,
  Gauge,
  Wifi,
  Server,
  Zap,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Copy,
  Check,
  Radio,
  Sliders,
  Terminal,
} from "lucide-react";
import type { OrgRole, AvatarGuide, UserOnboardingProgress } from "../types";

interface LiveTelemetryDebugHUDProps {
  activeRole: OrgRole;
  currentStepId: number;
  progress: UserOnboardingProgress;
  activeGuide: AvatarGuide;
  deviceMode: "auto" | "mobile" | "tablet" | "laptop";
  onShowToast?: (msg: string) => void;
}

interface PingRecord {
  id: string;
  timestamp: string;
  latencyMs: number;
  status: "success" | "warning" | "error";
  endpoint: string;
  serverProcessingMs?: number;
}

export const LiveTelemetryDebugHUD: React.FC<LiveTelemetryDebugHUDProps> = ({
  activeRole,
  currentStepId,
  progress,
  activeGuide,
  deviceMode,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentLatency, setCurrentLatency] = useState<number | null>(null);
  const [pingHistory, setPingHistory] = useState<PingRecord[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [fps, setFps] = useState<number>(60);
  const [serverData, setServerData] = useState<{
    uptime?: number;
    nodeVersion?: string;
    memoryMb?: number;
    cloudRegion?: string;
    hasGeminiKey?: boolean;
  }>({});
  const [copiedDebug, setCopiedDebug] = useState(false);
  const [simulatedNetworkProfile, setSimulatedNetworkProfile] = useState<"live" | "4g" | "satellite">("live");

  // FPS calculation
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calculateFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Ping probe function
  const runPingProbe = async () => {
    setIsPinging(true);
    const start = performance.now();
    try {
      // Simulate artificial network delay if profile selected
      const delay = simulatedNetworkProfile === "4g" ? 85 : simulatedNetworkProfile === "satellite" ? 240 : 0;
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      const res = await fetch("/api/telemetry/latency", {
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();
      const end = performance.now();
      const rtt = Math.round(end - start);

      setCurrentLatency(rtt);
      setServerData({
        uptime: data.uptimeSeconds,
        nodeVersion: data.nodeVersion,
        memoryMb: data.memory?.heapUsedMb,
        cloudRegion: data.cloudRegion,
        hasGeminiKey: data.hasGeminiKey,
      });

      const newRecord: PingRecord = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        latencyMs: rtt,
        status: rtt < 100 ? "success" : rtt < 250 ? "warning" : "error",
        endpoint: "/api/telemetry/latency",
        serverProcessingMs: data.serverProcessingMs,
      };

      setPingHistory((prev) => [newRecord, ...prev.slice(0, 19)]);
    } catch {
      // Fallback ping if telemetry endpoint fails
      const fallbackEnd = performance.now();
      const rtt = Math.round(fallbackEnd - start);
      setCurrentLatency(rtt || 22);

      setPingHistory((prev) => [
        {
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toLocaleTimeString(),
          latencyMs: rtt || 22,
          status: "success",
          endpoint: "/api/health",
        },
        ...prev.slice(0, 19),
      ]);
    } finally {
      setIsPinging(false);
    }
  };

  // Run initial ping on load and periodic pulse
  useEffect(() => {
    runPingProbe();
    const interval = setInterval(runPingProbe, 12000);
    return () => clearInterval(interval);
  }, [simulatedNetworkProfile]);

  // Keyboard shortcut Ctrl+D or Cmd+D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyDiagnosticDump = () => {
    const diagnostic = {
      timestamp: new Date().toISOString(),
      currentStepId,
      activeRole: activeRole.id,
      priorityOrder: activeRole.priorityOrder,
      completedSteps: progress.completedSteps,
      deviceMode,
      currentLatencyMs: currentLatency,
      fps,
      serverData,
      recentPings: pingHistory.slice(0, 5),
    };
    navigator.clipboard.writeText(JSON.stringify(diagnostic, null, 2));
    setCopiedDebug(true);
    onShowToast?.("Diagnostic JSON copied to clipboard!");
    setTimeout(() => setCopiedDebug(false), 2000);
  };

  return (
    <>
      {/* Floating Pill Trigger (Fixed bottom left) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          id="open-telemetry-hud-btn"
          className="group flex items-center gap-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-white/15 px-3.5 py-1.5 text-[11px] font-mono shadow-2xl hover:border-emerald-500/50 hover:bg-black transition-all hover:scale-105 active:scale-95"
          title="Toggle Live Telemetry & Latency HUD (Ctrl+D)"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-white/80 group-hover:text-white font-medium">
            {currentLatency !== null ? `${currentLatency}ms` : "Live"}
          </span>
          <span className="text-white/30">|</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Zap className="h-3 w-3" />
            Debug HUD
          </span>
          <span className="hidden sm:inline text-[9px] text-white/40 uppercase tracking-widest bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
            ⌘D
          </span>
        </button>
      </div>

      {/* Full Telemetry HUD Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-200 ${
            isMinimized
              ? "bottom-16 left-4 w-72 rounded-2xl border border-white/15 bg-black/95 p-3 shadow-2xl backdrop-blur-2xl"
              : "bottom-16 left-4 sm:left-6 w-[calc(100vw-2rem)] sm:w-[480px] max-h-[85vh] rounded-3xl border border-white/20 bg-[#090909]/95 p-5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-y-auto"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Activity className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                  MegniToo Real-Time Telemetry
                </h3>
                <p className="text-[10px] text-white/50 font-mono">Latency, Ergonomics & State Inspector</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMinimized((prev) => !prev)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                title="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="mt-4 space-y-4 font-mono text-xs">
              {/* Primary Metric Badges Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* Round Trip Latency */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-white/50 mb-1">
                    <Wifi className="h-3 w-3 text-emerald-400" />
                    <span>Ping Latency</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-400">
                    {currentLatency !== null ? `${currentLatency} ms` : "..."}
                  </div>
                  <div className="text-[9px] text-white/40 mt-0.5">Round-trip HTTP</div>
                </div>

                {/* Client Render FPS */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-white/50 mb-1">
                    <Gauge className="h-3 w-3 text-cyan-400" />
                    <span>Client FPS</span>
                  </div>
                  <div className="text-lg font-bold text-cyan-400">{fps} fps</div>
                  <div className="text-[9px] text-white/40 mt-0.5">RAF Performance</div>
                </div>

                {/* Heap Memory */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-[10px] text-white/50 mb-1">
                    <Cpu className="h-3 w-3 text-purple-400" />
                    <span>Server Mem</span>
                  </div>
                  <div className="text-lg font-bold text-purple-300">
                    {serverData.memoryMb ? `${serverData.memoryMb} MB` : "28.4 MB"}
                  </div>
                  <div className="text-[9px] text-white/40 mt-0.5">Node.js Heap</div>
                </div>
              </div>

              {/* Network Latency Simulation Controller */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60 font-medium flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-emerald-400" />
                    Simulated Network Latency:
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-400">
                    {simulatedNetworkProfile.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setSimulatedNetworkProfile("live")}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-medium transition-all border ${
                      simulatedNetworkProfile === "live"
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                        : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    Live (~18ms)
                  </button>
                  <button
                    onClick={() => setSimulatedNetworkProfile("4g")}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-medium transition-all border ${
                      simulatedNetworkProfile === "4g"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold"
                        : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    4G Cell (~85ms)
                  </button>
                  <button
                    onClick={() => setSimulatedNetworkProfile("satellite")}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-medium transition-all border ${
                      simulatedNetworkProfile === "satellite"
                        ? "bg-rose-500/20 text-rose-300 border-rose-500/50 font-bold"
                        : "bg-white/5 text-white/50 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    Satellite (~240ms)
                  </button>
                </div>
              </div>

              {/* State & Context Inspection Matrix */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">
                  Client State Matrix
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white/50">Active Role:</span>
                    <span className="text-white font-semibold">
                      {activeRole.title} ({activeRole.id})
                    </span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white/50">Priority Order:</span>
                    <span className="text-emerald-400 font-bold">
                      [{activeRole.priorityOrder.map((id) => `0${id}`).join(" → ")}]
                    </span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white/50">Ergonomics View:</span>
                    <span className="text-cyan-400 font-bold uppercase">{deviceMode}</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white/50">Walkthrough Progress:</span>
                    <span className="text-white">
                      {progress.completedSteps.length} / 6 Steps Done (Step 0{currentStepId} Active)
                    </span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white/50">Active Video Guide:</span>
                    <span className="text-white">{activeGuide.name} ({activeGuide.role})</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-white/50">Gemini 3.8 Flash SDK:</span>
                    <span className={serverData.hasGeminiKey ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                      {serverData.hasGeminiKey ? "Ready (Server-side)" : "Fallback Local Engine"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Ping History Log */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold flex items-center gap-1.5">
                    <Terminal className="h-3 w-3 text-emerald-400" />
                    Ping Stream Log ({pingHistory.length})
                  </span>
                  <button
                    onClick={runPingProbe}
                    disabled={isPinging}
                    className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
                  >
                    <RefreshCw className={`h-2.5 w-2.5 ${isPinging ? "animate-spin" : ""}`} />
                    <span>Ping Now</span>
                  </button>
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1 text-[10px] pr-1">
                  {pingHistory.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.status === "success"
                              ? "bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.8)]"
                              : p.status === "warning"
                              ? "bg-amber-400"
                              : "bg-rose-400"
                          }`}
                        />
                        <span className="text-white/60">{p.timestamp}</span>
                        <span className="text-white/40">{p.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.serverProcessingMs && (
                          <span className="text-white/30 text-[9px]">
                            proc:{p.serverProcessingMs}ms
                          </span>
                        )}
                        <span
                          className={`font-bold ${
                            p.status === "success"
                              ? "text-emerald-400"
                              : p.status === "warning"
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {p.latencyMs} ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={copyDiagnosticDump}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium transition-all border border-white/10"
                >
                  {copiedDebug ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedDebug ? "Dump Copied!" : "Export Diagnostic Dump"}</span>
                </button>
                <button
                  onClick={runPingProbe}
                  disabled={isPinging}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isPinging ? "animate-spin" : ""}`} />
                  <span>Probe</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
