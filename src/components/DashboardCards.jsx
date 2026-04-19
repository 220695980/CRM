import React from "react";

export default function DashboardCards({ dashboard }) {
  const cards = [
    { label: "Total Leads", value: dashboard.totalLeads },
    { label: "New Leads", value: dashboard.newLeads },
    { label: "Contacted", value: dashboard.contactedLeads },
    { label: "Closed Won", value: dashboard.closedLeads },
  ];

  return (
    <div className="grid metrics-grid">
      {cards.map((card) => (
        <div className="card metric" key={card.label}>
          <div className="label">{card.label}</div>
          <div className="value">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
