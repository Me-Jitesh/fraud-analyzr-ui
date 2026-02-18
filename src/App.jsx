import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "./components/Header";
import StreamStatus from "./components/StreamStatus";
import FraudAlerts from "./components/FraudAlerts";
import TransactionForm from "./components/TransactionForm";
import SimulationInfo from "./components/SimulationInfo";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-[#fafafa] px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <Header pulse={true} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6">
              <StreamStatus />
              <TransactionForm />
              <SimulationInfo />
            </div>
            <FraudAlerts />
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          },
        }}
      />
    </>
  );
}
