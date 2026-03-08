import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Folder, FileText, Settings, LogOut } from 'lucide-react';
import NavItem from './NavItem.js';
import '../Components.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sideBar">
      <div className="sideBarBranding">
        <div className="sideBarLogo">
          <span className="logoEmoji">🔎</span>
        </div>
      </div>

      <nav className="sideBarNav">
        <NavItem
          icon={<Home size={18} />}
          label="Home"
          active={location.pathname === '/'}
          onClick={() => navigate('/')}
        />
        <NavItem
          icon={<Folder size={18} />}
          label="Cases"
          active={location.pathname.startsWith('/cases')}
          onClick={() => navigate('/cases')}
        />
        <NavItem icon={<FileText size={18} />} label="Audit Log" />
        <NavItem icon={<Settings size={18} />} label="Settings" />
      </nav>

      <div className="sideBarFooter">
        <NavItem icon={<LogOut size={18} />} label="Log Out" />
      </div>
    </div>
  );
}
