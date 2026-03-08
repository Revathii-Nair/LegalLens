import React from 'react';
import './Dashboard.css';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Clock,
  BarChart3,
  FileSearch,
  ShieldCheck,
  Settings,
  Search,
  Bell,
  PlusCircle,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  Download,
  MoreHorizontal,
  Gavel,
} from 'lucide-react';

const StatCard = ({ title, count, linkText, colorClass = 'indigo-theme', trend = '+12%' }) => (
  <div className="statCard">
    <div className="statHeader">
      <h3>{title}</h3>
      <span className="trendBadge">{trend}</span>
    </div>
    <div className="statValue">
      <p>{count}</p>
    </div>
    <div className="progressBarContainer">
      <div className={`progressBar ${colorClass}`} style={{ width: '66%' }} />
    </div>
    <button className={`statLink ${colorClass}`}>
      {linkText} <ChevronRight size={14} />
    </button>
  </div>
);

const FileRow = ({ name, type, status, isAlert = false }) => (
  <div className="fileRow">
    <div className="fileInfo">
      <div className={`fileIcon ${isAlert ? 'alert' : ''}`}>
        <FileText size={20} />
      </div>
      <div>
        <p className="fileName">{name}</p>
        <div className="fileMeta">
          <span>{type}</span>
          <span className="dot" />
          <span className={isAlert ? 'textAlert' : 'textSuccess'}>{status}</span>
        </div>
      </div>
    </div>
    <div className="fileActions">
      <button className="downloadBtn">
        <Download size={16} />
      </button>
      <button className="viewBtn">VIEW</button>
    </div>
  </div>
);

export default function LegalLensDashboard() {
  return (
    <div className="dashboardContainer">
      <aside className="sidebar">
        <div className="sidebarLogo">
          <div className="logoIcon">
            <Gavel size={24} />
          </div>
          <h1>
            Legal <span>Lens</span>
          </h1>
        </div>

        <nav className="sidebarNav">
          <p className="navSectionTitle">Investigation Hub</p>
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Briefcase} label="Active Cases" />
          <NavItem icon={FileText} label="Evidence Vault" />
          <NavItem icon={Clock} label="Global Timeline" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={FileSearch} label="Final Reports" />
        </nav>

        <div className="sidebarProfile">
          <div className="profileCard">
            <div className="avatarWrapper">
              <div className="avatar">AP</div>
              <div className="onlineIndicator" />
            </div>
            <div className="profileInfo">
              <p className="profileName">Akshada Pisal</p>
              <p className="profileRole">Lead Investigator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="mainContent">
        <header className="topHeader">
          <div className="searchWrapper">
            <Search className="searchIcon" size={18} />
            <input type="text" placeholder="Search case IDs, suspects..." />
          </div>
          <div className="headerActions">
            <div className="iconAction">
              <Settings size={20} />
            </div>
            <div className="iconAction relative">
              <Bell size={20} />
              <span className="notificationBadge">3</span>
            </div>
            <div className="dividerV" />
            <div className="newCaseBtn">
              <PlusCircle size={18} />
              <span>New Case</span>
            </div>
          </div>
        </header>

        <div className="contentWrapper">
          <section className="statsGrid">
            <StatCard
              title="Total Cases"
              count="08"
              linkText="MANAGE CASES"
              colorClass="indigo-theme"
              trend="+2 New"
            />
            <StatCard
              title="Review Queue"
              count="14"
              linkText="VIEW QUEUE"
              colorClass="orange-theme"
              trend="Active"
            />
            <StatCard
              title="High Risk"
              count="03"
              linkText="URGENT ALERTS"
              colorClass="red-theme"
              trend="Priority"
            />
          </section>

          <div className="mainGrid">
            <div className="timelineSection">
              <div className="sectionHeader">
                <h3>
                  <div className="iconBox">
                    <Clock size={18} />
                  </div>{' '}
                  Case Journey
                </h3>
                <MoreHorizontal className="moreIcon" />
              </div>
              <div className="timelineList">
                <TimelineItem date="Apr 18" text="Investigation initialized" />
                <TimelineItem date="Apr 20" text="Digital evidence secured" badge="Evidence" />
                <TimelineItem date="Apr 22" text="Forensic analysis complete" />
                <TimelineItem date="Apr 26" text="Final summary generated" isLast />
              </div>
              <button className="fullLogsBtn">FULL LOGS</button>
            </div>

            <div className="activitySection">
              <div className="evidenceVault">
                <div className="vaultHeader">
                  <div>
                    <h3>Evidence Vault</h3>
                    <p>Managing secure case assets for Akshada Pisal</p>
                  </div>
                  <button className="uploadBtn">
                    <PlusCircle size={16} /> UPLOAD ASSET
                  </button>
                </div>
                <div className="fileList">
                  <FileRow name="Audit_Trail_2026.pdf" type="PDF" status="Verified" />
                  <FileRow name="Audio_Log_Redacted.mp3" type="Audio" status="Flagged" isAlert />
                  <FileRow name="Evidence_Scene_Photo.jpg" type="Image" status="Processing" />
                </div>
              </div>

              <div className="bottomGrid">
                <div className="recentActivity">
                  <h3 className="subSectionTitle">
                    <div className="iconBox emerald">
                      <MessageSquare size={18} />
                    </div>{' '}
                    Recent Activity
                  </h3>
                  <div className="activityList">
                    <ActivityItem user="Akshada" action="authenticated new vault" time="12m ago" />
                    <ActivityItem user="Rahul" action="modified Case #442" time="1h ago" />
                    <ActivityItem user="System" action="auto-archived 2 logs" time="3h ago" />
                  </div>
                </div>

                <div className="smartActions">
                  <div className="shieldOverlay">
                    <ShieldCheck size={120} />
                  </div>
                  <h3 className="smartTitle">
                    <CheckCircle2 size={18} /> Smart Actions
                  </h3>
                  <ul className="actionList">
                    <li>
                      <span className="dot indigo" /> Verify Digital Signatures
                    </li>
                    <li>
                      <span className="dot orange" /> Review Flagged Audio
                    </li>
                    <li>
                      <span className="dot indigo" /> Export Investigation PDF
                    </li>
                  </ul>
                  <button className="runAnalysisBtn">Run Analysis</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ icon: Icon, label, active = false }) => (
  <div className={`navItem ${active ? 'active' : ''}`}>
    <Icon size={20} strokeWidth={active ? 3 : 2} />
    <span>{label}</span>
    {active && <ArrowUpRight size={14} className="activeArrow" />}
  </div>
);

const TimelineItem = ({ date, text, isLast = false, badge }) => (
  <div className="timelineItem">
    <div className="timelineDot" />
    <div className="timelineContent">
      <div className="timelineHeader">
        <span className="timelineDate">{date}</span>
        {badge && <span className="timelineBadge">{badge}</span>}
      </div>
      <p className="timelineText">{text}</p>
    </div>
  </div>
);

const ActivityItem = ({ user, action, time }) => (
  <div className="activityItem">
    <div className="userInitial">{user.substring(0, 2).toUpperCase()}</div>
    <div className="activityContent">
      <p>
        <strong>{user}</strong> {action}
      </p>
      <span className="activityTime">{time}</span>
    </div>
  </div>
);
