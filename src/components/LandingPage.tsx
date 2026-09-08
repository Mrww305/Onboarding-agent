import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Tv,
  Terminal,
  Cpu,
  Rocket,
  Users,
  Award,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Play,
  Volume2,
  ChevronRight,
  Code2,
  Zap,
  Globe,
  Sliders,
  Check,
  Copy,
  Target,
  BarChart3,
  Megaphone,
} from "lucide-react";
import {
  INCUBATION_TRACKS,
  STUDY_SQUADS,
  AVATAR_GUIDES,
  MENTORS,
  ORGANIZATION_ROLES,
  WALKTHROUGH_STEPS,
  SQUADS_DISCORD_COMMUNITY_URL,
} from "../data/onboardingData";
import { AvatarGuide, OrgRoleId } from "../types";

const ROLE_ICONS: Record<OrgRoleId, React.ReactNode> = {
  administrator: <ShieldCheck className="h-4 w-4" />,
  developer: <Code2 className="h-4 w-4" />,
  marketing: <Megaphone className="h-4 w-4" />,
  sales: <Target className="h-4 w-4" />,
  executive: <BarChart3 className="h-4 w-4" />,
};

interface LandingPageProps {
  onLaunchApp: (stepId?: number, roleId?: OrgRoleId) => void;
  activeGuide: AvatarGuide;
  onSelectGuide: (guide: AvatarGuide) => void;
  onOpenDiscord: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  activeGuide,
  onSelectGuide,
  onOpenDiscord,
}) => {
  const [selectedPreviewRole, setSelectedPreviewRole] = useState<OrgRoleId>("developer");
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const activeRoleObj =
    ORGANIZATION_ROLES.find((r) => r.id === selectedPreviewRole) || ORGANIZATION_ROLES[1];

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(SQUADS_DISCORD_COMMUNITY_URL);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-emerald-500/25 selection:text-emerald-300 font-sans">
      {/* Top Floating Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-emerald-900/30 to-emerald-950/60 border-b border-emerald-500/20 px-4 py-2 text-center text-xs text-emerald-300/90 font-mono flex items-center justify-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Fall 2026 Applications Open: 450+ Scholars onboarded across SF, Berlin & Tokyo.</span>
        <a
          href={SQUADS_DISCORD_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 underline font-bold hover:text-white ml-2"
        >
          Join Discord Cohort <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Landing Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black font-serif font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif italic tracking-tight text-white font-bold">
                  MegniToo
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-bold rounded-md bg-emerald-500/10 px-1.5 py-0.5 border border-emerald-500/20">
                  Incubator
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                AI • Cloud GPU • DevOps
              </p>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-white/60">
            <a href="#features" className="hover:text-white transition-colors">
              Pillars
            </a>
            <a href="#roles" className="hover:text-white transition-colors">
              Role Matrix
            </a>
            <a href="#curriculum" className="hover:text-white transition-colors">
              Tracks
            </a>
            <a href="#community" className="hover:text-white transition-colors">
              Discord Squads
            </a>
            <a href="#mentors" className="hover:text-white transition-colors">
              Mentors
            </a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={SQUADS_DISCORD_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 px-3 py-1.5 text-xs font-mono text-[#8ea1ff] transition-all"
              title="Official MegniToo Squads Discord"
            >
              <MessageSquare className="h-3.5 w-3.5 text-[#5865F2]" />
              <span>Discord</span>
            </a>

            <button
              onClick={() => onLaunchApp(1, selectedPreviewRole)}
              id="nav-launch-console-btn"
              className="flex items-center gap-2 rounded-xl bg-white hover:bg-emerald-400 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <span>Launch Console</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-900/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-8 relative z-10 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1 text-xs text-emerald-300 font-mono mb-6 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Interactive Onboarding & Production Launchpad</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic text-white tracking-tight max-w-5xl mx-auto leading-[1.1]">
            Master Production AI, High-Throughput GPUs & Cloud DevOps
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-white/65 max-w-3xl mx-auto leading-relaxed font-sans">
            An elite engineering incubator combining role-adaptive video presenters, NVIDIA H100
            inference benchmarks, automated Vercel CI/CD pipelines, and peer squads on Discord.
          </p>

          {/* Primary Hero CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onLaunchApp(1, selectedPreviewRole)}
              id="hero-start-walkthrough-btn"
              className="flex items-center gap-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-black px-6 py-3.5 text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.35)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Start Interactive Onboarding</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={SQUADS_DISCORD_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-join-discord-btn"
              className="flex items-center gap-2 rounded-2xl bg-white/5 hover:bg-[#5865F2]/20 border border-white/10 hover:border-[#5865F2]/40 text-white hover:text-[#8ea1ff] px-6 py-3.5 text-sm font-mono transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquare className="h-4 w-4 text-[#5865F2]" />
              <span>Join Discord (discord.gg/tgpSywuXP)</span>
            </a>
          </div>

          {/* Proof Metric Chips */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-mono font-bold text-white block">1,979</span>
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-0.5 block">
                TFLOPs H100 Cluster
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 block">
                6 Chapters
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-0.5 block">
                Calibrated Walkthrough
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#8ea1ff] block">
                450+ Peers
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-0.5 block">
                Discord Squad Members
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-mono font-bold text-white block">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-0.5 block">
                Verifiable Scholar Pass
              </span>
            </div>
          </div>

          {/* Interactive Console Teaser Preview Card */}
          <div className="mt-16 rounded-3xl border border-white/15 bg-[#0A0A0A] p-4 sm:p-6 shadow-2xl relative overflow-hidden text-left max-w-5xl mx-auto backdrop-blur-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-white/80 font-bold uppercase tracking-wider">
                  Live Console Preview: Chapter 01 to 06
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-white/40 uppercase">Presenter:</span>
                <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
                  {AVATAR_GUIDES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => onSelectGuide(g)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono transition-all ${
                        activeGuide.id === g.id
                          ? "bg-emerald-400 text-black font-bold"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      <img src={g.avatarUrl} alt={g.name} className="h-3.5 w-3.5 rounded-full object-cover" />
                      <span>{g.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Teaser Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              {/* Left Video Avatar Card */}
              <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-black/60 p-4 relative overflow-hidden">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/90 border border-white/10 group">
                  <img
                    src={activeGuide.avatarUrl}
                    alt={activeGuide.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-emerald-400 font-bold block">
                        Active Presenter
                      </span>
                      <span className="text-sm font-serif italic text-white font-bold">
                        {activeGuide.name} — {activeGuide.role}
                      </span>
                    </div>
                    <button
                      onClick={() => onLaunchApp(1, selectedPreviewRole)}
                      className="rounded-full bg-white/20 hover:bg-emerald-400 hover:text-black p-2 text-white transition-all backdrop-blur-md"
                      title="Launch Video Tour"
                    >
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/70 font-mono">
                  <span className="text-emerald-400 text-[10px] block uppercase font-bold">
                    Teleprompter Narration
                  </span>
                  "Welcome to MegniToo. We adapt our training matrix to your specific role in AI & cloud systems."
                </div>
              </div>

              {/* Right Chapters Interactive Switcher */}
              <div className="lg:col-span-7 space-y-2.5">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                  Select a Chapter to Enter Directly:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {WALKTHROUGH_STEPS.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => onLaunchApp(step.id, selectedPreviewRole)}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 text-left transition-all group"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-emerald-400">
                            0{step.id}
                          </span>
                          <span className="text-xs font-serif italic text-white font-medium group-hover:text-emerald-300 transition-colors">
                            {step.shortTitle}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/50 mt-0.5 line-clamp-1">
                          {step.title}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-white/50 font-mono">
                    ✦ Progress automatically saved in local browser state
                  </span>
                  <button
                    onClick={() => onLaunchApp(1, selectedPreviewRole)}
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <span>Full Screen Console</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Role-Adaptive Matrix Section */}
      <section id="roles" className="py-16 border-t border-white/10 bg-[#080808]/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 border border-emerald-500/30 inline-block mb-3">
              Role-Adaptive Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              Curricula Calibrated for Your Engineering Level
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
              Choose your profile. The video agent, benchmarks, and walkthrough immediately calibrate to your exact day-to-day tooling.
            </p>
          </div>

          {/* Role Pills Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {ORGANIZATION_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedPreviewRole(role.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-mono transition-all border ${
                  selectedPreviewRole === role.id
                    ? "bg-white text-black font-bold border-white shadow-lg"
                    : "bg-white/[0.03] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{role.icon}</span>
                <span>{role.title}</span>
              </button>
            ))}
          </div>

          {/* Active Role Preview Card */}
          <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[90px] pointer-events-none rounded-full" />
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xl">
                  {activeRoleObj.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif italic text-white font-bold">
                    {activeRoleObj.title}
                  </h3>
                  <p className="text-xs text-white/50">{activeRoleObj.tagline}</p>
                </div>
              </div>

              <button
                onClick={() => onLaunchApp(1, activeRoleObj.id)}
                className="flex items-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Calibrate & Enter</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                  Target Curriculum Track
                </span>
                <span className="text-sm font-serif italic text-white block">
                  {activeRoleObj.roleSpecificFocus.curriculum}
                </span>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                  GPU & Compute Emphasis
                </span>
                <span className="text-sm font-serif italic text-white block">
                  {activeRoleObj.roleSpecificFocus.gpuWorkspace}
                </span>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                  CI/CD & Deployment Strategy
                </span>
                <span className="text-sm font-serif italic text-white block">
                  {activeRoleObj.roleSpecificFocus.deployment}
                </span>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                  Recommended Discord Cohort
                </span>
                <span className="text-sm font-serif italic text-white block">
                  {activeRoleObj.roleSpecificFocus.community}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars Bento Grid */}
      <section id="features" className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 border border-white/10 inline-block mb-3">
              Comprehensive Platform Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              Six Interconnected Incubation Systems
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
              From raw tensor benchmarks on bare-metal GPUs to live production GitOps deployments and peer accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1: Video Agent Presenter */}
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Tv className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif italic text-white font-bold">
                  AI Video Presenter Agents
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Zayd and Aria provide live teleprompter-guided tours with adjustable speech speeds, synchronized chapter jumping, and role-adjusted commentary.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>01. Presenter Studio</span>
                <button onClick={() => onLaunchApp(1)} className="hover:underline">
                  Launch Step →
                </button>
              </div>
            </div>

            {/* Pillar 2: Incubation Tracks */}
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif italic text-white font-bold">
                  Production AI Curricula
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Three distinct pathways spanning Generative AI Multi-Agent Systems, Kubernetes GPU Clusters, and Full-Stack Edge Inference deployment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>02. Curriculum Tracks</span>
                <button onClick={() => onLaunchApp(2)} className="hover:underline">
                  Launch Step →
                </button>
              </div>
            </div>

            {/* Pillar 3: GPU Cloud Sandbox */}
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif italic text-white font-bold">
                  NVIDIA H100 GPU Sandbox
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Simulate high-throughput FP16 / INT8 tensor matrix multiplications, verify cold-start latency (12ms), and stress test GPU memory bandwidth.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>03. Cloud GPU Labs</span>
                <button onClick={() => onLaunchApp(3)} className="hover:underline">
                  Launch Step →
                </button>
              </div>
            </div>

            {/* Pillar 4: Vercel & GitHub CI/CD */}
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif italic text-white font-bold">
                  Automated Vercel CI/CD
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Integrate GitHub repositories directly with Vercel edge networks, execute automated healthchecks, and verify branch deployment workflows.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>04. Deployment Pipeline</span>
                <button onClick={() => onLaunchApp(4)} className="hover:underline">
                  Launch Step →
                </button>
              </div>
            </div>

            {/* Pillar 5: Senior Staff Mentorship */}
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif italic text-white font-bold">
                  1-on-1 Senior Staff Mentorship
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Book 45-minute architectural review sessions with Principal ML Engineers from leading tech corporations including Google, NVIDIA, and Stripe.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>05. Office Hours</span>
                <button onClick={() => onLaunchApp(5)} className="hover:underline">
                  Launch Step →
                </button>
              </div>
            </div>

            {/* Pillar 6: Discord Squads & Scholar Pass */}
            <div className="rounded-3xl border border-[#5865F2]/30 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-[#5865F2]/60 transition-all group">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8ea1ff] mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-serif italic text-white font-bold">
                  Discord Squads & Scholar Pass
                </h3>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">
                  Join study squads on the official Discord community (`discord.gg/tgpSywuXP`), collaborate on pair programming, and unlock a cryptographic Scholar Pass.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8ea1ff]">
                <span>06. Community & Pass</span>
                <button onClick={() => onLaunchApp(6)} className="hover:underline">
                  Launch Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Tracks Detail */}
      <section id="curriculum" className="py-20 border-t border-white/10 bg-[#080808]/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 border border-emerald-500/30 inline-block mb-3">
              Structured Engineering Syllabi
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              Three Incubation Tracks
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
              Rigorous, hands-on production codebases designed to take you from foundational understanding to enterprise-grade mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INCUBATION_TRACKS.map((track) => (
              <div
                key={track.id}
                className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {track.level}
                    </span>
                    <span className="text-xs font-mono text-white/40">{track.duration}</span>
                  </div>

                  <h3 className="text-xl font-serif italic text-white font-bold">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/60 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Modules */}
                  <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                    <span className="text-[9px] font-mono uppercase text-white/40 tracking-wider block">
                      Core Modules:
                    </span>
                    {track.modules.map((mod, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {track.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-mono text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-300 font-bold">
                    {track.gpuHours} GPU Cloud Hours
                  </span>
                  <button
                    onClick={() => onLaunchApp(2)}
                    className="flex items-center gap-1 text-xs font-bold text-black bg-white hover:bg-emerald-400 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <span>Select Track</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Discord Community Callout */}
      <section id="community" className="py-20 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 via-transparent to-[#5865F2]/10 pointer-events-none" />
        
        <div className="mx-auto max-w-6xl px-4 sm:px-8 relative z-10">
          <div className="rounded-3xl border border-[#5865F2]/30 bg-[#0A0A0A] p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#5865F2] animate-ping" />
                  <span className="rounded-full bg-[#5865F2]/20 border border-[#5865F2]/40 px-3 py-1 text-[10px] uppercase tracking-wider font-mono text-[#8ea1ff] font-bold">
                    Official Squads Hub
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight leading-tight">
                  Join 450+ Engineers on the MegniToo Squads Discord
                </h2>
                <p className="mt-4 text-sm text-white/70 leading-relaxed font-sans">
                  Connect with regional peer squads across San Francisco, Berlin, Tokyo, and remote cohorts.
                  Participate in live GPU hackathons, review production PRs, and join weekly voice office hours with mentors.
                </p>

                {/* Squad List Mini Preview */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {STUDY_SQUADS.map((squad) => (
                    <div
                      key={squad.id}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-white/80 flex items-center gap-2"
                    >
                      <span className="text-sm">{squad.flag}</span>
                      <span className="font-bold">{squad.name}</span>
                      <span className="text-[10px] text-emerald-400">({squad.activeMembers} active)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Side */}
              <div className="flex flex-col gap-3.5 shrink-0 w-full lg:w-72">
                <a
                  href={SQUADS_DISCORD_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="landing-join-discord-btn"
                  className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752c4] text-white px-6 py-4 text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(88,101,242,0.4)] transition-all hover:scale-105 active:scale-95 text-center"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Join Discord Server</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                </a>

                <button
                  onClick={handleCopyDiscord}
                  id="landing-copy-discord-btn"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white px-4 py-2.5 text-xs font-mono transition-all"
                >
                  {copiedDiscord ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedDiscord ? "Invite Link Copied!" : "Copy Invite Link"}</span>
                </button>

                <p className="text-[10px] text-center text-white/40 font-mono">
                  Direct invite: discord.gg/tgpSywuXP
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senior Industry Mentors */}
      <section id="mentors" className="py-20 border-t border-white/10 bg-[#080808]/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-400 border border-emerald-500/30 inline-block mb-3">
              Direct Senior Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              1-on-1 Mentorship from Industry Leaders
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
              Book private 45-minute architectural consultations, mock system designs, and code reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENTORS.map((m) => (
              <div
                key={m.id}
                className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-5 shadow-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all text-center group"
              >
                <div>
                  <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-emerald-500/50 transition-all">
                    <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                  </div>

                  <h3 className="text-base font-serif italic text-white font-bold">
                    {m.name}
                  </h3>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">{m.role}</p>
                  <p className="text-[11px] text-white/40 font-mono">{m.company}</p>

                  <p className="mt-3 text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {m.bio}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-300 text-[11px]">Next: {m.nextSlot}</span>
                  <button
                    onClick={() => onLaunchApp(5)}
                    className="text-[11px] font-mono text-white/70 hover:text-emerald-400 underline font-bold"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="mx-auto max-w-4xl px-4 sm:px-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif italic text-white tracking-tight">
            Ready to Accelerate Your AI Engineering Journey?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Start with Chapter 01 Role Calibration. The entire platform saves your state dynamically and guides you through to your verifiable Scholar Pass.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onLaunchApp(1, selectedPreviewRole)}
              id="final-launch-console-btn"
              className="flex items-center gap-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-black px-7 py-4 text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(52,211,153,0.35)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Launch Interactive Console</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={SQUADS_DISCORD_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-white/5 hover:bg-[#5865F2]/20 border border-white/10 text-white px-6 py-4 text-sm font-mono transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquare className="h-4 w-4 text-[#5865F2]" />
              <span>Join Discord Cohort</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040404] py-10 text-white/40 text-xs font-mono">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black font-serif font-bold text-xs">
              M
            </div>
            <span>© 2026 MegniToo Incubator • megnitoo.com • All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={SQUADS_DISCORD_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <MessageSquare className="h-3 w-3" />
              <span>Discord</span>
            </a>
            <a
              href="https://megnitoo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>megnitoo.com</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <button onClick={() => onLaunchApp(1)} className="hover:text-white transition-colors">
              Console
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
