import React, { useState } from 'react';
import '../Components.css';

export default function CaseTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="tabsContainer">
      {/* Tab headers */}
      <div className="tabsHeader">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`tabBtn ${activeTab === tab.label ? 'tabActive' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="tabContent">
        {tabs.map((tab) => activeTab === tab.label && <div key={tab.label}>{tab.content}</div>)}
      </div>
    </div>
  );
}
