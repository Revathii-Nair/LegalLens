import React from 'react';
import '../Components.css';

export default function CaseCard({ data, onClick }) {
  // Mapping priority to specific CSS classes
  const priorityClass = {
    High: 'priorityHigh',
    Medium: 'priorityMedium',
    Low: 'priorityLow',
  };

  return (
    <div onClick={onClick} className="caseCard">
      <p className="caseId">{data.id}</p>
      <h3 className="caseTitle">{data.title}</h3>
      <p className="caseDescription">{data.description}</p>
      <p className={`casePriority ${priorityClass[data.priority]}`}>{data.priority}</p>
    </div>
  );
}
