import { useState } from "react";
import api from "../api/axios";

export default function TransactionForm() {
  const [loading, setLoading] = useState(false);
  const [bulkCount, setBulkCount] = useState(20);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    transactionId: "",
    accountId: "",
    amount: "",
    location: "",
    merchant: "",
    type: "UPI",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manual Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        ...form,
        amount: Number(form.amount),
        items: [],
        timestamp: new Date(),
      };

      const res = await api.post("/api/v1/txn/pay", payload);
      setMessage(res.data);
    } catch (err) {
      setMessage("Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  // Bulk 10
  const handleBulk10 = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/v1/txn/pay/bulk");
      setMessage(res.data);
    } catch {
      setMessage("Bulk Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  // Bulk N
  const handleBulkN = async () => {
    try {
      setLoading(true);
      const res = await api.post(`/api/v1/txn/pay/bulk/${bulkCount}`);
      setMessage(res.data);
    } catch {
      setMessage("Bulk N Transaction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">

      <h2 className="text-lg font-semibold text-gray-800">
        Simulate Transaction
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="transactionId" placeholder="Transaction ID"
          className="input" onChange={handleChange} required />

        <input name="accountId" placeholder="Account ID"
          className="input" onChange={handleChange} required />

        <input name="amount" type="number" placeholder="Amount"
          className="input" onChange={handleChange} required />

        <input name="location" placeholder="Location"
          className="input" onChange={handleChange} required />

        <input name="merchant" placeholder="Merchant"
          className="input" onChange={handleChange} required />

        <select name="type" className="input" onChange={handleChange}>
          <option>UPI</option>
          <option>Debit</option>
          <option>Credit</option>
          <option>Wallet</option>
        </select>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition w-full"
          >
            {loading ? "Processing..." : "Submit Transaction"}
          </button>
        </div>
      </form>
      <div className="border-t pt-6 space-y-6">

        <h3 className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
          Bulk Transaction Simulation
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Generate 10 Card */}
          <div
            onClick={!loading ? handleBulk10 : undefined}
            className={`group cursor-pointer rounded-xl border border-gray-200 
      bg-gradient-to-br from-gray-900 to-slate-800 
      text-white p-5 shadow-md transition 
      hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]
      ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-300">
                  Quick Load
                </p>
                <p className="text-lg font-semibold mt-1">
                  Generate 10 Random Transactions
                </p>
              </div>

              <div className="text-4xl opacity-70 group-hover:opacity-100 transition">
                ⚡
              </div>
            </div>
          </div>

          {/* Generate N Card */}
          <div className="rounded-xl border border-gray-200 
        bg-white p-5 shadow-sm hover:shadow-md transition">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Custom Load
            </p>

            <p className="text-lg font-semibold mt-1 text-slate-800">
              Generate N Transactions
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">

              <input
                type="number"
                value={bulkCount}
                onChange={(e) => setBulkCount(e.target.value)}
                className="flex-1 min-w-[90px] px-3 py-2 border border-gray-300 
    rounded-lg text-sm focus:ring-2 focus:ring-sky-400"
              />

              <button
                onClick={handleBulkN}
                disabled={loading}
                className="whitespace-nowrap bg-sky-600 text-white px-4 py-2 
    rounded-lg hover:bg-sky-500 transition disabled:opacity-60"
              >
                Run
              </button>

            </div>

          </div>

        </div>
      </div>

      {message && (
        <div className="text-sm bg-gray-100 text-slate-700 px-3 py-2 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}
