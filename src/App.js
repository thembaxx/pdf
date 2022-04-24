import React, { useState } from "react";

import PDFViewer from "./components/PDFViewer";
import FileList from "./components/FileList";

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleSetDocs = (docs) => {
    setSelectedDocument(null);
    setDocuments(docs);
  };

  const setSelectedDoc = (index) => {
    if (index < 0 || index >= documents.length) return;

    setSelectedDocument(documents[index]);
  };

  const removeFile = (index) => {
    if (index < 0) return;
    const files = [...documents];
    files.splice(index, 1);
    setDocuments(files);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
        <FileList
          files={documents}
          setSelectedDoc={setSelectedDoc}
          returnDocuments={handleSetDocs}
          removeFile={removeFile}
        />
        <PDFViewer file={selectedDocument} />
      </div>
    </div>
  );
}

export default App;
