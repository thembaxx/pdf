import React, { useState, useEffect } from "react";
import FilePicker from "./components/FilePicker";

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

  return (
    <div className="App">
      <FilePicker returnDocuments={handleSetDocs} />
      <div style={{ display: "flex" }}>
        <FileList files={documents} setSelectedDoc={setSelectedDoc} />
        <PDFViewer file={selectedDocument} />
      </div>
    </div>
  );
}

export default App;
