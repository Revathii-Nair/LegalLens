import React from 'react';
import '../Components.css';

export default function TimelineTab() {
  return (
    <div className="timelineContainer">
      <div className="timelineEntry">
        <span className="timelineDot"></span>
        <p className="timelineInfo">01 Mar 2026 - Investigation started</p>
      </div>
      <div className="timelineEntry">
        <span className="timelineDot"></span>
        <p className="timelineInfo">02 Mar 2026 - Evidence collected</p>
      </div>
      <div className="timelineEntry">
        <span className="timelineDot"></span>
        <p className="timelineInfo">03 Mar 2026 - Suspect questioned</p>
      </div>
    </div>
  );
}
{
  /* // TimelineTab.jsx
export default function TimelineTab({ timeline }) {
  return (
    <ul className="space-y-2 text-sm">
      {timeline.map((t, i) => (
        <li key={i}>
          {t.date} - {t.event}
        </li>
      ))}
    </ul>
  );
}

// FilesTab.jsx
export default function FilesTab({ files }) {
  return (
    <ul className="space-y-2 text-sm">
      {files.map((f, i) => (
        <li key={i}>
          <a href={f.url} className="text-indigo-400 hover:underline">{f.name}</a>
        </li>
      ))}
    </ul>
  );
}
    */
}
