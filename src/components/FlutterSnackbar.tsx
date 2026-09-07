import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface FlutterSnackbarProps {
  message: string | null;
  onDismiss: () => void;
}

export const FlutterSnackbar: React.FC<FlutterSnackbarProps> = ({
  message,
  onDismiss,
}) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-short">
      <div className="flex items-center gap-2.5 rounded-full bg-[#181818] border border-emerald-500/40 px-4 py-2 text-white shadow-2xl text-xs backdrop-blur-xl">
        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
        <span className="font-medium text-white/90">{message}</span>
        <button
          onClick={onDismiss}
          className="ml-1 rounded-full p-0.5 text-white/40 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
