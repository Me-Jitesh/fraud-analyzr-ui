import {
  ShieldExclamationIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Header({ pulse }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  return (
    <div
      className={`
        space-y-3 p-4 rounded-xl transition
        ${pulse ? "animate-header-glow" : ""}
      `}
    >
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
        <ShieldExclamationIcon
          className={`w-8 h-8 ${pulse ? "text-slate-700" : "text-sky-600"}`}
        />
        FRAUD DETECTION
        <span
          className={`
          flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full
          bg-green-100 text-green-700 border border-green-200
          ${pulse ? "scale-105 animate-pulse" : ""}
        `}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          LIVE
        </span>
      </h1>

      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="flex items-center gap-2 text-xs px-3 py-1 rounded-full
                   border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
      >
        {soundEnabled ? (
          <SpeakerWaveIcon className="w-4 h-4 text-green-600" />
        ) : (
          <SpeakerXMarkIcon className="w-4 h-4 text-gray-400" />
        )}
        {soundEnabled ? "Sound ON" : "Sound OFF"}
      </button>

      <div className="flex flex-wrap items-center gap-3">
        <p
          className="backdrop-blur-md bg-white/60 border border-white/40
          text-gray-700 px-4 py-1.5 rounded-lg text-sm shadow-sm"
        >
          Real-time transaction fraud detection powered by Kafka Streams
        </p>

        <span
          className="text-xs font-medium px-3 py-1 rounded-full
  bg-gradient-to-r from-gray-700 to-sky-300
  text-white/90 shadow-sm"
        >
          Kafka • Java • Spring Boot • React
        </span>
      </div>
    </div>
  );
}
