import React from "react";
import { Smartphone, Tablet, Laptop, RefreshCw } from "lucide-react";

export type DeviceMode = "auto" | "mobile" | "tablet" | "laptop";

interface FlutterDeviceSelectorProps {
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
}

export const FlutterDeviceSelector: React.FC<FlutterDeviceSelectorProps> = ({
  deviceMode,
  onChangeDeviceMode,
}) => {
  return (
    <div
      className="inline-flex items-center rounded-xl bg-white/[0.04] p-1 border border-white/10"
      id="flutter-device-selector"
      title="Flutter Adaptive Device Ergonomics Switcher"
    >
      <button
        onClick={() => onChangeDeviceMode("auto")}
        className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-mono transition-all ${
          deviceMode === "auto"
            ? "bg-white text-black font-bold shadow-sm"
            : "text-white/40 hover:text-white"
        }`}
        title="Auto Responsive (Adapts to window size)"
      >
        <RefreshCw className="h-3 w-3" />
        <span className="hidden sm:inline">Auto</span>
      </button>

      <button
        onClick={() => onChangeDeviceMode("mobile")}
        className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-mono transition-all ${
          deviceMode === "mobile"
            ? "bg-emerald-400 text-black font-bold shadow-sm"
            : "text-white/40 hover:text-white"
        }`}
        title="Flutter Mobile Phone Mode (Bottom Navigation Bar)"
      >
        <Smartphone className="h-3 w-3" />
        <span>Mobile</span>
      </button>

      <button
        onClick={() => onChangeDeviceMode("tablet")}
        className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-mono transition-all ${
          deviceMode === "tablet"
            ? "bg-emerald-400 text-black font-bold shadow-sm"
            : "text-white/40 hover:text-white"
        }`}
        title="Flutter Tablet Mode (Navigation Rail)"
      >
        <Tablet className="h-3 w-3" />
        <span>Tablet</span>
      </button>

      <button
        onClick={() => onChangeDeviceMode("laptop")}
        className={`flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-mono transition-all ${
          deviceMode === "laptop"
            ? "bg-emerald-400 text-black font-bold shadow-sm"
            : "text-white/40 hover:text-white"
        }`}
        title="Flutter Laptop & Desktop Web Mode"
      >
        <Laptop className="h-3 w-3" />
        <span className="hidden sm:inline">Laptop</span>
      </button>
    </div>
  );
};
