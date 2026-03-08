import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CaseTabs from './CaseTabs.js';
import TimelineTab from './TimelineTab.js';
import MembersTab from './MembersTab.js';
import FilesTab from './FilesTab.js';
import '../Components.css';

export default function CaseDetails() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  const tabs = [
    { label: 'Timeline', content: <TimelineTab /> },
    { label: 'Members', content: <MembersTab /> },
    { label: 'Files', content: <FilesTab /> },
  ];

  return (
    <div className="detailsPage">
      <button onClick={() => navigate(-1)} className="backBtn">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="detailsGlassCard">
        <header className="detailsHeader">
          <h1>Case Investigation</h1>
          <p>
            Viewing details for Reference: <span>{caseId}</span>
          </p>
        </header>

        <div className="detailsInfoGrid">
          <div className="infoTile">
            <h4>Status</h4>
            <p className="statusActive">Under Investigation</p>
          </div>
          <div className="infoTile">
            <h4>Assigned To</h4>
            <p>Detective John</p>
          </div>
        </div>

        <CaseTabs tabs={tabs} />
      </div>
    </div>
  );
}
