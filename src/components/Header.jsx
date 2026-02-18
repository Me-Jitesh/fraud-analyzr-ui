import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

export default function Header({ status = "UP" }) {
  const isUp = status === "UP";

  return (
    <div
      className={`
        space-y-3 p-4 rounded-xl transition
        ${isUp ? "animate-header-glow" : ""}
      `}
    >
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
        <ShieldExclamationIcon
          className={`w-8 h-8 ${isUp ? "text-slate-700" : "text-red-600"}`}
        />
        FRAUD DETECTION
        <span
          className={`
            flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full
            ${
              isUp
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }
            ${isUp ? "scale-105 animate-pulse" : ""}
          `}
        >
          <span
            className={`w-2 h-2 ${
              isUp ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          />
          {isUp ? "LIVE" : "DOWN"}
        </span>
      </h1>

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
