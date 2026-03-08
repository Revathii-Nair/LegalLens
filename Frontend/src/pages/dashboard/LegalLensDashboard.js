import React from 'react';
import StatCard from '../../components/common/StatCard.js';
import CaseRow from '../../components/cases/CaseRow.js';
import Notification from '../../components/common/Notification.js';
import { Plus, FolderOpen, Bell, Search } from 'lucide-react';
import './Dashboard.css';

export default function LegalLensDashboard() {
  return (
    <div className="dashboardMain">
      {/* 1. TOP HEADER */}
      <header className="dashboardHeader">
        <div className="headerBranding">
          <h1 className="logoText">
            <span>LEGALLENS</span> Dashboard
          </h1>
          <p className="systemStatus">
            Welcome back, <span className="highlightText">Lead Investigator</span> • System status:
            Optimal
          </p>
        </div>

        <div className="headerActions">
          <div className="searchContainer">
            <Search className="searchIcon" size={16} />
            <input type="text" placeholder="Search cases..." className="searchInput" />
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
        <StatCard title="Total Cases" value="42" type="total" />
        <StatCard title="Active Cases" value="18" type="active" />
        <StatCard title="Closed Cases" value="24" type="closed" />
        <StatCard title="High Priority" value="08" type="priority" />
      </div>

      {/* 3. MIDDLE SECTION */}
      <div className="middleSection">
        <section className="glassCard">
          <div className="sectionHeader">
            <h2>Recent Cases</h2>
            <button className="viewAllBtn">View All ›</button>
          </div>
          <div className="caseList">
            <CaseRow id="CI-104" title="Cyber Crime" priority="Medium" status="Active" />
            <CaseRow id="CI-105" title="Robbery Case" priority="Low" status="New" />
            <CaseRow id="CI-108" title="Missing Person" priority="High" status="Active" />
          </div>
        </section>

        <section className="glassCard">
          <div className="sectionHeader">
            <h2>My Assigned Cases</h2>
            <button className="viewAllBtn">View All ›</button>
          </div>
          <div className="caseList">
            <CaseRow id="CI-102" title="Bank Fraud Investigation" priority="High" status="High" />
            <CaseRow id="CI-099" title="Warehouse Theft" priority="Low" status="Closed" />
            <CaseRow id="CI-112" title="Narcotics Distribution" priority="High" status="Active" />
          </div>
        </section>
      </div>

      {/* 4. BOTTOM SECTION */}
      <div className="bottomSection">
        <section className="glassCard">
          <h2 className="sectionTitle">System Notifications</h2>
          <div className="notificationList">
            <Notification text="New case assigned: Warehouse Theft (CI-099)" time="10 minutes ago" />
            <Notification text="Evidence verified for case CI-102" time="30 minutes ago" />
            <Notification text="Case CI-088 status updated to 'Closed'" time="2 hours ago" />
          </div>
        </section>

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
      </div>
    </div>
  );
}
