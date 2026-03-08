import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/Sidebar.js';
import LoginContainer from './components/auth/LoginContainer.js';
import LegalLensDashboard from './pages/dashboard/LegalLensDashboard.js';
import CasesPage from './pages/cases/CasesPage.js';
import CaseDetails from './components/cases/CaseDetails.js';
import './App.css';

// Layout wrapper for all authenticated pages
function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="mainContentArea dashboard-bg">{children}</div>
    </>
  );
}

function App() {
  return (
    <div className="appContainer">
      <Routes>
        {/* Login route without sidebar */}
        <Route path="/login" element={<LoginContainer />} />

        {/* Dashboard routes with sidebar */}
        <Route
          path="/"
          element={
            <DashboardLayout>
              <LegalLensDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <LegalLensDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/cases"
          element={
            <DashboardLayout>
              <CasesPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/cases/:caseId"
          element={
            <DashboardLayout>
              <CaseDetails />
            </DashboardLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
