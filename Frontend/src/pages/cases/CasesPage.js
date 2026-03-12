import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CaseRow from "../../components/cases/CaseRow.js";
import "../dashboard/Dashboard.css";
import Header from "../../components/common/Header.js";
import api from "../../api.js";

export default function CasesPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [assignedCases, setAssignedCases] = useState([]);

  const getPriorityLabel = (num) => {
    switch (num) {
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      default:
        return "Unknown";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const casesRes = await api.get("cases");
        if (casesRes.data.message === "no assigned cases") {
          setAssignedCases([]);
        } else {
          setAssignedCases(casesRes.data);
        }
      } catch (err) {
        console.error("Error fetching cases data:", err);
        setMessage("Unauthorized");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="casesPageContainer">
        <h1 className="casesPageTitle">Cases Page</h1>
        <div className="casesListWrapper">
          {assignedCases.length === 0 ? (
            <p className="noCasesMsg">no recent cases</p>
          ) : (
            assignedCases.map((c) => (
              <CaseRow
                key={c.id}
                id={c.caseId}
                title={c.title}
                priority={getPriorityLabel(c.priority)}
                status={c.status}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
