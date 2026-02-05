import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function StreamStatus() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get("/api/v1/stream/status")
      .then(res => setCount(res.data.processedTransactions))
      .catch(console.error);
  }, []);

  return (
    <Card title="Live Stream">
      <div className="space-y-2">
        <p className="text-4xl font-semibold">{count}</p>
        <p className="text-gray-400 text-sm">
          Transactions processed
        </p>
      </div>
    </Card>
  );
}
