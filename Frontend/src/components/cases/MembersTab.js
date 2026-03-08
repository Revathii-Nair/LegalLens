import React from 'react';
import '../Components.css';

export default function MembersTab() {
  return (
    <ul className="memberList">
      <li>
        Detective John <span>(Lead)</span>
      </li>
      <li>Tanaya Ambekar</li>
      <li>Akshada Pisal</li>
      <li>Revath Nair</li>
    </ul>
  );
}
{
  /*export default function MembersTab({ members }) {
  return (
    <ul className="space-y-2 text-sm">
      {members.map((m, i) => (
        <li key={i}>
          {m.name} {m.role && `(${m.role})`}
        </li>
      ))}
    </ul>
  );
} */
}
