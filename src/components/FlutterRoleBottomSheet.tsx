import React from "react";
import { X, Check, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { OrgRole, OrgRoleId } from "../types";

interface FlutterRoleBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  roles: OrgRole[];
  selectedRoleId: OrgRoleId | string | null;
  onSelectRole: (roleId: OrgRoleId) => void;
  onConfirmRole?: (roleId: OrgRoleId) => void;
}

export const FlutterRoleBottomSheet: React.FC<FlutterRoleBottomSheetProps> = ({
  isOpen,
  onClose,
  roles,
  selectedRoleId,
  onSelectRole,
  onConfirmRole,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-t sm:border border-white/10 bg-[#0E0E0E] p-5 text-white shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="flutter-role-bottom-sheet"
      >
        {/* Flutter Drag Handle */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div>
            <h3 className="text-base font-serif italic text-white">
              Select Your Role
            </h3>
            <p className="text-xs text-white/50">
              Adapts video guide, tasks, and walkthrough priority
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Role Cards List */}
        <div className="overflow-y-auto py-3 space-y-2 flex-1 pr-1">
          {roles.map((role) => {
            const isSelected = role.id === selectedRoleId;

            return (
              <button
                key={role.id}
                onClick={() => {
                  onSelectRole(role.id);
                  if (onConfirmRole) {
                    onConfirmRole(role.id);
                  }
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-emerald-950/30 text-white border-emerald-500/50 shadow-md ring-1 ring-emerald-500/40"
                    : "bg-white/[0.02] text-white/70 border-white/5 hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-base shrink-0 border ${
                      isSelected
                        ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                        : "bg-white/5 border-white/10 text-white/60"
                    }`}
                  >
                    {role.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-serif italic">
                        {role.title}
                      </span>
                      <span className="rounded bg-white/10 px-1.5 py-0.2 text-[8px] font-mono text-white/60 uppercase">
                        {role.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 mt-0.5 line-clamp-1">
                      {role.tagline}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  {isSelected ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-black">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full border border-white/20" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40 shrink-0">
          <span className="font-mono text-[10px]">Instant Priority Recalibration</span>
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-1.5 bg-white/10 text-white hover:bg-white/15 transition-all text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
