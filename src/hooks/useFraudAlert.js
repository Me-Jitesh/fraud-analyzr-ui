import { useRef, useCallback } from "react";
import toast from "react-hot-toast";

export default function useFraudAlert(soundEnabled) {
  const audioRef = useRef(new Audio("/alert.wav"));

  return useCallback(
    (transaction) => {
      toast.error(
        `Fraud detected: ₹${transaction.amount} • ${transaction.type}`,
        { icon: "🚨" },
      );

      if (soundEnabled) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    },
    [soundEnabled],
  );
}
