import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);
  const prevCountRef = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/api/v1/fraud/alerts");
        const data = Array.isArray(res.data) ? res.data : [];

        prevCountRef.current = alerts.length;
        setAlerts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlerts();
    const id = setInterval(fetchAlerts, 4000);
    return () => clearInterval(id);
  }, [alerts.length]);

  // 🔽 Auto-scroll to latest
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [alerts.length]);

  return (
    <div className="md:col-span-2">
      <Card title="⚠️ Fraud Alerts">
        <div ref={containerRef} className="max-h-[420px] overflow-y-auto">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 text-xs text-gray-400 border-b pb-2 sticky top-0 bg-white z-10">
            <div>Account</div>
            <div>Transaction</div>
            <div>Reason</div>
            <div>Time</div>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {alerts.map((a, i) => {
              const isNew = i >= prevCountRef.current;

              return (
                <div
                  key={`${a.transactionId}-${i}`}
                  className={`
                    grid grid-cols-4 gap-4 py-3 text-sm items-center
                    hover:bg-gray-100 transition
                    ${getSeverityClass(a.reason)}
                    ${isNew ? "animate-slide-in" : ""}
                  `}
                >
                  <div className="font-medium">{a.accountId}</div>
                  <div className="text-gray-600">{a.transactionId || "—"}</div>
                  <div>
                    <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                      {a.reason}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {new Date(a.detectedAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

const getSeverityClass = (reason = "") => {
  if (reason.includes("HIGH")) return "bg-red-50";
  if (reason.includes("MEDIUM")) return "bg-yellow-50";
  return "bg-gray-50";
};
