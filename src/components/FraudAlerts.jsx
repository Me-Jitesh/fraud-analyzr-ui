import React, { useEffect, useRef, useState, memo } from "react";
import { List } from "react-window";
import api from "../api/axios";
import Modal from "./ui/Modal";
import Card from "./ui/Card";
import FraudSkeleton from "./ui/FraudSkeleton";
import {
  ExclamationTriangleIcon,
  BanknotesIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import useFraudAlert from "../hooks/useFraudAlert";

const MAX_ALERTS = 400;
const ROW_HEIGHT = 68;

export default function FraudAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const seenRef = useRef(new Set());
  const listRef = useRef(null);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const triggerFraudAlert = useFraudAlert(soundEnabled);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/api/v1/fraud/alerts");
        const data = Array.isArray(res.data) ? res.data : [];

        const sorted = [...data].sort(
          (a, b) => new Date(b.detectedAt) - new Date(a.detectedAt),
        );

        setAlerts((prev) => {
          const newItems = [];

          for (const a of sorted) {
            const key = `${a.accountId}-${a.transactionId}-${a.detectedAt}`;

            if (!seenRef.current.has(key)) {
              seenRef.current.add(key);

              triggerFraudAlert({
                amount: a.amount,
                type: a.reason,
                accountId: a.accountId,
              });

              newItems.push({ ...a, isNew: true });
            }
          }

          if (newItems.length === 0) return prev;

          const cleanedPrev = prev.map((p) => ({
            ...p,
            isNew: false,
          }));

          const updated = [...newItems, ...cleanedPrev];

          return updated.slice(0, MAX_ALERTS);
        });
      } catch (e) {
        console.error("Fraud API error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const id = setInterval(fetchAlerts, 4000);
    return () => clearInterval(id);
  }, [triggerFraudAlert]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const currentScroll = list.getScrollOffset?.() ?? 0;

    if (currentScroll < 50) {
      list.scrollTo({ top: 0 });
    }
  }, [alerts.length]);

  return (
    <div className="md:col-span-2">
      <Card
        title={
          <div className="flex items-center text-sm font-semibold text-gray-800 gap-2 uppercase">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />

            <span>Suspicious Transaction Monitoring</span>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-2 text-xs px-3 py-1 rounded-full
                   border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            >
              {soundEnabled ? (
                <SpeakerWaveIcon className="w-4 h-4 text-green-600" />
              ) : (
                <SpeakerXMarkIcon className="w-4 h-4 text-gray-400" />
              )}
              {soundEnabled ? "ON" : "OFF"}
            </button>
          </div>
        }
      >
        {loading ? (
          <FraudSkeleton />
        ) : alerts.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">
            No suspicious activity detected
          </p>
        ) : (
          <div className="h-[800px]">
            <div className="grid grid-cols-5 gap-4 text-[11px] text-gray-400 border-b pb-2 bg-white sticky top-0 z-10 px-2">
              <div>Account</div>
              <div>Transaction</div>
              <div className="text-center">Reason</div>
              <div className="text-center">Risk Score</div>
              <div className="text-center">Time</div>
            </div>

            <List
              ref={listRef}
              rowCount={alerts.length}
              rowHeight={ROW_HEIGHT}
              height={400}
              width="100%"
              rowComponent={VirtualRow}
              rowProps={{
                alerts,
                setSelected,
              }}
            />
          </div>
        )}
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={
          <div className="flex items-center gap-2 uppercase">
            <BanknotesIcon className="w-5 h-5 text-orange-600" />
            <span>Transaction Details</span>
          </div>
        }
      >
        {selected && (
          <div className="space-y-2 text-xs">
            <Detail label="Account ID" value={selected.accountId} />
            <Detail
              label="Transaction ID"
              value={selected.transactionId || "—"}
            />
            <Detail label="Merchant" value={selected.merchant || "Unknown"} />
            <Detail label="Amount" value={`₹ ${selected.amount}`} />
            <Detail label="Reason" value={selected.reason} />
            <Detail label="Risk Score" value={selected.riskScore ?? "—"} />
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

const VirtualRow = memo(({ index, style, alerts, setSelected }) => {
  const alert = alerts[index];

  return (
    <div style={style}>
      <AlertRow alert={alert} onClick={() => setSelected(alert)} />
    </div>
  );
});

const AlertRow = memo(({ alert, onClick }) => {
  const isHighAmount = alert.reason?.includes("HIGH_AMOUNT");
  const isHighVelocity = alert.reason?.includes("HIGH_VELOCITY");

  return (
    <div
      onClick={onClick}
      tabIndex={0}
      className={`
grid grid-cols-5
gap-3
py-2
px-2
text-[12px]
items-center
cursor-pointer
transition hover:bg-gray-100
focus:ring-2 focus:ring-blue-300
${severityBg(alert.reason)}
${alert.isNew ? "animate-slide-in" : ""}
`}
    >
      <div className="text-[11px]">{alert.accountId}</div>

      <div className="text-gray-600 text-[10px]">
        {alert.transactionId || "—"}
      </div>

      <div className="flex justify-center">
        <span
          className={`text-[9px] px-2 py-0.5 rounded-full leading-tight whitespace-nowrap ${
            isHighAmount
              ? "bg-red-100 text-red-600"
              : isHighVelocity
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {alert.reason}
        </span>
      </div>

      <div className="font-semibold text-orange-400 text-[13px] text-center">
        {alert.riskScore ?? "—"}
      </div>

      <div className="text-gray-500 text-[10px]">
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
  const r = reason?.toUpperCase();

  if (r.includes("HIGH_AMOUNT")) return "bg-red-50";
  if (r.includes("HIGH_VELOCITY")) return "bg-blue-50";

  return "bg-gray-50";
};
