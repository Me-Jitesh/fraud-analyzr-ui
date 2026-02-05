import FraudAlerts from "./components/FraudAlerts";
import StreamStatus from "./components/StreamStatus";

export default function App() {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StreamStatus />
          <FraudAlerts />
        </div>
      </div>
    </div>
  );
}

const Header = () => (
  <div className="space-y-2">
    <h1 className="text-3xl font-semibold tracking-tight">
      Fraud Detection
    </h1>
    <p className="text-gray-500">
      Real-time transaction monitoring powered by Kafka Streams
    </p>
  </div>
);
