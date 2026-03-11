import React from 'react';
import { Bell, Search } from 'lucide-react';
import '../../pages/dashboard/Dashboard.css';

export default function Header() {
  return (
    <header className="Header">
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
  );
}
