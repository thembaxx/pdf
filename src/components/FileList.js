import React from "react";

const FileList = ({ files, setSelectedDoc }) => {
  return (
    <div>
      {files.map(({ name, size }, i) => (
        <div key={i} onClick={() => setSelectedDoc(i)}>
          <div>{name}</div>
          <div>{size}</div>
        </div>
      ))}
    </div>
  );
};

export default FileList;
