import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import StatCard from "../../components/common/StatCard.js";
import CaseRow from "../../components/cases/CaseRow.js";
import Notification from "../../components/common/Notification.js";
import { Plus, FolderOpen, Bell, Search } from "lucide-react";
import "./Dashboard.css";

export default function LegalLensDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [assignedCases, setAssignedCases] = useState([]);
  const [recentCases, setRecentCases] = useState([]);
  const [caseStats, setCaseStats] = useState({
    totalAssigned: 0,
    activeCases: 0,
    closedCases: 0,
    highPriorityCases: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Dashboard message
        const dashboardRes = await api.get("/dashboard");
        setMessage(dashboardRes.data.message);

        // 2. Assigned cases (latest 3 for current user)
        const casesRes = await api.get("/assigned-cases");
        if (casesRes.data.message === "no assigned cases") {
          setAssignedCases([]);
        } else {
          setAssignedCases(casesRes.data);
        }

        // 3. Open Cases (latest 3)
        const recentRes = await api.get("/recent-cases");
        if (recentRes.data.message === "no recent cases") {
          setRecentCases([]);
        } else {
          setRecentCases(recentRes.data);
        }

        //4. Case stats
        const statsRes = await api.get("/case-stats");
        setCaseStats(statsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setMessage("Unauthorized");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      }
    };

    fetchData();
  }, [navigate]);

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

  const toAssignedCases = () => {
    navigate("/cases");
  };

  return (
    <div className="dashboardMain">
      {/* 1. TOP HEADER */}
      <header className="dashboardHeader">
        <div className="headerBranding">
          <h1 className="logoText">
            <span>LEGALLENS</span> Dashboard
          </h1>
          <p className="systemStatus">
            Welcome back,{" "}
            <span className="highlightText">{user?.name || "User"}</span> •{" "}
            {message || "System status: Optimal"}
          </p>
        </div>

        <div className="headerActions">
          <div className="searchContainer">
            <Search className="searchIcon" size={16} />
            <input
              type="text"
              placeholder="Search cases..."
              className="searchInput"
            />
          </div>

          <button className="notificationBtn">
            <Bell size={20} />
            <span className="badge"></span>
          </button>

          <div className="userAvatar"></div>
        </div>
      </header>

      {/* 2. STATS GRID */}
      <div className="statsGrid">
        <StatCard
          title="Total Cases"
          value={caseStats.totalAssigned}
          type="total"
        />
        <StatCard
          title="Active Cases"
          value={caseStats.activeCases}
          type="active"
        />
        <StatCard
          title="Closed Cases"
          value={caseStats.closedCases}
          type="closed"
        />
        <StatCard
          title="High Priority"
          value={caseStats.highPriorityCases}
          type="priority"
        />
      </div>

      {/* 3. MIDDLE SECTION */}
      <div className="middleSection">
        <section className="glassCard">
          <div className="sectionHeader">
            <h2>Recent Cases</h2>
            <button className="viewAllBtn">View All ›</button>
          </div>
          <div className="caseList">
            <div className="caseList">
              {recentCases.length === 0 ? (
                <p className="noCasesMsg">no recent cases</p>
              ) : (
                recentCases.map((c) => (
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
        </section>

        {user?.role_id != 1 && (
          <section className="glassCard">
            <div className="sectionHeader">
              <h2>My Assigned Cases</h2>
              <button className="viewAllBtn" onClick={toAssignedCases}>
                View All ›
              </button>
            </div>
            <div className="caseList">
              {assignedCases.length === 0 ? (
                <p className="noCasesMsg">no assigned cases</p>
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
          </section>
        )}
      </div>

      {/* 4. BOTTOM SECTION */}
      <div className="bottomSection">
        <section className="glassCard">
          <h2 className="sectionTitle">System Notifications</h2>
          <div className="notificationList">
            <Notification
              text="New case assigned: Warehouse Theft (CI-099)"
              time="10 minutes ago"
            />
            <Notification
              text="Evidence verified for case CI-102"
              time="30 minutes ago"
            />
            <Notification
              text="Case CI-088 status updated to 'Closed'"
              time="2 hours ago"
            />
          </div>
        </section>

        {user?.role_id === 1 && (
          <section className="glassCard">
            <h2 className="sectionTitle">Quick Actions</h2>
            <div className="actionsGrid">
              <button className="primaryActionBtn">
                <Plus size={18} /> Create New Case
              </button>
              <button className="secondaryActionBtn">
                <FolderOpen size={18} /> View Archives
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
