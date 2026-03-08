import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components.css';

export default function CaseRow({ id, title, priority }) {
  const navigate = useNavigate();

  // Mapping priority to simplified CSS classes
  const priorityClass = {
    High: 'rowPriorityHigh',
    Medium: 'rowPriorityMedium',
    Low: 'rowPriorityLow',
  };

  const handleClick = () => navigate(`/cases/${id}`);

  return (
    <div onClick={handleClick} className="caseRowItem">
      <div className="caseRowInfo">
        <span className="caseRowId">{id}</span>
        <span className="caseRowTitle">{title}</span>
      </div>
      <span className={`caseRowBadge ${priorityClass[priority]}`}>{priority}</span>
    </div>
  );
}
