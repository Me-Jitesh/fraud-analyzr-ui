import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/api/v1/fraud/alerts")
      .then(res => setAlerts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="md:col-span-2">
      <Card title="Fraud Alerts">
        <div className="divide-y">
          {alerts.map((a, i) => (
            <div
              key={i}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{a.accountId}</p>
                <p className="text-sm text-gray-400">
                  {a.reason}
                </p>
              </div>
              <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full">
                Fraud
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
