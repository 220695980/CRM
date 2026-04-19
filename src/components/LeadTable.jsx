import React from "react";

function getStatusClass(status) {
  const map = {
    "New": "status-new",
    "Contacted": "status-contacted",
    "Qualified": "status-qualified",
    "Proposal Sent": "status-proposal",
    "Closed Won": "status-won",
    "Closed Lost": "status-lost",
  };
  return map[status] || "";
}

export default function LeadTable({ leads, onStatusChange }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Source</th>
          <th>Status</th>
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.full_name}</td>
            <td>{lead.company}</td>
            <td>{lead.email}</td>
            <td>{lead.phone}</td>
            <td>{lead.source}</td>
            <td>
              <span className={`status ${getStatusClass(lead.status)}`}>
                {lead.status}
              </span>
            </td>
            <td>
              <select
                value={lead.status}
                onChange={(e) => onStatusChange(lead.id, e.target.value)}
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Proposal Sent</option>
                <option>Closed Won</option>
                <option>Closed Lost</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
