import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "./components/Header";
import StreamStatus from "./components/StreamStatus";
import FraudAlerts from "./components/FraudAlerts";
import TransactionForm from "./components/TransactionForm";
import SimulationInfo from "./components/SimulationInfo";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <StreamStatus />
            <TransactionForm />

            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-2 shadow-sm space-y-6">
              <details className="p-4">
                <summary className="cursor-pointer font-semibold text-gray-700">
                  📘 SIMULATION USER MANUAL
                </summary>
                <div className="mt-4">
                  <SimulationInfo />
                </div>
              </details>
            </div>
          </div>
          <FraudAlerts />
        </div>
      </div>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
