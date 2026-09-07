import React, { useState } from "react";
import {
  ShieldCheck,
  Code2,
  Megaphone,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Sliders,
  Layers,
  ChevronRight,
} from "lucide-react";
import { OrgRole, OrgRoleId } from "../../types";

interface RoleDiscoveryWalkthroughProps {
  roles: OrgRole[];
  selectedRoleId: OrgRoleId | null;
  onSelectRole: (roleId: OrgRoleId) => void;
  onConfirmRole: (roleId: OrgRoleId) => void;
  onNextWalkthrough: () => void;
  activeRoleObj: OrgRole;
}

const ROLE_ICONS: Record<OrgRoleId, React.ReactNode> = {
  administrator: <ShieldCheck className="h-5 w-5" />,
  developer: <Code2 className="h-5 w-5" />,
  marketing: <Megaphone className="h-5 w-5" />,
  sales: <Target className="h-5 w-5" />,
  executive: <BarChart3 className="h-5 w-5" />,
};

export const RoleDiscoveryWalkthrough: React.FC<RoleDiscoveryWalkthroughProps> = ({
  roles,
  selectedRoleId,
  onSelectRole,
  onConfirmRole,
  onNextWalkthrough,
  activeRoleObj,
}) => {
  const [hoveredRoleId, setHoveredRoleId] = useState<OrgRoleId | null>(null);

  const handleChooseRole = (roleId: OrgRoleId) => {
    onSelectRole(roleId);
    onConfirmRole(roleId);
  };

  const handleProceed = () => {
    if (selectedRoleId) {
      onConfirmRole(selectedRoleId);
    }
    onNextWalkthrough();
  };

  return (
    <div className="space-y-6" id="role-discovery-container">
      {/* Header card with Sophisticated Dark styling */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-medium text-emerald-400 border border-emerald-500/30">
              <Sliders className="h-3 w-3" />
              Onboarding Calibration Step
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
              Role-Adaptive Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif italic text-white tracking-tight">
            What is your role within your organization?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
            Select your primary organizational role. The video agent will adapt its narration, and our walkthrough engine will dynamically prioritize the tools, telemetry, and capabilities most impactful to your daily workflow.
          </p>
        </div>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const isSelected = selectedRoleId === role.id;
          const isHovered = hoveredRoleId === role.id;

          return (
            <div
              key={role.id}
              onClick={() => handleChooseRole(role.id)}
              onMouseEnter={() => setHoveredRoleId(role.id)}
              onMouseLeave={() => setHoveredRoleId(null)}
              id={`role-card-${role.id}`}
              className={`group relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 backdrop-blur-xl ${
                isSelected
                  ? "border-emerald-500/80 bg-gradient-to-br from-emerald-950/20 via-[#0C0C0C] to-[#0A0A0A] shadow-[0_0_25px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                  : "border-white/10 bg-[#0A0A0A] hover:border-white/20 hover:bg-white/[0.02]"
              }`}
            >
              {/* Header row of card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                      isSelected
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                        : "bg-white/5 text-white/80 border border-white/10 group-hover:text-white group-hover:border-white/20"
                    }`}
                  >
                    {ROLE_ICONS[role.id]}
                  </div>
                  <div>
                    <h3 className="text-base font-serif italic text-white flex items-center gap-2">
                      <span>{role.shortTitle}</span>
                      {isSelected && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-sans not-italic font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      )}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-mono mt-0.5">
                      {role.badge}
                    </p>
                  </div>
                </div>

                {/* Radio selection circle */}
                <div
                  className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-500 text-black shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                      : "border-white/20 bg-black/40 group-hover:border-white/40"
                  }`}
                >
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="mt-3.5 text-xs text-white/70 leading-relaxed">
                {role.tagline}
              </p>

              {/* Primary Tools Chips */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-medium block mb-2">
                  Key Prioritized Tools:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {role.primaryTools.slice(0, 3).map((tool, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-white/[0.04] border border-white/5 px-2 py-1 text-[10px] text-white/70 font-mono truncate"
                    >
                      {tool}
                    </span>
                  ))}
                  {role.primaryTools.length > 3 && (
                    <span className="rounded-lg bg-white/[0.02] border border-white/5 px-2 py-1 text-[10px] text-white/40 font-mono">
                      +{role.primaryTools.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action trigger button inside card */}
              <div className="mt-4 flex items-center justify-between pt-2">
                <span className="text-[10px] font-mono text-emerald-400/80 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>{isSelected ? "Role Selected & Active" : "Click to calibrate for this role"}</span>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Prioritization Preview Panel based on active role */}
      <div className="rounded-2xl border border-emerald-500/30 bg-[#0D0D0D] p-5 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-8 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold font-mono">
                Dynamic Walkthrough Roadmap Calibrated
              </span>
            </div>
            <h3 className="text-lg font-serif italic text-white">
              Tailored for <span className="text-emerald-400">{activeRoleObj.title}</span>
            </h3>
            <p className="text-xs text-white/60 max-w-xl leading-relaxed">
              Subsequent chapters have been prioritized for your responsibilities. Video agent scripts, teleprompter text, and suggested tasks will adapt directly to your role.
            </p>

            {/* Step Priorities Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeRoleObj.priorityOrder.slice(0, 4).map((stepId, idx) => {
                const reason = activeRoleObj.priorityReasons[stepId] || "Core platform capability";
                return (
                  <div
                    key={stepId}
                    className="flex items-start gap-2 rounded-xl bg-white/[0.02] border border-white/5 p-2.5 text-xs text-white/80"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/20">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] text-white/70 leading-snug line-clamp-2">
                      {reason}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action button to proceed */}
          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={handleProceed}
              id="confirm-role-proceed-btn"
              className="flex items-center gap-2 rounded-xl bg-white text-black px-6 py-3.5 text-xs uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 shadow-xl transition-all active:scale-95 border border-white"
            >
              <span>Explore Prioritized Tools</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-mono text-white/40">
              You can switch roles anytime from the top bar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
