import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(0);
  const listRef = useRef(null);
  const lastCountRef = useRef(0);

  useEffect(() => {
    const fetchAlerts = () => {
      api.get("/api/v1/fraud/alerts")
        .then(res => {
          const data = Array.isArray(res.data) ? res.data : [];
          lastCountRef.current = alerts.length;
          setAlerts(data);
        })
        .catch(console.error);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 4000);
    return () => clearInterval(interval);
  }, [alerts.length]);

  // 🔽 Auto-scroll to newest alert
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [alerts.length]);

  // ⌨️ Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") {
        setSelected(s => Math.min(s + 1, alerts.length - 1));
      }
      if (e.key === "ArrowUp") {
        setSelected(s => Math.max(s - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [alerts.length]);

  return (
    <div className="md:col-span-2">
      <Card title="⚠️ Fraud Alerts">
        {alerts.length === 0 ? (
          <p className="text-sm text-gray-400">
            No suspicious activity detected
          </p>
        ) : (
          <div
            ref={listRef}
            className="max-h-[420px] overflow-y-auto pr-2"
          >
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-3">Account</th>
                  <th className="pb-3">Transaction</th>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3">Time</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {alerts.map((a, i) => {
                  const isNew = i >= lastCountRef.current;
                  const isSelected = i === selected;

                  return (
                    <tr
                      key={i}
                      className={`
                        transition
                        ${getSeverityClass(a.reason)}
                        ${isNew ? "animate-pulse-soft" : ""}
                        ${isSelected ? "ring-2 ring-black/10" : ""}
                        hover:bg-gray-100
                      `}
                    >
                      <td className="py-3 font-medium">
                        {a.accountId}
                      </td>

                      <td className="py-3 text-gray-600">
                        {a.transactionId || "—"}
                      </td>

                      <td className="py-3">
                        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                          {a.reason}
                        </span>
                      </td>

                      <td className="py-3 text-gray-500">
                        {new Date(a.detectedAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

// 🎨 Severity mapping
const getSeverityClass = (reason) => {
  if (!reason) return "";
  if (reason.includes("HIGH")) return "bg-red-50";
  if (reason.includes("MEDIUM")) return "bg-yellow-50";
  return "bg-gray-50";
};
