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
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Radio,
  Hash,
} from "lucide-react";
import { StudySquad, OrgRole } from "../../types";
import { SQUADS_DISCORD_COMMUNITY_URL } from "../../data/onboardingData";

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
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleJoin = (id: string) => {
    setActiveJoined(id);
    onJoinSquad(id);
  };

  const copyDiscordLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(SQUADS_DISCORD_COMMUNITY_URL);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2200);
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

      {/* Official Discord Community Hub for Squads */}
      <div className="rounded-2xl border border-[#5865F2]/30 bg-gradient-to-br from-[#5865F2]/10 via-[#0A0A0A] to-[#0A0A0A] p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md bg-[#5865F2]/20 border border-[#5865F2]/40 px-2.5 py-0.5 text-[10px] font-mono text-[#8ea1ff] font-semibold">
                <MessageSquare className="h-3 w-3" />
                Discord Community Hub
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                420+ Scholars in Voice Rooms
              </span>
            </div>
            <h3 className="text-base font-serif italic text-white">
              MegniToo Official Squads Discord
            </h3>
            <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
              Every study squad has dedicated voice rooms, daily standups, code review threads, and GPU-sharing channels. Join the official Discord server to sync with your cohort in real time.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px] text-white/50">
              <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Hash className="h-2.5 w-2.5 text-[#5865F2]" /> squad-announcements
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Hash className="h-2.5 w-2.5 text-[#5865F2]" /> gpu-compute-pairing
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Hash className="h-2.5 w-2.5 text-[#5865F2]" /> hackathon-sprints
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Radio className="h-2.5 w-2.5 text-emerald-400" /> 24/7 Study Voice Lounges
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <a
              href={SQUADS_DISCORD_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="join-squads-discord-btn"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-[#5865F2]/25"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Join Squads Discord</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>

            <button
              onClick={copyDiscordLink}
              id="copy-discord-invite-btn"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white px-4 py-2 text-[10px] font-mono transition-all"
              title="Copy Discord Invite Link"
            >
              {copiedDiscord ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Invite Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>discord.gg/tgpSywuXP</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Study Squads Selector Grid */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-white/50 flex items-center gap-2">
            <Users2 className="h-4 w-4 text-emerald-400" />
            Choose a Regional or Remote Peer Squad:
          </h3>
          <a
            href={SQUADS_DISCORD_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#8ea1ff] hover:text-[#b4c0ff] flex items-center gap-1 font-mono transition-colors"
          >
            <MessageSquare className="h-3 w-3" />
            <span>All squads synced on Discord</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-60" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {squads.map((squad) => {
            const isJoined = activeJoined === squad.id;
            const squadDiscordUrl = squad.discordUrl || SQUADS_DISCORD_COMMUNITY_URL;

            return (
              <div
                key={squad.id}
                id={`squad-card-${squad.id}`}
                className={`rounded-2xl p-5 transition-all border flex flex-col justify-between ${
                  isJoined
                    ? "border-emerald-500/80 bg-white/[0.05] ring-1 ring-emerald-500/40 shadow-xl"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div>
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

                  {/* Squad Discord Direct Channel Badge */}
                  <div className="mt-2.5 flex items-center justify-between p-2 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8ea1ff]">
                      <MessageSquare className="h-3 w-3 text-[#5865F2]" />
                      <span>discord.gg/tgpSywuXP</span>
                    </div>
                    <a
                      href={squadDiscordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-mono uppercase font-bold text-white hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      title="Open Squad Discord Channel"
                    >
                      <span>Join Room</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] text-emerald-400 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                    Active Cohort
                  </span>

                  <div className="flex items-center gap-2">
                    {isJoined && (
                      <a
                        href={squadDiscordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl px-2.5 py-1.5 text-[10px] font-mono font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all flex items-center gap-1"
                        title="Open Squad Discord Channel"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span className="hidden xs:inline">Discord</span>
                      </a>
                    )}
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
            48-hour build sprint. Compete with fellow scholars for $1,500 in cloud GPU grants and direct interview fast-tracks. Submissions and team formation coordinated in Discord.
          </p>
          <div className="mt-3.5 flex items-center gap-3 text-[11px] text-emerald-400 font-mono">
            <span>Starts in 4 Days</span>
            <span>•</span>
            <a
              href={SQUADS_DISCORD_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8ea1ff] hover:underline flex items-center gap-1"
            >
              <MessageSquare className="h-3 w-3" />
              <span>Form Team on Discord</span>
            </a>
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

