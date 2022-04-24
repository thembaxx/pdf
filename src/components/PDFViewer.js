import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PDFViewer = ({ file }) => {
  const [numPages, setNumpages] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumpages(numPages);
    setPageNum(1);
  };

  const onDocumentLoadError = (e) => {
    console.log("error loading document: ", e);
  };

  return (
    <div>
      {file && (
        <Document
          file={file?.url}
          onLoadError={onDocumentLoadError}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height={600} pageNumber={pageNum} />
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;
