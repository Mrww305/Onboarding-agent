import React, { useState } from "react";
import {
  Users,
  CheckCircle2,
  Calendar,
  Star,
  MessageSquare,
  ArrowRight,
  Code2,
  Clock,
  Check,
} from "lucide-react";
import { MentorProfile, OrgRole } from "../../types";

interface MentorshipWalkthroughProps {
  mentors: MentorProfile[];
  onCompleteMentorshipBooking: () => void;
  isMentorshipCompleted: boolean;
  onNextWalkthrough: () => void;
  activeRole?: OrgRole;
}

export const MentorshipWalkthrough: React.FC<MentorshipWalkthroughProps> = ({
  mentors,
  onCompleteMentorshipBooking,
  isMentorshipCompleted,
  onNextWalkthrough,
  activeRole,
}) => {
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile>(mentors[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>(mentors[0].availableSlots[0]);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(isMentorshipCompleted);

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    onCompleteMentorshipBooking();
  };

  return (
    <div className="space-y-6" id="walkthrough-mentorship-container">
      {/* Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-500">
                Interactive Walkthrough 05 of 06
              </span>
              {activeRole && (
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono text-emerald-400 border border-emerald-500/20">
                  {activeRole.shortTitle} Mentorship
                </span>
              )}
            </div>
            <h2 className="text-xl font-serif italic text-white mt-0.5">
              1-on-1 Senior Industry Mentorship & Code Reviews
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl leading-relaxed">
              {activeRole
                ? activeRole.roleSpecificFocus.mentorship
                : "Learn directly from Staff Engineers and AI practitioners. Receive detailed line-by-line pull request audits and architectural coaching every sprint."}
            </p>
          </div>

          {bookingConfirmed && (
            <span className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-emerald-500/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Session Scheduled
            </span>
          )}
        </div>
      </div>

      {/* Simulated Code Review Rubric Preview */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-serif italic text-white">
              Simulated Weekly Code Review PR #142
            </h3>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-500/30">
            Score: 96/100 (Approved)
          </span>
        </div>

        {/* Code Diff Box with Mentor Comment */}
        <div className="rounded-xl bg-black p-4 font-mono text-xs border border-white/10">
          <div className="text-white/40 mb-1">// PR: Vector Search Batch Optimization (PyTorch + Qdrant)</div>
          <div className="text-rose-400/80 bg-rose-950/20 px-2.5 py-1 rounded-lg">
            - results = [qdrant.search(query) for query in incoming_queries]
          </div>
          <div className="text-emerald-400 bg-emerald-950/30 px-2.5 py-1 rounded-lg mt-1">
            + results = await qdrant.search_batch(incoming_queries, limit=5, with_payload=True)
          </div>

          {/* Mentor Inline Review Note */}
          <div className="mt-3 rounded-xl bg-white/[0.02] p-3.5 border-l-2 border-emerald-400">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span className="text-[11px] font-serif italic font-bold text-white">
                Dr. Tariq (Staff AI Mentor):
              </span>
              <span className="text-[10px] text-white/40 font-mono">Yesterday at 6:15 PM</span>
            </div>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              "Excellent architectural improvement here. Batching vector searches cuts your HTTP round-trip latency from 190ms to 32ms under concurrent load. Approved for production deploy!"
            </p>
          </div>
        </div>
      </div>

      {/* Mentor Roster & Scheduler */}
      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 shadow-2xl">
        <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-white/50 mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-400" />
          Select a Senior Mentor to Schedule Your Onboarding 1-on-1:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
          {mentors.map((m) => {
            const isSelected = selectedMentor.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMentor(m);
                  setSelectedSlot(m.availableSlots[0]);
                }}
                id={`mentor-card-${m.id}`}
                className={`cursor-pointer rounded-2xl p-4 transition-all border ${
                  isSelected
                    ? "border-emerald-500/80 bg-white/[0.05] ring-1 ring-emerald-500/40 shadow-xl"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-serif italic text-white">{m.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold font-mono">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{m.rating}</span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-400 mt-1">{m.role}</div>
                <div className="text-[10px] text-white/40">{m.company}</div>

                <div className="mt-3 text-[11px] text-white/60 border-t border-white/5 pt-2">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">Specialty:</span>
                  <span className="font-medium text-white/80">{m.specialty}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slot Selection & Confirmation */}
        <div className="rounded-xl bg-black p-4 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/50 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                Available Slots for {selectedMentor.name}:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedMentor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    id={`mentor-slot-${slot.replace(/\s+/g, "-")}`}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      selectedSlot === slot
                        ? "bg-white text-black font-bold"
                        : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmBooking}
              id="confirm-mentor-session-btn"
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] font-bold transition-all shrink-0 ${
                bookingConfirmed
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white text-black hover:bg-emerald-400 shadow-md"
              }`}
            >
              {bookingConfirmed ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Session Booked with {selectedMentor.name.split(" ")[0]}</span>
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4" />
                  <span>Schedule 1-on-1 Consultation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Next Step Nav */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextWalkthrough}
          id="proceed-to-step-5-btn"
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>Proceed to Step 05: Study Squads & Job Placement Hub</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
