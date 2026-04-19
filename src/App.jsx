import React, { useEffect, useState } from "react";
import DashboardCards from "./components/DashboardCards";
import LeadTable from "./components/LeadTable";
import LeadForm from "./components/LeadForm";

const API_BASE = "http://127.0.0.1:5000";

export default function App() {
  const [leads, setLeads] = useState([]);
  const [dashboard, setDashboard] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    closedLeads: 0,
  });
  const [message, setMessage] = useState("");

  async function loadData() {
    const leadsRes = await fetch(`${API_BASE}/api/leads`);
    const leadsData = await leadsRes.json();
    setLeads(leadsData);

    const dashRes = await fetch(`${API_BASE}/api/dashboard`);
    const dashData = await dashRes.json();
    setDashboard(dashData);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitLead(form) {
    setMessage("");
    const res = await fetch(`${API_BASE}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Failed to add lead");
      return false;
    }

    setMessage("Lead added successfully.");
    await loadData();
    return true;
  }

  async function updateStatus(id, status) {
    await fetch(`${API_BASE}/api/leads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    await loadData();
  }

  return (
    <div className="container">
      <div className="hero">
        <div className="badge">CRM · Python · SQL · React</div>
        <h1>Customer Relationship Management Platform</h1>
        <p>
          A CRM platform for sales leads. Track prospects, manage lead status,
          and give your team a simple sales workflow.
        </p>
      </div>

      <DashboardCards dashboard={dashboard} />

      <div className="grid">
        <div className="card wide">
          <h2>Lead Pipeline</h2>
          <p className="muted">Update the lead stage directly from the table.</p>
          <LeadTable leads={leads} onStatusChange={updateStatus} />
        </div>

        <div className="card side">
          <h2>Add Lead</h2>
          <p className="muted">Create a new sales lead for the CRM pipeline.</p>
          <LeadForm onSubmit={submitLead} />
          {message && <p style={{ marginTop: "12px" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
