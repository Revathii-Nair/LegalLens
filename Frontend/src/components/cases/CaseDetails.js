import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CaseTabs from "./CaseTabs.js";
import TimelineTab from "./TimelineTab.js";
import MembersTab from "./MembersTab.js";
import FilesTab from "./FilesTab.js";
import "../Components.css";
import api from "../../api";

export default function CaseDetails() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);

  const tabs = [
    { label: "Timeline", content: <TimelineTab /> },
    { label: "Members", content: <MembersTab /> },
    { label: "Files", content: <FilesTab /> },
  ];

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await api.get(`/case/${caseId}`);
        setCaseData(res.data);
      } catch (err) {
        console.error("Error fetching case details:", err);
      }
    };
    fetchCase();
  }, [caseId]);

  return (
    <div className="detailsPage">
      <button onClick={() => navigate(-1)} className="backBtn">
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="detailsGlassCard">
        <header className="detailsHeader">
          <h1>{caseData?.title || "Case Investigation"}</h1>
          <p>
            Viewing details for Reference: <span>{caseId}</span>
          </p>
        </header>

        <div className="detailsInfoGrid">
          <div className="infoTile">
            <h4>Status</h4>
            <p className="statusActive">{caseData?.status || "Unknown"}</p>
          </div>
          <div className="infoTile">
            <h4>Assigned To</h4>
            <p>
              {caseData?.leadInvestigators?.length
                ? caseData.leadInvestigators.join(", ")
                : "Unassigned"}
            </p>
          </div>
        </div>

        <CaseTabs tabs={tabs} />
      </div>
    </div>
  );
}
