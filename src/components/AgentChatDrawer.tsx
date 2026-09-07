import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  RefreshCw,
} from "lucide-react";
import { AvatarGuide, ChatMessage, WalkthroughStep, OrgRole } from "../types";
import { speakText, stopSpeech } from "../utils/speech";

interface AgentChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeGuide: AvatarGuide;
  currentStep: WalkthroughStep;
  frequentQuestions: string[];
  activeRole?: OrgRole;
}

export const AgentChatDrawer: React.FC<AgentChatDrawerProps> = ({
  isOpen,
  onClose,
  activeGuide,
  currentStep,
  frequentQuestions,
  activeRole,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      sender: "agent",
      text: `Hello! I'm ${activeGuide.name}, your MegniToo Onboarding Guide. Ask me anything about our incubator tracks, GPU sandboxes, mentor reviews, or scholarships!`,
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          currentWalkthroughStep: `${currentStep.id}: ${currentStep.title}`,
          context: {
            guideName: activeGuide.name,
            guideRole: activeGuide.role,
            userRole: activeRole?.title || "Developer",
            userRoleFocus: activeRole?.badge || "Full-Stack AI",
          },
        }),
      });

      const data = await res.json();
      const agentReply: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        text: data.reply || "I'm here to help with your MegniToo onboarding. Let me know if you have more questions!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentReply]);
    } catch (err) {
      console.error("Agent chat error:", err);
      const fallbackReply: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        text: "MegniToo provides subsidized AI incubation, browser-based cloud GPU compute, and weekly 1-on-1 mentorship with industry engineers. Feel free to explore the walkthrough tabs to test our features directly!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakReply = (text: string) => {
    stopSpeech();
    speakText(text, {
      pitch: activeGuide.voicePitch,
      rate: activeGuide.voiceRate,
      voiceName: activeGuide.preferredVoiceName,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-[#0A0A0A] shadow-2xl backdrop-blur-2xl"
      id="agent-chat-drawer-container"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={activeGuide.avatarUrl}
              alt={activeGuide.name}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-emerald-500/40"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0A0A0A]" />
          </div>
          <div>
            <h3 className="text-sm font-serif italic text-white flex items-center gap-2">
              <span>{activeGuide.name}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-emerald-400 font-sans font-medium border border-emerald-500/30">
                AI Guide
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Megnitoo Advisor</p>
              {activeRole && (
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded px-1.5 py-0.2">
                  {activeRole.shortTitle}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          id="close-agent-chat-btn"
          className="rounded-xl p-2 text-white/40 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Suggested Quick Questions Chips */}
      <div className="border-b border-white/5 bg-white/[0.02] p-3.5">
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-medium text-white/40 mb-2">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>Quick Inquiries:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {frequentQuestions.slice(0, 3).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="rounded-xl bg-black px-3 py-1.5 text-xs text-white/70 border border-white/10 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isAgent = msg.sender === "agent";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isAgent ? "items-start" : "items-start flex-row-reverse"}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  isAgent
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                    : "bg-white text-black"
                }`}
              >
                {isAgent ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  isAgent
                    ? "bg-white/[0.03] text-white/80 border border-white/10 rounded-tl-xs shadow-md"
                    : "bg-white text-black rounded-tr-xs shadow-md font-medium"
                }`}
              >
                <p>{msg.text}</p>
                <div className={`mt-2 flex items-center justify-between gap-2 text-[10px] ${isAgent ? "text-white/40" : "text-black/50 font-mono"}`}>
                  <span>{msg.timestamp}</span>
                  {isAgent && (
                    <button
                      onClick={() => handleSpeakReply(msg.text)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 text-[9px] uppercase tracking-wider font-mono"
                      title="Listen to answer"
                    >
                      <Volume2 className="h-3 w-3" />
                      <span>Audio</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-white/40 italic">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
            <span>{activeGuide.name} is reasoning...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t border-white/10 p-3.5 bg-black/60 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask ${activeGuide.name} about Megnitoo...`}
            className="flex-1 rounded-xl bg-black px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-emerald-500 focus:outline-none transition-colors placeholder:text-white/30"
            id="agent-chat-input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            id="agent-chat-send-btn"
            className="rounded-xl bg-white text-black p-2.5 hover:bg-emerald-400 transition-all disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
