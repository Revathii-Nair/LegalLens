import React from 'react';
import CaseRow from '../../components/cases/CaseRow.js';
import '../dashboard/Dashboard.css';
import Header from '../../components/common/Header.js';

export default function CasesPage() {
  const cases = [
    { id: 'CI-104', title: 'Cyber Crime', priority: 'Medium' },
    { id: 'CI-105', title: 'Robbery Case', priority: 'Low' },
    { id: 'CI-108', title: 'Missing Person', priority: 'High' },
  ];

  return (
    <>
      <Header />
      <div className="casesPageContainer">
        <h1 className="casesPageTitle">Cases Page</h1>
        <div className="casesListWrapper">
          {cases.map((c) => (
            <CaseRow key={c.id} id={c.id} title={c.title} priority={c.priority} />
          ))}
        </div>
      </div>
    </>
  );
}
