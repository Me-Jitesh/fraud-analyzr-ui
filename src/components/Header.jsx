export default function Header() {
  return (
    <div className="space-y-3">
      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
        💶 FRAUD DETECTION

        {/* STATUS CHIP */}
        <span className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full
          bg-green-100 text-green-700 border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          LIVE
        </span>
      </h1>

      {/* Subtitle Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Glassmorphism Subtitle */}
        <p className="backdrop-blur-md bg-white/60 border border-white/40
          text-gray-700 px-4 py-1.5 rounded-lg text-sm shadow-sm">
          Real-time transaction fraud detection powered by Kafka Streams
        </p>

        {/* Gradient Badge */}
        <span className="text-xs font-semibold px-3 py-1 rounded-full
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          text-white shadow-md">
          Kafka • Spring Boot • React
        </span>
      </div>
    </div>
  );
}
