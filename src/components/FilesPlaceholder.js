import React from "react";
import styled from "styled-components";
import { FileText, HardDrives } from "phosphor-react";
import FilePicker from "./FilePicker";

const FilesPlaceholder = () => {
  return (
    <Container>
      <Content>
        <FileText color="#242424" size={96} />
        <Headline>{"Drag & drop files"}</Headline>
        <Text>PDF, PNG and JPEG files are allowed</Text>
        <Text2>or</Text2>
        <FilePicker>
          <Button>
            <HardDrives size={24} color="#ffffff" />
            <div style={{ marginLeft: "0.5rem" }}>Browse files</div>
          </Button>
        </FilePicker>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  color: #242424;

  height: 100%;
  width: 100%;

  padding: 1rem;
`;

const Content = styled.div`
  border: 1px dashed #b3b3b3;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
`;

const Headline = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.1;

  margin-top: 1.5rem;
`;

const Text = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;

  margin-top: 0.5rem;
`;

const Text2 = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;

  margin: 1.5rem 0;

  text-transform: uppercase;
`;

const Button = styled.div`
  background-color: #242424;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: 1rem;
  font-weight: 400;

  height: 3rem;

  padding: 0 1rem;
`;

export default FilesPlaceholder;
