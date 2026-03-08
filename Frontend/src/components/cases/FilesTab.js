import React from 'react';
import '../Components.css';

export default function FilesTab() {
  return (
    <div className="tabFilesContainer">
      <button className="btnUpload">Upload File</button>
      <ul className="fileList">
        <li>
          <a href="#" className="fileLink">
            Evidence_1.pdf
          </a>
        </li>
        <li>
          <a href="#" className="fileLink">
            Photo_2.jpg
          </a>
        </li>
      </ul>
    </div>
  );
}
