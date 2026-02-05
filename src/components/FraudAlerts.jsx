import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = () => {
      api.get("/api/v1/fraud/alerts")
        .then(res => {
          const data = res.data;
          setAlerts(Array.isArray(data) ? data : []);
        })
        .catch(console.error);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:col-span-2">
      <Card title="⚠️ Fraud Alerts">
        {alerts.length === 0 ? (
          <p className="text-sm text-gray-400">
            No suspicious activity detected
          </p>
        ) : (
          // 👇 Scrollable container
          <div className="max-h-[420px] overflow-y-auto pr-2">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3 font-medium">Account</th>
                  <th className="pb-3 font-medium">Transaction</th>
                  <th className="pb-3 font-medium">Reason</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {alerts.map((a, i) => (
                  <tr
                    key={i}
                    className="
                      transition
                      hover:bg-gray-50
                      hover:shadow-sm
                    "
                  >
                    <td className="py-3 font-medium">
                      {a.accountId || "-"}
                    </td>

                    <td className="py-3 text-gray-600">
                      {a.transactionId || "—"}
                    </td>

                    <td className="py-3">
                      <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full">
                        {a.reason || "HIGH_AMOUNT"}
                      </span>
                    </td>

                    <td className="py-3 text-gray-500">
                      {a.detectedAt
                        ? new Date(a.detectedAt).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
