import { useState } from "react";
import api from "../api/axios";
import StreamingWave from "./ui/StreamingWave";
import { CreditCardIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

export default function TransactionForm() {
  const [payLoading, setPayLoading] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
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

  const amount = Number(form.amount);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manual Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPayLoading(true);

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
      setPayLoading(false);
    }
  };

  // Bulk 10
  const handleBulk10 = async () => {
    try {
      setBulkLoading(true);
      const res = await api.post("/api/v1/txn/pay/bulk");
      setMessage(res.data);
    } catch {
      setMessage("Bulk Transaction Failed");
    } finally {
      setBulkLoading(false);
    }
  };

  // Bulk N
  const handleBulkN = async () => {
    try {
      setCustomLoading(true);
      const res = await api.post(`/api/v1/txn/pay/bulk/${bulkCount}`);
      setMessage(res.data);
    } catch {
      setMessage("Bulk N Transaction Failed");
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <CreditCardIcon className="w-5 h-5 text-gray-600" />
        <span>SIMULATE TRANSACTION</span>
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="accountId"
          placeholder="Account ID"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          name="transactionId"
          placeholder="Transaction ID"
          className="input"
          onChange={handleChange}
          required
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              className={`input ${
                amount > 400000 ? "border-red-400 focus:ring-red-400" : ""
              }`}
              onChange={handleChange}
              required
            />

            {amount > 400000 && (
              <div className="relative group cursor-pointer">
                <span className="text-red-500 font-bold">ⓘ</span>

                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-9 
          bg-red-500 text-white text-xs px-3 py-1 
          rounded-md shadow-md opacity-0 
          group-hover:opacity-100 transition 
          whitespace-nowrap z-10"
                >
                  This transaction may be flagged as SUSPICIOUS
                </div>
              </div>
            )}
          </div>
        </div>

        <input
          name="location"
          placeholder="Location"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          name="merchant"
          placeholder="Merchant"
          className="input"
          onChange={handleChange}
          required
        />

        <select name="type" className="input" onChange={handleChange}>
          <option>UPI</option>
          <option>Debit</option>
          <option>Credit</option>
          <option>Wallet</option>
        </select>

        <div className="col-span-2 flex justify-center">
          {payLoading ? (
            <StreamingWave active={true} />
          ) : (
            <button
              type="submit"
              disabled={payLoading}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition w-full"
            >
              Submit Transaction
            </button>
          )}
        </div>
      </form>
      <div className="border-t pt-6 space-y-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-800 tracking-wide uppercase">
          <Squares2X2Icon className="w-5 h-5 text-gray-600" />
          <span>Bulk Transaction Simulation</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Generate 10 Card */}
          <div
            onClick={!bulkLoading ? handleBulk10 : undefined}
            className={`group cursor-pointer rounded-xl border border-gray-200 
      bg-gradient-to-br from-gray-900 to-slate-800 
      text-white p-5 shadow-md transition 
      hover:shadow-xl hover:scale-[1.02] active:scale-[0.99]
      ${bulkLoading ? "opacity-60 cursor-not-allowed" : ""}`}
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

              {bulkLoading ? (
                <StreamingWave active={true} />
              ) : (
                <div className="text-4xl opacity-70 mt-4 group-hover:opacity-100 transition">
                  ⚡
                </div>
              )}
            </div>
          </div>

          {/* Generate N Card */}
          <div
            className="rounded-xl border border-gray-200 
        bg-white p-5 shadow-sm hover:shadow-md transition"
          >
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

              {customLoading ? (
                <StreamingWave active={true} />
              ) : (
                <button
                  onClick={handleBulkN}
                  disabled={customLoading}
                  className="whitespace-nowrap bg-sky-600 text-white px-4 py-2 
    rounded-lg hover:bg-sky-500 transition disabled:opacity-60"
                >
                  Run
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="text-sm bg-gray-100 text-green-600 px-3 py-2 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
}
