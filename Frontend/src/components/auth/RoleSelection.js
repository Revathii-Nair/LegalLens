import React from 'react';

function RoleSelection({ onRoleSelect }) {
  const roles = [
    {
      id: 'police',
      title: 'Police Officer',
      icon: 'bx-shield-quarter',
      description: 'Access case management and evidence tracking',
    },
    {
      id: 'forensic',
      title: 'Forensic Officer',
      icon: 'bx-file-find',
      description: 'Analyze digital evidence and reports',
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: 'bx-user-check',
      description: 'Manage users and system settings',
    },
    {
      id: 'lead',
      title: 'Lead investigator',
      icon: 'bx-user-check',
      description: 'Manage users and system settings',
    },
  ];

  return (
    <div className="formContainer">
      <header className="formHeader">
        <h2>Select Your Role</h2>
        <p>Choose your role type to access LegalLens</p>
      </header>

      <div className="rolesGrid">
        {roles.map((role) => (
          <div key={role.id} className="roleCard" onClick={() => onRoleSelect(role.id)}>
            <div className="roleIcon">
              <i className={`bx ${role.icon}`}></i>
            </div>
            <h3>{role.title}</h3>
            <p>{role.description}</p>
          </div>
        ))}
      </div>

      <footer className="formFooter">
        Need help? <a href="#">Contact support</a>
      </footer>
    </div>
  );
}

export default RoleSelection;
