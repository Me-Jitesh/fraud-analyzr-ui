import { useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { ShieldExclamationIcon } from "@heroicons/react/24/solid";

const WINDOW_MS = 3000;

export default function useFraudAlert(soundEnabled) {
  const audioRef = useRef(new Audio("/alert.wav"));
  const lastToastTimeRef = useRef(0);
  const lastSoundTimeRef = useRef(0);

  return useCallback(
    (transaction) => {
      const now = Date.now();

      // Throttle toast
      if (now - lastToastTimeRef.current > 1000) {
        lastToastTimeRef.current = now;

        toast.error(
          <div className="flex items-center gap-2">
            <ShieldExclamationIcon className="w-5 h-5 text-red-500" />
            <span>
              Fraud Detected :: ₹{transaction.amount} • {transaction.type}
            </span>
          </div>,
          {
            icon: null,
            duration: 3000,
            style: {
              border: "1px solid #dc2626",
            },
          },
        );
      }

      // Play sound once per window
      if (soundEnabled && now - lastSoundTimeRef.current > WINDOW_MS) {
        lastSoundTimeRef.current = now;

        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    },
    [soundEnabled],
  );
}
