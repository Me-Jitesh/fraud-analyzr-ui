import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import Modal from "./ui/Modal";
import Card from "./ui/Card";
import FraudSkeleton from "./ui/FraudSkeleton";

const MAX_ALERTS = 400;

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const seenRef = useRef(new Set());
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/api/v1/fraud/alerts");
        const data = Array.isArray(res.data) ? res.data : [];

        const sorted = [...data].sort(
          (a, b) => new Date(b.detectedAt) - new Date(a.detectedAt)
        );

        setAlerts((prev) => {
          const newItems = [];

          for (const a of sorted) {
            const key = `${a.accountId}-${a.transactionId}-${a.detectedAt}`;

            if (!seenRef.current.has(key)) {
              seenRef.current.add(key);
              newItems.push({ ...a, isNew: true });
            } else {
              break; // stop early once we hit known items
            }
          }

          if (newItems.length === 0) return prev;

          // remove old isNew flags
          const cleanedPrev = prev.map((p) => ({
            ...p,
            isNew: false,
          }));

          const updated = [...newItems, ...cleanedPrev];

          return updated.slice(0, MAX_ALERTS);
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const id = setInterval(fetchAlerts, 4000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll to top when new alerts come
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [alerts.length]);

  return (
    <div className="md:col-span-2">
      <Card title="🚨 Suspicious Transaction Monitoring">
        {loading ? (
          <FraudSkeleton />
        ) : alerts.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            No suspicious activity detected
          </p>
        ) : (
          <div
            ref={containerRef}
            className="max-h-[450px] overflow-y-auto"
          >
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 text-xs text-gray-400 border-b pb-2 sticky top-0 bg-white z-10">
              <div>Account</div>
              <div>Transaction</div>
              <div>Reason</div>
              <div>Time</div>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {alerts.map((a) => {
                const key = `${a.accountId}-${a.transactionId}-${a.detectedAt}`;

                return (
                  <AlertRow
                    key={key}
                    alert={a}
                    onClick={() => setSelected(a)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* MODAL */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="🚨 Transaction Details"
      >
        {selected && (
          <div className="space-y-3 text-sm">
            <Detail label="Account ID" value={selected.accountId} />
            <Detail label="Transaction ID" value={selected.transactionId || "—"} />
            <Detail label="Merchant" value={selected.merchant || "Unknown"} />
            <Detail label="Amount" value={`₹ ${selected.amount}`} />
            <Detail label="Reason" value={selected.reason} />
            <Detail
              label="Detected At"
              value={new Date(selected.detectedAt).toLocaleString()}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

const AlertRow = React.memo(({ alert, onClick }) => {
  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className={`
        grid grid-cols-4 gap-4 py-3 text-sm items-center
        cursor-pointer transition
        hover:bg-gray-100
        focus:ring-2 focus:ring-red-300
        ${severityBg(alert.reason)}
        ${alert.isNew ? "animate-slide-in" : ""}
      `}
    >
      <div className="font-medium">{alert.accountId}</div>

      <div className="text-gray-600">
        {alert.transactionId || "—"}
      </div>

      <div>
        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
          {alert.reason}
        </span>
      </div>

      <div className="text-gray-500">
        {new Date(alert.detectedAt).toLocaleString()}
      </div>
    </div>
  );
});

const Detail = ({ label, value }) => (
  <div className="flex justify-between border-b pb-1">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const severityBg = (reason = "") => {
  if (reason.includes("HIGH")) return "bg-red-50";
  if (reason.includes("MEDIUM")) return "bg-yellow-50";
  return "bg-gray-50";
};
