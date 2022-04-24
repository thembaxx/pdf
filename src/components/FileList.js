import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Info, FolderSimple } from "phosphor-react";
import FileItem from "./FileItem";
import FilePicker from "./FilePicker";
import FilesPlaceholder from "./FilesPlaceholder";

const FileList = ({ files, setSelectedDoc, returnDocuments, removeFile }) => {
  const [activeStates, setActiveStates] = useState([]);

  useEffect(() => {
    if (files) setActiveStates(new Array(files.length).fill(false));
  }, [files]);

  const handleClick = (index) => {
    setSelectedDoc(index);

    const arr = new Array(files.length).fill(false);
    arr[index] = true;
    setActiveStates(arr);
  };

  return (
    <Container>
      <Header>
        <Flex align="center" justify="left">
          <div>Files</div>
          <Badge>{files ? files.length : 0}</Badge>
        </Flex>
        <FilePicker returnDocuments={returnDocuments}>
          <HeaderButton as="label" for="file_uploads">
            <FolderSimple size={24} color="#242424" />
            <div style={{ marginLeft: "0.5rem" }}>Add more files</div>
          </HeaderButton>
        </FilePicker>
      </Header>
      <InfoNotification>
        <Info size={20} color="rgba(0,0,0,0.67)" />
        <div style={{ marginLeft: "0.5rem" }}>
          Drag files up or down to reorder.
        </div>
      </InfoNotification>
      <List>
        {files.map(({ name, size, dateModified }, i) => (
          <div
            key={i}
            onClick={(e) => {
              e.preventDefault();
              handleClick(i);
            }}
          >
            <FileItem
              name={name}
              size={size}
              dateModified={dateModified}
              active={activeStates[i]}
              removeFile={() => removeFile(i)}
            />
          </div>
        ))}
      </List>
      <Footer>
        <FooterButton>Cancel</FooterButton>
        <FooterButton primary={true}>Combine</FooterButton>
      </Footer>

      {files.length === 0 && (
        <Placeholder>
          <FilesPlaceholder />
        </Placeholder>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  color: #242424;

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 350px;

  position: relative;
  transition: background-color 250ms linear;
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;

  height: 64px;

  padding: 0 1rem;
`;

const Badge = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  font-weight: 400;

  height: 1.5rem;
  width: 1.5rem;

  margin-left: 0.5rem;
`;

const HeaderButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: 0.875rem;
  font-weight: 400;

  height: 3rem;

  padding: 0 1rem;
`;

const InfoNotification = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 0.67);

  display: flex;
  align-items: center;

  font-size: 0.875rem;

  height: 2.5rem;

  padding-left: 0.75rem;
  padding-right: 1rem;
  margin: 0 1rem;
`;

const List = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  margin-top: 1.5rem;
`;

const Footer = styled.div`
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;

  padding: 1rem 1.5rem;
`;

const FooterButton = styled.div`
  background-color: ${(props) => (props.primary ? "#242424" : "transparent")};
  border-radius: 0.5rem;
  color: ${(props) => (props.primary ? "white" : "#242424")};
  cursor: pointer;

  display: flex;
  align-items: center;

  height: 2.5rem;

  margin-left: 1.5rem;
  padding: 0 1.5rem;
`;

export default FileList;
