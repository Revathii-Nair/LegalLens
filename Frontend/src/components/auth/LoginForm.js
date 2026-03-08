import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm({ role, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (res.data.message === 'Login successful') {
        // Save user info for later use
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/Dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const getRoleTitle = () => {
    const titles = {
      police: 'Police Officer',
      forensic: 'Forensic Officer',
      admin: 'Administrator',
      lead: 'Investigator',
    };
    return titles[role] || 'User';
  };

  return (
    <div className="formContainer">
      <button className="backButton" onClick={onBack}>
        <i className="bx bx-arrow-back"></i> Change Role
      </button>

      <header className="formHeader">
        <h2>Welcome Back</h2>
        <p>
          Sign in as <strong>{getRoleTitle()}</strong>
        </p>
      </header>

      <div className="securityNotice">
        <i className="bx bx-shield-quarter"></i>
        <div>
          <strong>Secure Login</strong>
          <p>Your credentials are protected with encryption</p>
        </div>
      </div>

      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label>Email Address</label>
          <div className="inputWrapper">
            <input
              type="email"
              placeholder="your.email@agency.gov"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bx-envelope"></i>
          </div>
        </div>

        <div className="inputGroup">
          <label>Password</label>
          <div className="inputWrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={showPassword ? 'bx bx-eye' : 'bx bx-eye-closed'}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="formUtils">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="submitBtn">
          Sign In Securely
        </button>
      </form>

      <footer className="formFooter">
        Need access? <a href="#">Contact administrator</a>
      </footer>
    </div>
  );
}

export default LoginForm;
