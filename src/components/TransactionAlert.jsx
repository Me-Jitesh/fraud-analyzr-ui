import { useEffect, useState } from "react";
import axios from "axios";

export default function FraudDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState(null);

  const loadData = async () => {
    const [alertsRes, statusRes] = await Promise.all([
      axios.get("http://localhost:8080/api/v1/fraud/alerts"),
      axios.get("http://localhost:8080/api/v1/stream/status")
    ]);
    setAlerts(alertsRes.data);
    setStatus(statusRes.data);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // live refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        🚨 Fraud Monitoring Dashboard
      </h1>

      {/* Stream Status */}
      <div className="bg-slate-800 rounded-xl p-5 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">📡 Stream Status</h2>
        {status && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <span>Status: <b className="text-green-400">{status.status}</b></span>
            <span>Events: <b>{status.processedEvents}</b></span>
            <span>Updated: <b>{status.lastUpdated}</b></span>
          </div>
        )}
      </div>

      {/* Fraud Alerts */}
      <div className="bg-slate-800 rounded-xl p-5 shadow-lg overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">⚠️ Fraud Alerts</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-left">
              <th className="p-2">Account</th>
              <th className="p-2">Transaction</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, i) => (
              <tr key={i} className="border-b border-slate-700 hover:bg-slate-700">
                <td className="p-2">{a.accountId}</td>
                <td className="p-2">{a.transactionId || "-"}</td>
                <td className="p-2 text-red-400 font-semibold">{a.reason}</td>
                <td className="p-2">{a.detectedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {alerts.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No fraud detected 🎉
          </p>
        )}
      </div>
    </div>
  );
}
