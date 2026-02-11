import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

export default function Header({ pulse }) {
  return (
    <div
      className={`
        space-y-3 p-4 rounded-xl transition
        ${pulse ? "animate-header-glow" : ""}
      `}
    >
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">

        <ShieldExclamationIcon
          className={`w-8 h-8 ${pulse ? "text-sky-600" : "text-slate-700"
            }`}
        />

        FRAUD DETECTION

        {/* STATUS CHIP */}
        <span className={`
          flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full
          bg-green-100 text-green-700 border border-green-200
          ${pulse ? "scale-105 animate-pulse" : ""}
        `}>
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          LIVE
        </span>
      </h1>

      <div className="flex flex-wrap items-center gap-3">
        <p className="backdrop-blur-md bg-white/60 border border-white/40
          text-gray-700 px-4 py-1.5 rounded-lg text-sm shadow-sm">
          Real-time transaction fraud detection powered by Kafka Streams
        </p>

        <span className="text-xs font-medium px-3 py-1 rounded-full
  bg-gradient-to-r from-gray-700 to-sky-300
  text-white/90 shadow-sm">
          Kafka • Spring Boot • React
        </span>
      </div>
    </div>
  );
}
