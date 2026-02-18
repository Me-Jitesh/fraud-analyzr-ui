import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";
import { SignalIcon } from "@heroicons/react/24/outline";

export default function StreamStatus({ onStatusChange }) {
  const [status, setStatus] = useState("UNKNOWN");
  const [events, setEvents] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    const fetchStatus = () => {
      api
        .get("/api/v1/stream/status")
        .then((res) => {
          const newStatus = res.data.status || "RUNNING";

          setStatus(newStatus);
          setEvents(res.data.processedEvents || 0);

          setUpdatedAt(
            res.data.lastUpdated
              ? new Date(res.data.lastUpdated).toLocaleString()
              : new Date().toLocaleString(),
          );

          if (onStatusChange) {
            onStatusChange(newStatus === "RUNNING" ? "UP" : "DOWN");
          }
        })
        .catch(() => {
          setStatus("DOWN");
          if (onStatusChange) onStatusChange("DOWN");
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);

    return () => clearInterval(interval);
  }, [onStatusChange]);

  return (
    <Card
      title={
        <div className="flex items-center gap-2 uppercase">
          <SignalIcon className="w-5 h-5 text-gray-600" />
          <span>Stream Status</span>
        </div>
      }
    >
      <div className="space-y-2">
        <p className="text-sm">
          Status: <span className="font-medium text-green-600">{status}</span>
        </p>

        <p className="text-sm text-gray-500">
          Events: <span className="font-semibold">{events}</span>
        </p>

        <p className="text-xs text-gray-400">Updated: {updatedAt}</p>
      </div>
    </Card>
  );
}
