import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import styled from "styled-components";

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
    <Container>
      {file && (
        <Document
          file={file?.url}
          onLoadError={onDocumentLoadError}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height={600} pageNumber={pageNum} />
        </Document>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  padding-top: 1.5rem;
`;

export default PDFViewer;
