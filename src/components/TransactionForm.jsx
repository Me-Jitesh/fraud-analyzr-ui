import { useState } from "react";
import axios from "axios";

export default function TransactionForm() {
  const [form, setForm] = useState({
    transactionId: "",
    accountId: "",
    amount: "",
    merchant: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitTxn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8080/api/v1/txn/pay", {
        ...form,
        timestamp: new Date()
      });
      setMessage("✅ Transaction sent for fraud analysis");
      setForm({ transactionId: "", accountId: "", amount: "", merchant: "" });
    } catch (err) {
      setMessage("❌ Failed to send transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          💳 Transaction Payment
        </h2>

        <form onSubmit={submitTxn} className="space-y-4">
          <input
            name="transactionId"
            placeholder="Transaction ID"
            value={form.transactionId}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="accountId"
            placeholder="Account ID"
            value={form.accountId}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            name="merchant"
            placeholder="Merchant"
            value={form.merchant}
            onChange={handleChange}
            required
            className="input"
          />

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
