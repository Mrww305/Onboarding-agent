import React, { useEffect, useState } from "react";
import {
  X,
  Award,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { UserOnboardingProgress, IncubationTrack, OrgRole } from "../types";

interface CompletionCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserOnboardingProgress;
  tracks: IncubationTrack[];
  onRestartOnboarding: () => void;
  onChangeScholarName: (name: string) => void;
  activeRole?: OrgRole;
}

export const CompletionCertificateModal: React.FC<CompletionCertificateModalProps> = ({
  isOpen,
  onClose,
  progress,
  tracks,
  onRestartOnboarding,
  onChangeScholarName,
  activeRole,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#06b6d4", "#3b82f6", "#10b981", "#f59e0b"],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedTrack = tracks.find((t) => t.id === progress.selectedTrackId) || tracks[0];
  const certId = `MEG-2026-${Math.abs(
    (progress.scholarName || "scholar").split("").reduce((acc, c) => acc + c.charCodeAt(0), 1042)
  )}`;

  const handleCopyPass = () => {
    navigator.clipboard.writeText(
      `MegniToo Incubator Verified Scholar Pass\nScholar: ${progress.scholarName}\nTrack: ${selectedTrack.title}\nPass ID: ${certId}\nVerify: https://megnitoo.com/verify/${certId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
      id="certificate-modal-overlay"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl ring-1 ring-white/5">
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-cert-modal-btn"
          className="absolute top-4 right-4 rounded-xl p-2 text-white/40 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Card Pass */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#0D0D0D] via-[#050505] to-[#0A0A0A] p-6 sm:p-7 shadow-2xl">
          {/* Subtle watermark grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* Top Header of Pass */}
          <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-md">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-serif italic text-white tracking-wide">
                  Megnitoo Incubator
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  megnitoo.com • Official Scholar Pass
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-mono font-bold text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                VERIFIED
              </span>
              <div className="text-[10px] text-white/40 font-mono mt-1">{certId}</div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="relative my-6 space-y-4 text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
              This certifies successful completion of onboarding for
            </span>

            {/* Editable Scholar Name */}
            <div>
              {isEditingName ? (
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    value={progress.scholarName}
                    onChange={(e) => onChangeScholarName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="rounded-xl bg-black px-3.5 py-1.5 text-center text-xl font-serif italic text-white border border-emerald-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="rounded-xl bg-white text-black px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <h2
                  onClick={() => setIsEditingName(true)}
                  className="cursor-pointer text-3xl font-serif italic text-white hover:text-emerald-400 transition-colors"
                  title="Click to change your name"
                >
                  {progress.scholarName || "Future AI Scholar"} <span className="text-xs text-white/40 font-sans">✎</span>
                </h2>
              )}
            </div>

            <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
              Has verified all key incubation features: curriculum selection, cloud GPU allocation, container deployments, and senior engineering mentorship.
            </p>

            {/* Pass Metadata Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-left">
              <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5">
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Org Role:</span>
                <span className="text-xs font-serif italic text-emerald-400 truncate block mt-0.5">
                  {activeRole?.shortTitle || "Developer"}
                </span>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5">
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Specialization:</span>
                <span className="text-xs font-serif italic text-white truncate block mt-0.5">
                  {selectedTrack.title}
                </span>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5">
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Allocated Compute:</span>
                <span className="text-xs font-mono text-emerald-400 block mt-0.5">
                  NVIDIA L4 24GB
                </span>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-3 border border-white/5 col-span-2 sm:col-span-1">
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Incubator Status:</span>
                <span className="text-xs font-medium text-white flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  Ready to Build
                </span>
              </div>
            </div>
          </div>

          {/* Pass Footer */}
          <div className="relative border-t border-white/5 pt-3.5 flex items-center justify-between text-[10px] text-white/40 font-mono">
            <span>Issue Date: September 2026</span>
            <span className="text-emerald-400">Democratizing AI in Pakistan & Beyond</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onRestartOnboarding}
            id="restart-walkthrough-btn"
            className="flex items-center gap-1.5 rounded-xl bg-white/5 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] font-medium text-white/60 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restart Walkthrough</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPass}
              id="copy-pass-link-btn"
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold text-white border border-white/10 hover:bg-white/20 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Verification"}</span>
            </button>

            <a
              href="https://megnitoo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-white text-black px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-emerald-400 shadow-xl transition-all"
            >
              <span>Visit megnitoo.com</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
