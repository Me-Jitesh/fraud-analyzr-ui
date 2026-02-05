import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function StreamStatus() {
  const [status, setStatus] = useState("UNKNOWN");
  const [events, setEvents] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    const fetchStatus = () => {
      api.get("/api/v1/stream/status")
        .then(res => {
          setStatus(res.data.status || "RUNNING");
          setEvents(res.data.processedTransactions || 0);
          setUpdatedAt(res.data.updatedAt || new Date().toISOString());
        })
        .catch(console.error);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // polling

    return () => clearInterval(interval);
  }, []);

  return (
    <Card title="📡 Stream Status">
      <div className="space-y-2">
        <p className="text-sm">
          Status:{" "}
          <span className="font-medium text-green-600">
            {status}
          </span>
        </p>

        <p className="text-sm text-gray-500">
          Events: <span className="font-semibold">{events}</span>
        </p>

        <p className="text-xs text-gray-400">
          Updated: {updatedAt}
        </p>
      </div>
    </Card>
  );
}
