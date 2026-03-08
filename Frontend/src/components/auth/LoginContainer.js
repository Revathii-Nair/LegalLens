import React, { useState } from 'react';
import './Login.css';
import RoleSelection from './RoleSelection.js';
import LoginForm from './LoginForm.js';
import LoginBanner from '../../assets/LoginPageBanner.webp';

function LoginContainer() {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  return (
    <div className="loginPage">
      <div className="left">
        <img src={LoginBanner} alt="LegalLens Banner" />
      </div>

      {/* Right side - Changes based on state */}
      <div className="right">
        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : (
          <LoginForm role={selectedRole} onBack={handleBack} />
        )}
      </div>
    </div>
  );
}

export default LoginContainer;
