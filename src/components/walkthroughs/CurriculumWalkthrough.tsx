import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  BrainCircuit,
  Server,
  Bot,
  ArrowRight,
  Compass,
  Check,
} from "lucide-react";
import { IncubationTrack, OrgRole } from "../../types";

interface CurriculumWalkthroughProps {
  tracks: IncubationTrack[];
  selectedTrackId: string | null;
  onSelectTrack: (trackId: string) => void;
  onNextWalkthrough: () => void;
  activeRole?: OrgRole;
}

export const CurriculumWalkthrough: React.FC<CurriculumWalkthroughProps> = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
  onNextWalkthrough,
  activeRole,
}) => {
  const [activeTabTrackId, setActiveTabTrackId] = useState<string>(
    selectedTrackId || activeRole?.suggestedTrackId || tracks[0].id
  );
  const [quizExp, setQuizExp] = useState<string>("Beginner");
  const [quizInterest, setQuizInterest] = useState<string>("LLMs & GenAI");
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isLoadingRec, setIsLoadingRec] = useState<boolean>(false);

  const activeTrack = tracks.find((t) => t.id === activeTabTrackId) || tracks[0];

  const getIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="h-5 w-5 text-cyan-400" />;
      case "BrainCircuit":
        return <BrainCircuit className="h-5 w-5 text-purple-400" />;
      case "Server":
        return <Server className="h-5 w-5 text-emerald-400" />;
      case "Bot":
        return <Bot className="h-5 w-5 text-amber-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-cyan-400" />;
    }
  };

  const handleRunRecommender = async () => {
    setIsLoadingRec(true);
    try {
      const res = await fetch("/api/agent/recommend-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceLevel: quizExp,
          interests: quizInterest,
          primaryGoal: "Fast-track to production ML / DevOps engineering",
        }),
      });
      const data = await res.json();
      setAiRecommendation(
        `${data.recommendedTrack}: ${data.rationale} Suggested first step: ${data.suggestedFirstStep}`
      );
      // Automatically switch to recommended track if matched
      const matched = tracks.find((t) =>
        t.title.toLowerCase().includes(data.recommendedTrack.toLowerCase())
      );
      if (matched) {
        setActiveTabTrackId(matched.id);
      }
    } catch (e) {
      setAiRecommendation(
        "Generative AI & LLM Engineering: Ideal for building immediate high-impact conversational and vector retrieval applications."
      );
    } finally {
      setIsLoadingRec(false);
    }
  };

  return (
    <div className="space-y-6" id="walkthrough-curriculum-container">
      {/* Intro Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500">
                Interactive Walkthrough 02 of 06
              </span>
              {activeRole && (
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-emerald-400 border border-emerald-500/20">
                  {activeRole.shortTitle} Curriculum
                </span>
              )}
            </div>
            <h2 className="text-xl font-serif italic text-white mt-0.5">
              Megnitoo Incubation Tracks
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
              {activeRole
                ? activeRole.roleSpecificFocus.curriculum
                : "Select your primary engineering specialization. All tracks feature rigorous project milestones, subsidized GPU compute, and weekly 1-on-1 industry reviews."}
            </p>
          </div>

          {selectedTrackId && (
            <span className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Track Selected
            </span>
          )}
        </div>
      </div>

      {/* AI Track Finder Mini-Tool */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-3">
          <Compass className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-serif text-white">
            AI Track Matchmaker Quiz
          </h3>
          <span className="text-[9px] uppercase tracking-[0.15em] bg-white/5 border border-white/10 text-white/50 px-2 py-0.5 rounded">
            Agent Powered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-medium block mb-1">
              Your Current Experience
            </label>
            <select
              value={quizExp}
              onChange={(e) => setQuizExp(e.target.value)}
              className="w-full rounded-xl bg-[#0A0A0A] px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-emerald-500 focus:outline-none"
              id="quiz-exp-select"
            >
              <option value="Complete Beginner">Complete Beginner (No code)</option>
              <option value="Basic Python">Basic Python / JavaScript</option>
              <option value="Intermediate Developer">Intermediate Developer</option>
              <option value="Advanced Engineer">Experienced Engineer</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-medium block mb-1">
              Primary Ambition
            </label>
            <select
              value={quizInterest}
              onChange={(e) => setQuizInterest(e.target.value)}
              className="w-full rounded-xl bg-[#0A0A0A] px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-emerald-500 focus:outline-none"
              id="quiz-interest-select"
            >
              <option value="LLMs & GenAI">Generative AI & LLM Systems</option>
              <option value="Deep Learning">Computer Vision & PyTorch Models</option>
              <option value="DevOps & K8s">Cloud, CI/CD & GPU Clusters</option>
              <option value="Autonomous Agents">Multi-Agent Swarms & Automation</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleRunRecommender}
            disabled={isLoadingRec}
            id="run-track-recommender-btn"
            className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 transition-all disabled:opacity-40"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isLoadingRec ? "Consulting Agent..." : "Recommend Best Track"}</span>
          </button>
        </div>

        {aiRecommendation && (
          <div className="mt-3.5 rounded-xl bg-emerald-950/20 p-4 border border-emerald-900/30 text-xs text-emerald-200/80 leading-relaxed">
            <p className="font-serif italic text-emerald-300 flex items-center gap-1.5 mb-1 text-sm">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Agent Recommendation:
            </p>
            <p className="text-white/80">{aiRecommendation}</p>
          </div>
        )}
      </div>

      {/* Track Selection Cards Grid */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-white/50 mb-3">
          Select an Incubation Track to Inspect Syllabus:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {tracks.map((track) => {
            const isTabActive = track.id === activeTabTrackId;
            const isChosen = track.id === selectedTrackId;
            return (
              <div
                key={track.id}
                onClick={() => setActiveTabTrackId(track.id)}
                id={`track-card-${track.id}`}
                className={`cursor-pointer rounded-2xl p-5 transition-all border ${
                  isTabActive
                    ? "border-emerald-500/80 bg-[#0A0A0A] shadow-2xl ring-1 ring-emerald-500/40"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/5 p-2.5 border border-white/10">
                      {getIcon(track.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-serif italic text-white leading-snug">
                        {track.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
                        <span>{track.durationWeeks} Weeks</span>
                        <span>•</span>
                        <span className="text-emerald-400">{track.level}</span>
                      </div>
                    </div>
                  </div>

                  {isChosen && (
                    <span className="rounded-full bg-emerald-500/20 p-1.5 text-emerald-400 border border-emerald-500/40">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-white/60 mt-3 line-clamp-2 leading-relaxed font-normal">
                  {track.summary}
                </p>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {track.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-white/5 px-2 py-0.5 text-[9px] text-white/70 font-mono border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {track.technologies.length > 3 && (
                    <span className="text-[10px] text-white/30 self-center">
                      +{track.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Track Detailed Syllabus & Confirmation */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-emerald-500">
              Curriculum Syllabus Breakdown
            </span>
            <h3 className="text-lg font-serif italic text-white mt-1">
              {activeTrack.title}
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Target Roles: {activeTrack.careerRoles.join(", ")}
            </p>
          </div>

          <button
            onClick={() => onSelectTrack(activeTrack.id)}
            id="choose-track-confirm-btn"
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold transition-all ${
              selectedTrackId === activeTrack.id
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                : "bg-white text-black hover:bg-emerald-400 shadow-md"
            }`}
          >
            {selectedTrackId === activeTrack.id ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Primary Track Enrolled</span>
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4" />
                <span>Choose {activeTrack.title.split(" ")[0]} Track</span>
              </>
            )}
          </button>
        </div>

        {/* Milestone Accordion / Grid */}
        <div className="mt-5 space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40">
            Key Milestone Deliverables
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeTrack.syllabus.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/[0.02] p-3.5 border border-white/10"
              >
                <span className="rounded bg-white/5 px-2 py-0.5 text-[9px] font-mono text-emerald-400 border border-white/5">
                  {item.week}
                </span>
                <h5 className="text-xs font-serif italic text-white mt-2">
                  {item.topic}
                </h5>
                <p className="text-[11px] text-white/50 mt-1 flex items-center gap-1.5">
                  <span className="text-emerald-400 font-medium">Deliverable:</span>
                  <span className="text-white/80">{item.deliverable}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Walkthrough Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onNextWalkthrough}
            id="next-walkthrough-step-btn"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Proceed to Step 02: Cloud GPU Workspaces</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
