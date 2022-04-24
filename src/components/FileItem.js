import React from "react";
import styled from "styled-components";

import { DotsSixVertical, X } from "phosphor-react";

const FileItem = ({ name, dateModified, size, active, removeFile }) => {
  let dateM = new Date(dateModified);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  dateM = dateM.toLocaleDateString("en-ZA", options);

  return (
    <Container isActive={active}>
      <Reorder>
        <DotsSixVertical size={24} color="#242424" />
      </Reorder>
      <Info>
        <Flex align="center" justify="space-between">
          <Title>{name}</Title>
          <RemoveButton onClick={removeFile}>
            <X size={16} color="rgba(0,0,0, 0.67)" />
          </RemoveButton>
        </Flex>
        <Meta>
          <div>{dateM}</div>
          <div>{size}</div>
        </Meta>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => (props.isActive ? "#f2f2f2" : "transparent")};
  color: #242424;
  cursor: pointer;

  display: flex;
  align-items: center;

  height: 4rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Reorder = styled.div`
  cursor: grab;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 4rem;
  width: 4rem;

  user-select: none;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Flex = styled.div`
  display: flex;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;

  margin-right: 0.5rem;
  white-space: nowrap;
`;

const RemoveButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 1.5rem;
  width: 1.5rem;

  margin-right: 1.5rem;
`;

const Meta = styled.div`
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.1;

  margin-top: 0.25rem;
  padding-right: 1.5rem;
`;

export default FileItem;
