import React from 'react';
import '../Components.css';

export default function Notification({ text, time }) {
  return (
    <div className="notifItem">
      <p className="notifText">{text}</p>
      <span className="notifTime">{time}</span>
    </div>
  );
}
