import React, { useState } from "react";

const initialForm = {
  full_name: "",
  company: "",
  email: "",
  phone: "",
  status: "New",
  source: "",
};

export default function LeadForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await onSubmit(form);
    if (ok) {
      setForm(initialForm);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Full name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      />
      <input
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        placeholder="Source"
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>New</option>
        <option>Contacted</option>
        <option>Qualified</option>
        <option>Proposal Sent</option>
        <option>Closed Won</option>
        <option>Closed Lost</option>
      </select>
      <button type="submit">Save Lead</button>
    </form>
  );
}
