export default function StreamingWave({ active }) {
  if (!active) return null;

  return (
    <div className="flex items-end gap-1 mt-4 text-sky-400">
      <div className="wave-bar" style={{ animationDelay: "0s" }} />
      <div className="wave-bar" style={{ animationDelay: "0.1s" }} />
      <div className="wave-bar" style={{ animationDelay: "0.2s" }} />
      <div className="wave-bar" style={{ animationDelay: "0.3s" }} />
      <div className="wave-bar" style={{ animationDelay: "0.4s" }} />
      <div className="wave-bar" style={{ animationDelay: "0.5s" }} />
      <div className="wave-bar" style={{ animationDelay: "0.6s" }} />
    </div>
  );
}
