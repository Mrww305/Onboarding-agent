import React, { useState } from "react";
import {
  Users2,
  Trophy,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
} from "lucide-react";
import { StudySquad, OrgRole } from "../../types";

interface CommunityWalkthroughProps {
  squads: StudySquad[];
  onJoinSquad: (squadId: string) => void;
  joinedSquadId: string | null;
  onOpenCertificateModal: () => void;
  allStepsCompleted: boolean;
  activeRole?: OrgRole;
}

export const CommunityWalkthrough: React.FC<CommunityWalkthroughProps> = ({
  squads,
  onJoinSquad,
  joinedSquadId,
  onOpenCertificateModal,
  allStepsCompleted,
  activeRole,
}) => {
  const [activeJoined, setActiveJoined] = useState<string | null>(joinedSquadId);

  const handleJoin = (id: string) => {
    setActiveJoined(id);
    onJoinSquad(id);
  };

  return (
    <div className="space-y-6" id="walkthrough-community-container">
      {/* Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500">
                Interactive Walkthrough 06 of 06
              </span>
              {activeRole && (
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-emerald-400 border border-emerald-500/20">
                  {activeRole.shortTitle} Community
                </span>
              )}
            </div>
            <h2 className="text-xl font-serif italic text-white mt-0.5">
              Scholar Study Squads, Hackathons & Placement Hub
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
              {activeRole
                ? activeRole.roleSpecificFocus.community
                : "Build alongside motivated peers, compete in bi-weekly hackathons with compute prizes, and connect directly with high-growth technology hiring partners."}
            </p>
          </div>

          {activeJoined && (
            <span className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Squad Joined
            </span>
          )}
        </div>
      </div>

      {/* Study Squads Selector Grid */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl">
        <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-white/50 mb-3 flex items-center gap-2">
          <Users2 className="h-4 w-4 text-emerald-400" />
          Choose a Regional or Remote Peer Squad:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {squads.map((squad) => {
            const isJoined = activeJoined === squad.id;
            return (
              <div
                key={squad.id}
                id={`squad-card-${squad.id}`}
                className={`rounded-2xl p-5 transition-all border ${
                  isJoined
                    ? "border-emerald-500/80 bg-white/[0.05] ring-1 ring-emerald-500/40 shadow-xl"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-serif italic text-white">{squad.name}</h4>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-400 font-medium block mt-1">
                      {squad.city}
                    </span>
                  </div>

                  <span className="rounded-lg bg-white/5 border border-white/10 px-2 py-1 text-[9px] font-mono text-white/60">
                    {squad.membersCount}/{squad.maxMembers} Scholars
                  </span>
                </div>

                <div className="text-xs text-white/50 mt-2.5">
                  Track: <span className="text-white/80">{squad.track}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-white/40 mt-1 font-mono">
                  <Clock className="h-3 w-3 text-emerald-400" />
                  <span>{squad.meetingSchedule}</span>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    Active Cohort
                  </span>

                  <button
                    onClick={() => handleJoin(squad.id)}
                    id={`join-squad-btn-${squad.id}`}
                    className={`rounded-xl px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold transition-all ${
                      isJoined
                        ? "bg-emerald-500 text-black shadow-sm"
                        : "bg-white text-black hover:bg-emerald-400 shadow-md"
                    }`}
                  >
                    {isJoined ? "Joined Squad" : "Join This Squad"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bi-weekly Hackathons & Placement Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hackathon Spotlight */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-emerald-400" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40">
              Upcoming Megnitoo Hackathon
            </h3>
          </div>
          <h4 className="text-sm font-serif italic text-white">
            Sprint #08: Autonomous Agents & RAG Showdown
          </h4>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
            48-hour build sprint. Compete with fellow scholars for $1,500 in cloud GPU grants and direct interview fast-tracks.
          </p>
          <div className="mt-3.5 flex items-center gap-3 text-[11px] text-emerald-400 font-mono">
            <span>Starts in 4 Days</span>
            <span>•</span>
            <span>Submissions via GitHub + Cloud Run</span>
          </div>
        </div>

        {/* Career Placement Partners */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-4 w-4 text-emerald-400" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/40">
              Tech Placement Network
            </h3>
          </div>
          <h4 className="text-sm font-serif italic text-white">
            Direct Hiring Partner Referrals
          </h4>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
            Top tech organizations actively recruit certified Megnitoo scholars who have shipped live production portfolios.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {["SiliconValley AI Labs", "CloudOps Global", "ScaleSync", "FinTech Automations"].map((partner) => (
              <span
                key={partner}
                className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] text-white/70 font-mono"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Completion Trigger */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="relative">
          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Full Onboarding Sequence Complete
          </span>
          <h3 className="text-xl font-serif italic text-white mt-1">
            Claim Your Official Megnitoo Scholar Pass
          </h3>
          <p className="text-xs text-white/60 mt-1 leading-relaxed max-w-xl">
            Congratulations on exploring all key incubator features. Unlock and customize your personalized cryptographic verification credential.
          </p>
        </div>

        <button
          onClick={onOpenCertificateModal}
          id="claim-scholar-pass-btn"
          className="relative flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 shadow-2xl transition-all shrink-0"
        >
          <Award className="h-4 w-4" />
          <span>View Verified Scholar Pass</span>
        </button>
      </div>
    </div>
  );
};
