import { useState } from "react";
import api from "../api/axios";
import Card from "./ui/Card";

export default function TransactionForm() {
  const [form, setForm] = useState({
    transactionId: "",
    accountId: "",
    amount: "",
    merchant: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      await api.post("/api/v1/txn/pay", {
        ...form,
        amount: Number(form.amount),
        timestamp: new Date().toISOString(),
      });

      setSuccess(true);
      setForm({ transactionId: "", accountId: "", amount: "", merchant: "" });
    } catch (err) {
      setSuccess(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="💳 Create Transaction">
      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Account ID"
          name="accountId"
          value={form.accountId}
          onChange={onChange}
          required
        />

        <Input
          label="Transaction ID"
          name="transactionId"
          value={form.transactionId}
          onChange={onChange}
          required
        />

        <Input
          label="Amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={onChange}
          required
        />

        <Input
          label="Merchant"
          name="merchant"
          value={form.merchant}
          onChange={onChange}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white rounded-xl py-2 text-sm hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit Transaction"}
        </button>

        {success === true && (
          <p className="text-sm text-green-600">
            Transaction sent successfully
          </p>
        )}

        {success === false && (
          <p className="text-sm text-red-600">
            Failed to send transaction
          </p>
        )}
      </form>
    </Card>
  );
}

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-xs text-gray-500">{label}</label>
    <input
      {...props}
      className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
  </div>
);
