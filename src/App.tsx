import React, { useState, useEffect } from "react";
import {
  AVATAR_GUIDES,
  WALKTHROUGH_STEPS,
  INCUBATION_TRACKS,
  MENTORS,
  STUDY_SQUADS,
  FREQUENT_QUESTIONS,
  ORGANIZATION_ROLES,
  getRoleAdjustedStep,
  getRoleById,
} from "./data/onboardingData";
import { AvatarGuide, UserOnboardingProgress, OrgRoleId } from "./types";
import { Header } from "./components/Header";
import { VideoPlayerAgent } from "./components/VideoPlayerAgent";
import { RoleDiscoveryWalkthrough } from "./components/walkthroughs/RoleDiscoveryWalkthrough";
import { CurriculumWalkthrough } from "./components/walkthroughs/CurriculumWalkthrough";
import { GpuWorkspaceWalkthrough } from "./components/walkthroughs/GpuWorkspaceWalkthrough";
import { DeploymentWalkthrough } from "./components/walkthroughs/DeploymentWalkthrough";
import { MentorshipWalkthrough } from "./components/walkthroughs/MentorshipWalkthrough";
import { CommunityWalkthrough } from "./components/walkthroughs/CommunityWalkthrough";
import { AgentChatDrawer } from "./components/AgentChatDrawer";
import { CompletionCertificateModal } from "./components/CompletionCertificateModal";
import { FlutterBottomNav, MobileTab } from "./components/FlutterBottomNav";
import { FlutterNavRail } from "./components/FlutterNavRail";
import { FlutterStepsBottomSheet } from "./components/FlutterStepsBottomSheet";
import { FlutterRoleBottomSheet } from "./components/FlutterRoleBottomSheet";
import { FlutterSnackbar } from "./components/FlutterSnackbar";
import { DeviceMode } from "./components/FlutterDeviceSelector";
import { VercelDeployModal } from "./components/VercelDeployModal";
import {
  Sparkles,
  CheckCircle2,
  Circle,
  HelpCircle,
  Award,
  ExternalLink,
  Sliders,
  ChevronRight,
  Tv,
  Terminal,
  Layers,
  Smartphone,
  Tablet,
  Laptop,
} from "lucide-react";

export default function App() {
  const [activeGuide, setActiveGuide] = useState<AvatarGuide>(AVATAR_GUIDES[0]);
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Flutter Adaptive UI States
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("auto");
  const [mobileTab, setMobileTab] = useState<MobileTab>("guide");
  const [mobileViewStyle, setMobileViewStyle] = useState<"tabbed" | "stacked">("tabbed");
  const [isVercelModalOpen, setIsVercelModalOpen] = useState<boolean>(false);
  const [isStepsSheetOpen, setIsStepsSheetOpen] = useState<boolean>(false);
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [progress, setProgress] = useState<UserOnboardingProgress>(() => {
    const saved = localStorage.getItem("megnitoo_onboarding_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          selectedRoleId: parsed.selectedRoleId || "developer",
          roleConfirmed: parsed.roleConfirmed || false,
        };
      } catch (e) {
        // Fallback
      }
    }
    return {
      selectedRoleId: "developer",
      roleConfirmed: false,
      selectedTrackId: null,
      gpuBenchmarkRan: false,
      deploymentTriggered: false,
      mentorBooked: false,
      squadJoined: false,
      completedSteps: [],
      scholarName: "New AI Scholar",
    };
  });

  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);

  // Sync progress to localStorage
  useEffect(() => {
    localStorage.setItem("megnitoo_onboarding_progress", JSON.stringify(progress));
  }, [progress]);

  const activeRoleObj = getRoleById(progress.selectedRoleId);

  const rawStep =
    WALKTHROUGH_STEPS.find((s) => s.id === currentStepId) || WALKTHROUGH_STEPS[0];
  const currentStep = getRoleAdjustedStep(rawStep, progress.selectedRoleId);

  const markStepComplete = (stepId: number) => {
    setProgress((prev) => {
      if (!prev.completedSteps.includes(stepId)) {
        return {
          ...prev,
          completedSteps: [...prev.completedSteps, stepId],
        };
      }
      return prev;
    });
  };

  // Step 1: Role selection & confirmation
  const handleSelectRole = (roleId: OrgRoleId) => {
    setProgress((prev) => ({
      ...prev,
      selectedRoleId: roleId,
    }));
  };

  const handleConfirmRole = (roleId: OrgRoleId) => {
    setProgress((prev) => ({
      ...prev,
      selectedRoleId: roleId,
      roleConfirmed: true,
    }));
    markStepComplete(1);
    const role = getRoleById(roleId);
    showToast(`Role calibrated for ${role.title}`);
  };

  const handleProceedFromRoleStep = () => {
    handleConfirmRole(progress.selectedRoleId || "developer");
    // Prioritize highest-priority step for selected role
    const chosenRoleObj = getRoleById(progress.selectedRoleId || "developer");
    const topPriorityStepId = chosenRoleObj.priorityOrder[0] || 2;
    setCurrentStepId(topPriorityStepId);
  };

  // Step 2: Track selection
  const handleSelectTrack = (trackId: string) => {
    setProgress((prev) => ({ ...prev, selectedTrackId: trackId }));
    markStepComplete(2);
    showToast("Curriculum track locked in!");
  };

  // Step 3: GPU benchmark
  const handleCompleteBenchmark = () => {
    setProgress((prev) => ({ ...prev, gpuBenchmarkRan: true }));
    markStepComplete(3);
    showToast("NVIDIA H100 GPU benchmark verified!");
  };

  // Step 4: Deployment
  const handleCompleteDeployment = () => {
    setProgress((prev) => ({ ...prev, deploymentTriggered: true }));
    markStepComplete(4);
    showToast("Deployment verified! Vercel & GitHub pipeline ready.");
  };

  // Step 5: Mentorship
  const handleCompleteMentorship = () => {
    setProgress((prev) => ({ ...prev, mentorBooked: true }));
    markStepComplete(5);
    showToast("1-on-1 industry mentor session booked!");
  };

  // Step 6: Squad join
  const handleJoinSquad = (squadId: string) => {
    setProgress((prev) => ({ ...prev, squadJoined: true }));
    markStepComplete(6);
    showToast("Study Squad joined! Ready for graduation.");
  };

  const handleNextStep = () => {
    if (currentStepId < WALKTHROUGH_STEPS.length) {
      setCurrentStepId((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepId > 1) {
      setCurrentStepId((prev) => prev - 1);
    }
  };

  const handleRestartOnboarding = () => {
    setProgress({
      selectedRoleId: "developer",
      roleConfirmed: false,
      selectedTrackId: null,
      gpuBenchmarkRan: false,
      deploymentTriggered: false,
      mentorBooked: false,
      squadJoined: false,
      completedSteps: [],
      scholarName: progress.scholarName,
    });
    setCurrentStepId(1);
    setIsCertModalOpen(false);
    setIsPlaying(true);
  };

  const allCompleted = progress.completedSteps.length >= WALKTHROUGH_STEPS.length;

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-[#e5e5e5] selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Header */}
      <Header
        guides={AVATAR_GUIDES}
        activeGuide={activeGuide}
        onSelectGuide={(guide) => setActiveGuide(guide)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={(speed) => setPlaybackSpeed(speed)}
        progress={progress}
        totalSteps={WALKTHROUGH_STEPS.length}
        onOpenCertificate={() => setIsCertModalOpen(true)}
        activeRole={activeRoleObj}
        onSelectRoleStep={() => setCurrentStepId(1)}
        onOpenVercelModal={() => setIsVercelModalOpen(true)}
        deviceMode={deviceMode}
        onChangeDeviceMode={(mode) => {
          setDeviceMode(mode);
          showToast(`Flutter UI layout: ${mode.toUpperCase()}`);
        }}
      />

      {/* Main Responsive Body with optional Flutter Navigation Rail for Tablets */}
      <div className={`flex w-full ${deviceMode === "tablet" ? "flex-row" : "flex-col md:flex-row"}`}>
        {/* Flutter Tablet Navigation Rail */}
        {(deviceMode === "tablet" || deviceMode === "auto") && (
          <div className={deviceMode === "tablet" ? "block" : "hidden md:flex lg:hidden shrink-0"}>
            <FlutterNavRail
              steps={WALKTHROUGH_STEPS}
              currentStepId={currentStepId}
              onSelectStep={(stepId) => setCurrentStepId(stepId)}
              completedSteps={progress.completedSteps}
              activeRole={activeRoleObj}
              onOpenRoleModal={() => setIsRoleSheetOpen(true)}
              onOpenVercelModal={() => setIsVercelModalOpen(true)}
              onOpenCertificate={() => setIsCertModalOpen(true)}
              onOpenAskAgent={() => setIsChatDrawerOpen(true)}
              activeGuide={activeGuide}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <main
            className={`mx-auto px-4 py-6 sm:px-8 pb-28 md:pb-12 ${
              deviceMode === "mobile"
                ? "max-w-md my-4 rounded-[40px] border-2 border-white/20 p-4 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-[#070707]"
                : "max-w-7xl"
            }`}
          >
            {/* Mobile Simulation Frame Bezel (only shown in simulated mobile mode) */}
            {deviceMode === "mobile" && (
              <div className="flex items-center justify-between px-3 py-1 mb-4 rounded-full bg-black/60 border border-white/10 text-[10px] text-white/50">
                <span className="font-mono">9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider">Flutter M3</span>
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3 text-emerald-400" />
                </div>
              </div>
            )}

            {/* Top Hero Banner */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/15 via-transparent to-transparent opacity-60 pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] font-medium text-emerald-400 border border-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                      Interactive Video Tour
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
                      megnitoo.com
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-white tracking-tight">
                    Megnitoo AI & DevOps Launchpad
                  </h1>
                  <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-3xl leading-relaxed">
                    Interactive video presenter & hands-on console calibrated dynamically for your role. Explore curriculum, run GPU benchmark tests, verify Vercel CI/CD rollouts, and connect with mentors.
                  </p>

                  {/* Active Role Alignment Callout */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white/50 text-[11px]">Calibrated for:</span>
                      <span className="font-bold text-white font-serif italic">{activeRoleObj.title}</span>
                      <span className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-emerald-400">
                        {activeRoleObj.badge}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsRoleSheetOpen(true)}
                      id="switch-role-inline-btn"
                      className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-mono text-emerald-400 hover:text-emerald-300 hover:underline transition-all"
                    >
                      <Sliders className="h-3 w-3" />
                      <span>Switch Role</span>
                    </button>
                  </div>
                </div>

                {/* Step Selector Pills (Desktop / Laptop View) */}
                <div className="hidden lg:flex flex-wrap items-center gap-1.5 self-center">
                  {WALKTHROUGH_STEPS.map((step) => {
                    const isCurrent = step.id === currentStepId;
                    const isDone = progress.completedSteps.includes(step.id);
                    const adjustedStep = getRoleAdjustedStep(step, progress.selectedRoleId);
                    const priorityIndex = activeRoleObj.priorityOrder.indexOf(step.id);
                    const isTopPriority = priorityIndex === 0;
                    const isSecondPriority = priorityIndex === 1;

                    return (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStepId(step.id)}
                        id={`step-nav-pill-${step.id}`}
                        className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] uppercase tracking-[0.1em] font-medium transition-all border ${
                          isCurrent
                            ? "bg-white text-black border-white font-bold shadow-lg"
                            : isDone
                            ? "bg-white/5 text-emerald-400 border-emerald-500/30 hover:bg-white/10"
                            : isTopPriority
                            ? "bg-emerald-950/30 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40"
                            : "bg-white/[0.02] text-white/40 border-white/5 hover:border-white/10 hover:text-white/70"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Circle className="h-3 w-3 opacity-40" />
                        )}
                        <span>0{step.id}. {adjustedStep.shortTitle}</span>
                        {isTopPriority && !isDone && (
                          <span className="rounded bg-emerald-500/20 px-1 py-0.2 text-[8px] font-mono font-bold text-emerald-300 border border-emerald-500/40">
                            ★ P1
                          </span>
                        )}
                        {isSecondPriority && !isDone && (
                          <span className="rounded bg-white/10 px-1 py-0.2 text-[8px] font-mono text-white/60">
                            P2
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Flutter Segmented Tab Switcher (For Mobile & Tablet Viewports) */}
            <div className={`${deviceMode === "laptop" ? "hidden" : "lg:hidden"} flex items-center justify-between bg-white/[0.04] p-1.5 rounded-2xl border border-white/10 mb-4`}>
              <div className="flex items-center gap-1 flex-1">
                <button
                  onClick={() => setMobileTab("guide")}
                  id="flutter-tab-guide-btn"
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    mobileTab === "guide" && mobileViewStyle === "tabbed"
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Tv className="h-3.5 w-3.5" />
                  <span>Presenter Guide</span>
                </button>
                <button
                  onClick={() => setMobileTab("task")}
                  id="flutter-tab-task-btn"
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                    mobileTab === "task" && mobileViewStyle === "tabbed"
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Task 0{currentStepId}</span>
                  {activeRoleObj.priorityOrder[0] === currentStepId && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </button>
              </div>
              <button
                onClick={() => setMobileViewStyle((prev) => (prev === "tabbed" ? "stacked" : "tabbed"))}
                className="ml-2 px-2.5 py-1.5 rounded-xl text-[10px] font-mono text-white/50 hover:text-white bg-white/5 border border-white/10 shrink-0"
                title="Toggle between single tab focus and full stacked view"
              >
                {mobileViewStyle === "tabbed" ? "Tabs" : "Stacked"}
              </button>
            </div>

            {/* Core Layout Grid: Video Agent Presenter (Left) + Interactive Walkthrough (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Video Presenter Agent Stage (5 cols on large screens) */}
              <div
                className={`lg:col-span-5 lg:sticky lg:top-24 space-y-4 ${
                  mobileViewStyle === "tabbed" && mobileTab !== "guide" && deviceMode !== "laptop"
                    ? "hidden lg:block"
                    : "block"
                }`}
              >
            <VideoPlayerAgent
              currentStep={currentStep}
              activeGuide={activeGuide}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((prev) => !prev)}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              onSelectStep={(id) => setCurrentStepId(id)}
              allSteps={WALKTHROUGH_STEPS}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted((prev) => !prev)}
              playbackSpeed={playbackSpeed}
              onOpenAskAgent={() => setIsChatDrawerOpen(true)}
              activeRole={activeRoleObj}
            />

            {/* Step Action Helper Card matching Sophisticated Dark design */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500">
                      Step 0{currentStep.id} Actionable Task
                    </span>
                    {activeRoleObj.priorityOrder[0] === currentStep.id && (
                      <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
                        ★ Top Priority for {activeRoleObj.shortTitle}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-serif italic text-white mt-1">
                    {currentStep.suggestedAction}
                  </h4>
                </div>
                {progress.completedSteps.includes(currentStep.id) ? (
                  <span className="rounded-full bg-emerald-500/10 p-1.5 text-emerald-400 border border-emerald-500/30 shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.15em] font-medium text-white/60 shrink-0">
                    Pending Action
                  </span>
                )}
              </div>

              {/* Key Takeaways */}
              <div className="mt-4 space-y-2 border-t border-white/5 pt-3.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-medium block">
                  Core Architectural Focus:
                </span>
                {currentStep.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              {/* Pro Context callout matching design */}
              <div className="mt-4 rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-3.5 flex items-start gap-3">
                <span className="text-emerald-400 text-sm">✧</span>
                <div className="text-[11px] text-emerald-200/70 leading-relaxed">
                  <strong className="text-emerald-400 block mb-0.5 uppercase tracking-widest text-[9px] font-mono">
                    {activeRoleObj.shortTitle} Perspective
                  </strong>
                  {currentStep.id === 1 && "Select your organizational role to automatically align teleprompter narration, sandbox tasks, and tool prioritization."}
                  {currentStep.id === 2 && activeRoleObj.roleSpecificFocus.curriculum}
                  {currentStep.id === 3 && activeRoleObj.roleSpecificFocus.gpuWorkspace}
                  {currentStep.id === 4 && activeRoleObj.roleSpecificFocus.deployment}
                  {currentStep.id === 5 && activeRoleObj.roleSpecificFocus.mentorship}
                  {currentStep.id === 6 && activeRoleObj.roleSpecificFocus.community}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Walkthrough Panel (7 cols on large screens) */}
          <div
            className={`lg:col-span-7 ${
              mobileViewStyle === "tabbed" && mobileTab !== "task" && deviceMode !== "laptop"
                ? "hidden lg:block"
                : "block"
            }`}
          >
            {currentStepId === 1 && (
              <RoleDiscoveryWalkthrough
                roles={ORGANIZATION_ROLES}
                selectedRoleId={progress.selectedRoleId}
                onSelectRole={handleSelectRole}
                onConfirmRole={handleConfirmRole}
                onNextWalkthrough={handleProceedFromRoleStep}
                activeRoleObj={activeRoleObj}
              />
            )}

            {currentStepId === 2 && (
              <CurriculumWalkthrough
                tracks={INCUBATION_TRACKS}
                selectedTrackId={progress.selectedTrackId}
                onSelectTrack={handleSelectTrack}
                onNextWalkthrough={handleNextStep}
                activeRole={activeRoleObj}
              />
            )}

            {currentStepId === 3 && (
              <GpuWorkspaceWalkthrough
                onCompleteBenchmark={handleCompleteBenchmark}
                isBenchmarkCompleted={progress.gpuBenchmarkRan}
                onNextWalkthrough={handleNextStep}
                activeRole={activeRoleObj}
              />
            )}

            {currentStepId === 4 && (
              <DeploymentWalkthrough
                onCompleteDeployment={handleCompleteDeployment}
                isDeploymentCompleted={progress.deploymentTriggered}
                onNextWalkthrough={handleNextStep}
                activeRole={activeRoleObj}
                onOpenVercelModal={() => setIsVercelModalOpen(true)}
              />
            )}

            {currentStepId === 5 && (
              <MentorshipWalkthrough
                mentors={MENTORS}
                onCompleteMentorshipBooking={handleCompleteMentorship}
                isMentorshipCompleted={progress.mentorBooked}
                onNextWalkthrough={handleNextStep}
                activeRole={activeRoleObj}
              />
            )}

            {currentStepId === 6 && (
              <CommunityWalkthrough
                squads={STUDY_SQUADS}
                onJoinSquad={handleJoinSquad}
                joinedSquadId={progress.squadJoined ? STUDY_SQUADS[0].id : null}
                onOpenCertificateModal={() => setIsCertModalOpen(true)}
                allStepsCompleted={allCompleted}
                activeRole={activeRoleObj}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  </div>

      {/* Floating Ask Agent Trigger Button */}
      <button
        onClick={() => setIsChatDrawerOpen(true)}
        id="floating-ask-agent-btn"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 flex items-center gap-3 rounded-full bg-white text-black px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] shadow-2xl hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 border border-white"
      >
        <img
          src={activeGuide.avatarUrl}
          alt={activeGuide.name}
          className="h-5 w-5 rounded-full object-cover ring-1 ring-black/20"
        />
        <span>Ask {activeGuide.name}</span>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
      </button>

      {/* Flutter Mobile Bottom Navigation Bar */}
      <div className={deviceMode === "laptop" ? "hidden" : deviceMode === "mobile" ? "block" : "md:hidden"}>
        <FlutterBottomNav
          steps={WALKTHROUGH_STEPS}
          currentStepId={currentStepId}
          onSelectStep={(stepId) => setCurrentStepId(stepId)}
          completedSteps={progress.completedSteps}
          activeRole={activeRoleObj}
          onOpenStepsSheet={() => setIsStepsSheetOpen(true)}
          onOpenRoleSheet={() => setIsRoleSheetOpen(true)}
          onOpenVercelModal={() => setIsVercelModalOpen(true)}
          onOpenCertificate={() => setIsCertModalOpen(true)}
          onOpenAskAgent={() => setIsChatDrawerOpen(true)}
          activeGuide={activeGuide}
        />
      </div>

      {/* Flutter Mobile Bottom Sheet: Step Selector */}
      <FlutterStepsBottomSheet
        isOpen={isStepsSheetOpen}
        onClose={() => setIsStepsSheetOpen(false)}
        steps={WALKTHROUGH_STEPS}
        currentStepId={currentStepId}
        onSelectStep={(stepId) => setCurrentStepId(stepId)}
        completedSteps={progress.completedSteps}
        selectedRoleId={progress.selectedRoleId}
        activeRole={activeRoleObj}
      />

      {/* Flutter Mobile Bottom Sheet: Role Selector */}
      <FlutterRoleBottomSheet
        isOpen={isRoleSheetOpen}
        onClose={() => setIsRoleSheetOpen(false)}
        roles={ORGANIZATION_ROLES}
        selectedRoleId={progress.selectedRoleId}
        onSelectRole={(roleId) => handleSelectRole(roleId)}
      />

      {/* Vercel & GitHub Deployment Center Modal */}
      <VercelDeployModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
        activeRole={activeRoleObj}
        onDeploymentTriggered={() => {
          handleCompleteDeployment();
          showToast("Vercel CI/CD Pipeline successfully synchronized!");
        }}
      />

      {/* Agent Chat Drawer */}
      <AgentChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        activeGuide={activeGuide}
        currentStep={currentStep}
        frequentQuestions={FREQUENT_QUESTIONS}
        activeRole={activeRoleObj}
      />

      {/* Completion Scholar Pass Modal */}
      <CompletionCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        progress={progress}
        tracks={INCUBATION_TRACKS}
        onRestartOnboarding={handleRestartOnboarding}
        onChangeScholarName={(name) =>
          setProgress((prev) => ({ ...prev, scholarName: name }))
        }
        activeRole={activeRoleObj}
      />

      {/* Flutter-style Snackbar Notification */}
      <FlutterSnackbar
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}

